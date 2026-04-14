import { RNPackageContext, RNPackage } from '@rnoh/react-native-openharmony/ts';
import { GeneratedPackage } from './GeneratedPackage';
import { WebMapPackage }  from '@mapplus/react-native-webmap/ts'
import { WebViewPackage } from '@react-native-oh-tpl/react-native-webview/ts';
import { FsPackage } from '@react-native-ohos/react-native-fs/ts';
import { SafeAreaViewPackage } from '@react-native-oh-tpl/react-native-safe-area-context';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [new GeneratedPackage(ctx),
    new WebMapPackage(ctx),
    new WebViewPackage(ctx),
    new SafeAreaViewPackage(ctx),
    new FsPackage(ctx)
  ];
}