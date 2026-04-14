/*
 * @Author: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @Date: 2026-03-18 11:21:50
 * @LastEditors: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @LastEditTime: 2026-04-14 14:38:42
 * @FilePath: /RNTrans/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import { LogBox, SafeAreaView, View, StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';
import { Loading } from './components';
import { BackButton } from './components/BackButton';
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
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <NavigationContainer>
            <DemoStack />
          </NavigationContainer>
          <BackButton onPress={handleBackPress} />
        </View>
      </SafeAreaView>
      <Loading ref={loadingRef} displayMode={'normal'} />
      <Toast ref={toastRef} position={'top'} positionValue={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
});
