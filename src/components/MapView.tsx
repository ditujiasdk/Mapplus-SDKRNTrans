/*
 * @Author: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @Date: 2025-08-18 16:01:08
 * @LastEditors: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @LastEditTime: 2026-04-14 15:37:30
 * @FilePath: /web2dsdkrn/src/components/MapView.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Client, WebMapView } from '@mapplus/react-native-webmap';

import { View } from 'react-native';

import {
  DemoStackNavigationProps,
  DemoStackParamList,
} from 'src/navigators/types';
import { getAssets } from '../assets';
import ImageButton from './ImageButton';

interface Props {
  onInited: (client: Client) => void;
  children?: React.ReactNode | React.ReactNode[];
  navigation?: DemoStackNavigationProps<keyof DemoStackParamList>;
}

export default function MapView(props: Props) {
  const renderBackBtn = () => {
    if (!props.navigation) {
      return null;
    }
    return (
      <ImageButton
        image={getAssets().icon_back}
        onPress={() => {
          props.navigation?.goBack();
        }}
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: 10,
          left: 10,
          width: 40,
          height: 40,
          // zIndex: 100,
          borderRadius: 4,
        }}
      />
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <WebMapView onInited={props.onInited} />
      {renderBackBtn()}
      {props.children}
    </View>
  );
}
