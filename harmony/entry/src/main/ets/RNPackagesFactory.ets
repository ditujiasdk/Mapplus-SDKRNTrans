import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';
import { GeneratedPackage } from './GeneratedPackage';
import { WebMapPackage }  from '@mapplus/react-native-webmap/ts'
import { WebViewPackage } from '@react-native-oh-tpl/react-native-webview/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [new GeneratedPackage(ctx),
    new WebMapPackage(ctx),
    new WebViewPackage(ctx),];
}