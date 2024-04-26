import React from 'react';
import {Pressable, Text} from 'react-native';
import {colors, styles} from '../../config/theme/app-theme';

interface Props {
  label: string;
  color?: string;
  dobleSize? : boolean;
  blackText? : boolean
  onPress:()=> void;
}

export const CalculatorButton = ({
    label, 
    color = colors.darkGray, 
    dobleSize = false,
    blackText = false,
    onPress
    }: Props) => {
  return (
    <Pressable
      onPress={()=> onPress() }
      style={({pressed}) => ({
        ...styles.button,
        backgroundColor: color,
        opacity: pressed ? 0.8 : 1,
        width: (dobleSize) ? 180 : 80
      })}>
      <Text style={{
        ...styles.buttonText,
        color : blackText ? 'black': 'white'
      }}>{label}</Text>
    </Pressable>
  );
};
