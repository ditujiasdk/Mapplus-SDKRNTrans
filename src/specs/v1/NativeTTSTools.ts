/*
 * @Author: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @Date: 2026-03-17 11:17:40
 * @LastEditors: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @LastEditTime: 2026-04-14 14:46:34
 * @FilePath: /RNTrans/src/specs/v1/NativeTTSTools.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 自定义原生接口
 *
 * 1. 在src/specs/v1/ 中创建接口文件
 * 2. 使用npm run codegen在鸿蒙原生工程中生成对应文件
 * 3. 在原生工程中实现接口功能
 */
import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  initTTS(): Promise<boolean>;

  speak(text: string): Promise<void>;

  stopSpeak(): Promise<void>;
}

export default TurboModuleRegistry.get<Spec>('RTNTTSTools') as Spec;
