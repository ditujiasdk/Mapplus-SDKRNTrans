import { RNPackage, TurboModulesFactory } from '@rnoh/react-native-openharmony/ts';
import type {
  TurboModule,
  TurboModuleContext
} from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts"
import { NativeTools } from './turbomodule/NativeTools';
import { NativeTTSTools } from './turbomodule/NativeTTSTools';

class GeneratedTurboModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (name === TM.NativeToolsModules.NAME) {
      return new NativeTools(this.ctx);
    }else if(name === TM.RTNTTSTools.NAME){
      return new NativeTTSTools(this.ctx);
    }
    return null;
  }
  hasTurboModule(name: string): boolean {
    return name === TM.NativeToolsModules.NAME || name === TM.RTNTTSTools.NAME;
  }
}
export class GeneratedPackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new GeneratedTurboModulesFactory(ctx);
  }
}