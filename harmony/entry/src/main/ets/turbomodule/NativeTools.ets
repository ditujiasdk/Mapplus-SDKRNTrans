
import { TurboModule } from "@rnoh/react-native-openharmony";
import { TM } from "@rnoh/react-native-openharmony/generated";
import { router } from '@kit.ArkUI';

export class NativeTools extends TurboModule implements TM.NativeToolsModules.Spec {
  goBackWithParams(params: string): void {
      console.log('原生环境', params);
      try {
        // 返回第一页,不销毁。
        router?.pushUrl({ url: 'pages/Index' }).catch(() => {
          // TODO: Implement error handling.
          console.info('failed in returning to the first page.')
        })
        console.info('Succeeded in returning to the first page.')
      } catch (err) {
        console.error(`Failed to return to the first page. Code is `+ err)
      }
  }
}