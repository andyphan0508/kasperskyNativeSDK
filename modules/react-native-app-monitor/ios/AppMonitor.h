
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNAppMonitorSpec.h"

@interface AppMonitor : NSObject <NativeAppMonitorSpec>
#else
#import <React/RCTBridgeModule.h>

@interface AppMonitor : NSObject <RCTBridgeModule>
#endif

@end
