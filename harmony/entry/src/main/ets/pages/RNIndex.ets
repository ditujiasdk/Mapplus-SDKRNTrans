import {
  AnyJSBundleProvider,
  ComponentBuilderContext,
  FileJSBundleProvider,
  MetroJSBundleProvider,
  ResourceJSBundleProvider,
  RNApp,
  RNOHErrorDialog,
  RNOHLogger,
  TraceJSBundleProviderDecorator,
  RNOHCoreContext
} from '@rnoh/react-native-openharmony';
import { createRNPackages } from '../RNPackagesFactory';
import { WebView, WEB_VIEW } from "@react-native-oh-tpl/react-native-webview"

@Builder
export function buildCustomRNComponent(ctx: ComponentBuilderContext) {
  if (ctx.componentName === WEB_VIEW) { // 注册 webview 原生组件
    WebView({
      ctx: ctx.rnComponentContext,
      tag: ctx.tag
    });
  }
}

const wrappedCustomRNComponentBuilder = wrapBuilder(buildCustomRNComponent)

@Entry
@Component
struct Index {
  @StorageLink('RNOHCoreContext') private rnohCoreContext: RNOHCoreContext | undefined = undefined
  @State shouldShow: boolean = false
  private logger!: RNOHLogger

  aboutToAppear() {
    this.logger = this.rnohCoreContext!.logger.clone("Index")
    const stopTracing = this.logger.clone("aboutToAppear").startTracing();

    this.shouldShow = true
    stopTracing();
  }

  onBackPress(): boolean | undefined {
    // NOTE: this is required since `Ability`'s `onBackPressed` function always
    // terminates or puts the app in the background, but we want Ark to ignore it completely
    // when handled by RN
    this.rnohCoreContext!.dispatchBackPress()
    return true
  }

  build() {
    Column() {
      if (this.rnohCoreContext && this.shouldShow) {
        if (this.rnohCoreContext?.isDebugModeEnabled) {
          RNOHErrorDialog({ ctx: this.rnohCoreContext })
        }
        RNApp({
          rnInstanceConfig: {
            createRNPackages,
            enableNDKTextMeasuring: true, // 该项必须为true，用于开启NDK文本测算
            enableBackgroundExecutor: false,
            enableCAPIArchitecture: true, // 该项必须为true，用于开启CAPI
            arkTsComponentNames: [
              WEB_VIEW //components 添加 webview
            ]
          },
          initialProps: { "foo": "bar" } as Record<string, string>,
          appKey: "testTransRN",
          wrappedCustomRNComponentBuilder: wrappedCustomRNComponentBuilder,
          onSetUp: (rnInstance) => {
            rnInstance.enableFeatureFlag("ENABLE_RN_INSTANCE_CLEAN_UP")
          },
          jsBundleProvider: new TraceJSBundleProviderDecorator(
            new AnyJSBundleProvider([
              new MetroJSBundleProvider(),
              // NOTE: to load the bundle from file, place it in
              // `/data/app/el2/100/base/com.rnoh.tester/files/bundle.harmony.js`
              // on your device. The path mismatch is due to app sandboxing on OpenHarmony
              new FileJSBundleProvider('/data/storage/el2/base/files/bundle.harmony.js'),
              new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'hermes_bundle.hbc'),
              new ResourceJSBundleProvider(this.rnohCoreContext.uiAbilityContext.resourceManager, 'bundle.harmony.js')
            ]),
            this.rnohCoreContext.logger),
        })
      }
    }
    .height('100%')
    .width('100%')
  }
}


// // Second.ets
// import { BusinessError } from '@kit.BasicServicesKit';
//
// @Entry
// @Component
// struct Second {
//   @State message: string = 'Hi there';
//
//   build() {
//     Row() {
//       Column() {
//         Text(this.message)
//           .fontSize(50)
//           .fontWeight(FontWeight.Bold)
//         Button() {
//           Text('Back')
//             .fontSize(30)
//             .fontWeight(FontWeight.Bold)
//         }
//         .type(ButtonType.Capsule)
//         .margin({
//           top: 20
//         })
//         .backgroundColor('#0D9FFB')
//         .width('40%')
//         .height('5%')
//         // 返回按钮绑定onClick事件，单击按钮时返回到第一页
//         .onClick(() => {
//           console.info(`Succeeded in clicking the 'Back' button.`)
//           // 获取UIContext
//           let uiContext: UIContext = this.getUIContext();
//           let router = uiContext.getRouter();
//           try {
//             // 返回第一页
//             router.back()
//             console.info('Succeeded in returning to the first page.')
//           } catch (err) {
//             let code = (err as BusinessError).code;
//             let message = (err as BusinessError).message;
//             console.error(`Failed to return to the first page. Code is ${code}, message is ${message}`)
//           }
//         })
//       }
//       .width('100%')
//     }
//     .height('100%')
//   }
// }