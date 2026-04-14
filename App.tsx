/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import NativeHTools from './src/specs/v1/NativeToolsModules';
// import WebView from "react-native-webview";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Client, RTNWebMap, WebMapView } from '@mapplus/react-native-webmap';
import { useEffect, useState } from 'react';
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [valid, setValid] = useState(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    RTNWebMap.initEnvironment(9988); // 初始化并指定本地服务端口号

    const license = await RTNWebMap.getLicenseInfo();
    if (!license) {
      const serial = 'AT5EU-EP7F8-RMHDB-KMVTC-Q9FSS'; //序列号
      const result = await RTNWebMap.activate(serial);
      if (result) {
        console.log('激活成功');
        setValid(true);
      } else {
        console.warn('激活失败');
      }
    } else {
      console.log('已激活');
      setValid(true);
    }
  }

  async function onMapLoad(client: Client) {
    // 添加数据源：高德 墨卡托 gcj02
    const sourceId = await client.datasources.add({
      type: 'raster',
      name: 'gaode',
      data: {
        tiles: [
          'http://wprd04.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=7',
        ],
        tileSize: 256,
      },
    });

    if (!sourceId) {
      return;
    }

    // 设置地图坐标系
    await client.mapControl.setCRS('WebMercator', 'GCJ02');

    // 添加底图
    await client.baseLayers.add({
      type: 'image',
      sourceId: sourceId,
      name: 'gaode_layer',
    });

    // 定位
    await client.mapControl.flyTo({
      center: { x: 108, y: 30 },
      scale: 1 / 30000000,
    });
  }

  if (!valid) {
    return <></>;
  }

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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text
            style={[
              styles.backButtonText,
              { color: isDarkMode ? Colors.white : Colors.black },
            ]}>
            ← 返回
          </Text>
        </TouchableOpacity>
      </View>
      {/* <WebView source={{ uri: "https://reactnative.dev/" }} /> */}
      <WebMapView onInited={onMapLoad} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
