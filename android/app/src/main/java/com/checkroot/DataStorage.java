package com.checkroot;

import com.kaspersky.KasperskyModule;
import com.kavsdk.securestorage.file.CryptoFileInputStream;
import com.kavsdk.securestorage.file.CryptoFileOutputStream;
import com.kavsdk.shared.iface.ServiceState;
import com.kavsdk.shared.iface.ServiceStateStorage;

import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * This is a class for working with storages which contain information about states of KAV SDK services
 * (such as lists of WebFilter categories and IP exclusions, WebFilter settings and secure SMS settings).
 */

public class DataStorage implements ServiceStateStorage {
    public static final int WF_CATEGORY_STORAGE = 0;
    public static final int WF_EXCLUSION_STORAGE = 1;
    public static final int WF_SETTINGS_STORAGE = 2;
    public static final int SECSMS_SETTINGS_STORAGE = 3;
    public static final int GENERAL_SETTINGS_STORAGE = 4;
    public static final int ANTISPAM_SETTINGS_STORAGE = 5;
    public static final int SIM_WATCH_SETTINGS_STORAGE = 6;
    public static final int APPCONTROL_SETTINGS_STORAGE = 7;

    public static final String PASSWORD = "SECRET_PASSWORD";
    public static final String NO_CRYPTED_EXTENTION = ".dat";
    public static final String CRYPTED_EXTENTION = ".cdat";

    /* File names of particular data storages */
    private static final String[] STORAGE_DATA_FILES = new String[]{"wcs", "wes", "wss", "secsms", "sdk", "as", "simwatch", "appcontrol"};

    private final KasperskyModule mContext;
    private int mStorageMode;

    public DataStorage(KasperskyModule context, int mode) {
        mContext = context;
        mStorageMode = mode;
    }

    @Override
    public void write(ServiceState state) throws IOException {
        // It will be better do not store the data in STORAGE_DATA_FILES directly.
        // First, save the data in a temporary file.
        // Then if everything is OK delete the STORAGE_DATA_FILE
        // finally, rename the temporary file to STORAGE_DATA_FILE file name
        // This will be helpful in situations when the application has been closed
        // unexpectedly and prevent the file corruption.
        File path = mContext.getDir("", 0);

        if (mStorageMode == SECSMS_SETTINGS_STORAGE) {
            File file = new File(path, STORAGE_DATA_FILES[mStorageMode] + CRYPTED_EXTENTION);
            CryptoFileOutputStream cryptoOut = null;
            try {
                cryptoOut = new CryptoFileOutputStream(file, PASSWORD);
                state.save(cryptoOut);

                file = new File(path, STORAGE_DATA_FILES[mStorageMode] + NO_CRYPTED_EXTENTION);
                if (file.exists()) {
                    file.delete();
                }
            } catch (IOException e) {
                //Ignore
            } finally {
                closeQuietly(cryptoOut);
            }
        } else {
            File file = new File(path, STORAGE_DATA_FILES[mStorageMode] + NO_CRYPTED_EXTENTION);
            FileOutputStream out = new FileOutputStream(file);
            try {
                state.save(out);
            } finally {
                out.close();
            }
        }
    }

    @Override
    public void read(ServiceState state) throws IOException {
        // Here if STORAGE_DATA_FILE is missing or has zero length check whether
        // temporary file exists.
        // if the temporary file exists and it has nonzero length rename it to
        // STORAGE_DATA_FILES
        File path = mContext.getDir("", 0);
        File file = new File(path, STORAGE_DATA_FILES[mStorageMode] + CRYPTED_EXTENTION);

        if (file.exists()) {
            CryptoFileInputStream in = null;
            try {
                in = new CryptoFileInputStream(file, PASSWORD);
            } catch (IOException e) {
                //Ignore
            }

            try {
                state.load(in);
            } finally {
                closeQuietly(in);
            }
        } else {
            file = new File(path, STORAGE_DATA_FILES[mStorageMode] + NO_CRYPTED_EXTENTION);
            FileInputStream fin = null;

            try {
                fin = new FileInputStream(file);
            } catch (FileNotFoundException e) {
                file.createNewFile();
                fin = new FileInputStream(file);
            }

            try {
                state.load(fin);
            } finally {
                fin.close();
            }
        }
    }

    private static void closeQuietly(Closeable c) {
        try {
            if (c != null) {
                c.close();
            }
        } catch (IOException e) {
            //ignore
        }
    }
}
