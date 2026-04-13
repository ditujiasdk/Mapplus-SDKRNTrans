
import { TurboModule } from "@rnoh/react-native-openharmony";
import { TM } from "@rnoh/react-native-openharmony/generated";


export class NativeTools extends TurboModule implements TM.NativeToolsModules.Spec {
  goBackWithParams(params: string): void {
      console.log('原生环境', params);
      let uiContext: UIContext | null = this.ctx.getUIContext();
      let router = uiContext?.getRouter();
      try {
        // 返回第一页
        router?.back()
        console.info('Succeeded in returning to the first page.')
      } catch (err) {
        console.error(`Failed to return to the first page. Code is `+ err)
      }
  }
}