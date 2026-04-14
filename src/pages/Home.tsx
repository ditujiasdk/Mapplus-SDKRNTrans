/*
 * @Author: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @Date: 2026-03-16 14:30:43
 * @LastEditors: xiezhiyan 16297996+xiezhiyan@users.noreply.github.com
 * @LastEditTime: 2026-04-14 16:35:58
 * @FilePath: /RNTrans/src/pages/Home.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ILicenseInfo, RTNWebMap } from '@mapplus/react-native-webmap';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { DemoStackPageProps } from 'src/navigators/types';
import { ToolRefs } from './../utils';

interface Props extends DemoStackPageProps<'DemoHome'> {}

export default function Home({ navigation }: Props) {
  const [license, setLicense] = useState<ILicenseInfo | undefined>();

  useEffect(() => {
    init();
    getLicense();
  }, []);

  /** 原生端进行初始化 */
  function init() {
    // 原生端通过指定端口号启动服务，并复制需要使用的资源
    RTNWebMap.initEnvironment(9988);
  }

  /**
   * 初始化并获取当前 sdk license 激活情况
   */
  async function getLicense() {
    // 获取当前许可状态
    RTNWebMap.getLicenseInfo().then(res => {
      if (res) {
        setLicense(res);
      }
    });
  }

  /** 激活sdk */
  // function activate() {
  //   // 激活序列号，替换为有效的序列号
  //   const serial = 'XXV8W-2VZBM-WQNY7-VFQBV-7UDM2'

  //   RTNWebMap.activate(serial).then(res => {
  //     if (res) {
  //       console.log('激活成功')
  //       getLicense()
  //     } else {
  //       console.log('激活失败')
  //     }
  //   })
  // }

  const renderLicenseInfo = () => {
    return license === undefined ? (
      <View>
        <Text>当前许可：未激活</Text>
      </View>
    ) : (
      <View>
        <Text>{`当前许可：${license.isValid ? '有效' : '无效'}`}</Text>
        <Text>{`生效时间：${getTimeString(license.start)}`}</Text>
        <Text>{`过期时间：${getTimeString(license.end)}`}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {renderLicenseInfo()}
      <View style={{ marginTop: 20 }}>
        <Button title="获取激活状态" onPress={getLicense} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          title="地图操作示例"
          onPress={() => {
            ToolRefs.getNativeBackBtn()?.setShow(false);
            navigation.navigate('DemoList');
          }}
        />
      </View>
    </View>
  );
}

function getTimeString(time: number) {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minite = date.getMinutes();

  return `${year}/${month}/${day} ${hour}:${minite}`;
}
