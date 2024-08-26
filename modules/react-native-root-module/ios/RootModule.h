
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRootModuleSpec.h"

@interface RootModule : NSObject <NativeRootModuleSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RootModule : NSObject <RCTBridgeModule>
#endif

@end
