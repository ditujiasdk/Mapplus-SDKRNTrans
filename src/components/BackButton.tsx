import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  visible?: boolean;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  style,
  textStyle,
  visible = true,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>← 原生页面</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 16,
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
