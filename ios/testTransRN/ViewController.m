//
//  ViewController.m
//  testTransRN
//
//  Created by xiezhiyan on 2026/4/8.
//

#import "ViewController.h"
#import <React/RCTRootView.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

-(IBAction)gotoRN:(id)sender{
    NSLog(@"GOTO RN");
//    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];

#if DEBUG
    NSURL *jsCodeLocation = [NSURL URLWithString:@"http://10.10.0.30:8081/index.bundle?platform=ios"];
#else
    NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
    
       RCTRootView *rootView =
         [[RCTRootView alloc] initWithBundleURL: jsCodeLocation
                                     moduleName: @"testTransRN"
                              initialProperties:
                                @{
                                  @"scores" : @[
                                    @{
                                      @"name" : @"Alex",
                                      @"value": @"42"
                                     },
                                    @{
                                      @"name" : @"Joel",
                                      @"value": @"10"
                                    }
                                  ]
                                }
                                  launchOptions: nil];
       UIViewController *vc = [[UIViewController alloc] init];
       vc.view = rootView;
       vc.modalPresentationStyle = UIModalPresentationFullScreen;
       [self presentViewController:vc animated:YES completion:nil];
}
@end
