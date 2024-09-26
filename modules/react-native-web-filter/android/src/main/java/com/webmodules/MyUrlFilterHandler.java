package com.webmodules;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import com.kaspersky.components.urlchecker.UrlInfo;
import com.kaspersky.components.urlfilter.UrlFilterHandler;

 public class MyUrlFilterHandler implements UrlFilterHandler {
     private static final byte[] DEFAULT_BLOCK_RESPONSE = ("<html><body>Forbidden</body></html>").getBytes();

     public InputStream getBlockPageData(String url, UrlInfo info) {
         return new ByteArrayInputStream(DEFAULT_BLOCK_RESPONSE);
     }
 }