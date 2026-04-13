/*
 * @Author: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @Date: 2026-04-09 09:43:01
 * @LastEditors: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @LastEditTime: 2026-04-10 17:38:58
 * @FilePath: /RNTrans/src/utils/NativeModules.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  goBackWithParams: (params: string) => void;
}

export default TurboModuleRegistry.get<Spec>(
  "NativeToolsModules",
) as Spec | null;
