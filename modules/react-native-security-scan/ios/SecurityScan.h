
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSecurityScanSpec.h"

@interface SecurityScan : NSObject <NativeSecurityScanSpec>
#else
#import <React/RCTBridgeModule.h>

@interface SecurityScan : NSObject <RCTBridgeModule>
#endif

@end
