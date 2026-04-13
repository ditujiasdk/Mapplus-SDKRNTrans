#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface NativeHToolsModule : NSObject <RCTBridgeModule>
@end

@implementation NativeHToolsModule

RCT_EXPORT_MODULE(NativeToolsModules);

RCT_EXPORT_METHOD(goBackWithParams:(NSString *)params) {
    dispatch_async(dispatch_get_main_queue(), ^{        UIViewController *rootViewController = [[UIApplication sharedApplication] keyWindow].rootViewController;
        UIViewController *topViewController = rootViewController;
        while (topViewController.presentedViewController) {
            topViewController = topViewController.presentedViewController;
        }
        
        // 打印参数
        NSLog(@"Received params from RN: %@", params);
        
        [topViewController dismissViewControllerAnimated:YES completion:nil];
    });
}

@end
