import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  visible?: boolean;
}
export interface BackButtonRefProps {
  setShow: (visible: boolean) => void;
}

export default forwardRef<BackButtonRefProps, BackButtonProps>(
  function BackButton(props, ref): JSX.Element {
    const [visible, setVisible] = useState<boolean>(props?.visible || true);

    // 暴露方法给外部使用
    useImperativeHandle(
      ref,
      () => {
        return {
          setShow(visible: boolean) {
            setVisible(visible);
          },
        };
      },
      [visible],
    );

    if (!visible) {
      return <></>;
    }

    return (
      <TouchableOpacity
        style={[styles.button, props.style]}
        onPress={props.onPress}>
        <Text style={[styles.text, props.textStyle]}>← 原生页面</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 26,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    zIndex: 1000,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

// export const BackButton: React.FC<BackButtonProps> = ({
//   onPress,
//   style,
//   textStyle,
//   visible = true,
// }) => {
//   if (!visible) {
//     return null;
//   }

//   return (
//     <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
//       <Text style={[styles.text, textStyle]}>← 原生页面</Text>
//     </TouchableOpacity>
//   );
// };
