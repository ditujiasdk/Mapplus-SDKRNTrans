/*
 * @Author: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @Date: 2026-03-18 11:21:50
 * @LastEditors: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @LastEditTime: 2026-04-14 13:43:12
 * @FilePath: /RNTrans/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import {
  LogBox,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-easy-toast';
import { Loading } from './components';
import { LoadingRefProps } from './components/Loading';
import DemoStack from './navigators/DemoStack';
import { ToolRefs } from './utils';
import NativeHTools from './specs/v1/NativeToolsModules';

// if (!__DEV__) {
//   LogBox.ignoreAllLogs();
// }
LogBox.ignoreAllLogs();

export default function App() {
  const loadingRef = useRef<LoadingRefProps | null>(null);
  const toastRef = useRef<Toast | null>(null);

  useEffect(() => {
    ToolRefs.setLoading(loadingRef);
    ToolRefs.setToast(toastRef);
    return () => {
      toastRef;
      ToolRefs.setLoading(undefined);
      ToolRefs.setToast(undefined);
    };
  }, []);

  const handleBackPress = () => {
    console.log('NativeHTools:', NativeHTools);
    if (NativeHTools) {
      console.log('Calling goBackWithParams');
      NativeHTools.goBackWithParams('reactnative');
    } else {
      console.log('NativeHTools is null');
    }
    return true;
  };
  return (
    <>
      <SafeAreaView>
        <View style={{ height: '100%' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}>
            <TouchableOpacity style={{ padding: 8 }} onPress={handleBackPress}>
              <Text
                style={[
                  {
                    fontSize: 16,
                    fontWeight: '500',
                  },
                ]}>
                ← 返回
              </Text>
            </TouchableOpacity>
          </View>
          <NavigationContainer>
            <DemoStack />
          </NavigationContainer>
        </View>
      </SafeAreaView>
      <Loading ref={loadingRef} displayMode={'normal'} />
      <Toast ref={toastRef} position={'top'} positionValue={40} />
    </>
  );
}
