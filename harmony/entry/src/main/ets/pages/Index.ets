// Index.ets
// Index.ets
// import { BusinessError } from '@kit.BasicServicesKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { router } from '@kit.ArkUI';

@Entry
@Component
struct Index {
  @State message: string = '原生页面';

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        // 添加按钮，以响应用户onClick事件
        Button() {
          Text('goToRN')
            .fontSize(30)
            .fontWeight(FontWeight.Bold)
        }
        .type(ButtonType.Capsule)
        .margin({
          top: 20
        })
        .backgroundColor('#0D9FFB')
        .width('40%')
        .height('5%')
        // 跳转按钮绑定onClick事件，单击时跳转到第二页
        .onClick(() => {
          console.info(`Succeeded in clicking the 'Next' button.`)

          // router?.replace({ url: 'pages/RNIndex' })
          router.pushUrl({ url: 'pages/RNIndex' }, router.RouterMode.Single, (err) => {
            if (err) {
              console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
              return;
            }
            console.info('Invoke pushUrl succeeded.');
          })
          // // 获取UIContext
          // let uiContext: UIContext = this.getUIContext();
          // let router = uiContext.getRouter();
          // // 跳转到第二页
          // router.pushUrl({ url: 'pages/RNIndex'},
          //   // 关键配置：启用单例模式
          //    ).then(() => {
          //   console.info('Succeeded in jumping to the second page.')
          //
          // }).catch((err: BusinessError) => {
          //   console.error(`Failed to jump to the second page. Code is ${err.code}, message is ${err.message}`)
          // })
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}


// @Entry
// @Component
// struct Index {
//   @State message: string = 'Hello World';
//
//   build() {
//     RelativeContainer() {
//       Text(this.message)
//         .id('HelloWorld')
//         .fontSize($r('app.float.page_text_font_size'))
//         .fontWeight(FontWeight.Bold)
//         .alignRules({
//           center: { anchor: '__container__', align: VerticalAlign.Center },
//           middle: { anchor: '__container__', align: HorizontalAlign.Center }
//         })
//         .onClick(() => {
//           this.message = 'Welcome';
//         })
//     }
//     .height('100%')
//     .width('100%')
//   }
// }