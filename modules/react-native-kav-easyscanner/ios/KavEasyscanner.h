
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNKavEasyscannerSpec.h"

@interface KavEasyscanner : NSObject <NativeKavEasyscannerSpec>
#else
#import <React/RCTBridgeModule.h>

@interface KavEasyscanner : NSObject <RCTBridgeModule>
#endif

@end
