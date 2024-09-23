
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNWebFilterSpec.h"

@interface WebFilter : NSObject <NativeWebFilterSpec>
#else
#import <React/RCTBridgeModule.h>

@interface WebFilter : NSObject <RCTBridgeModule>
#endif

@end
