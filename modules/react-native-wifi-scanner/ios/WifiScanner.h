
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNWifiScannerSpec.h"

@interface WifiScanner : NSObject <NativeWifiScannerSpec>
#else
#import <React/RCTBridgeModule.h>

@interface WifiScanner : NSObject <RCTBridgeModule>
#endif

@end
