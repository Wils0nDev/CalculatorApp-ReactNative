/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import {
  StatusBar,
  View,
} from 'react-native';


import { CalculatorScreen } from './src/presentation/screens/CalculatorScreen';
import { styles } from './src/config/theme/app-theme';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


export const   App = () => {
 

  return (
    <View style={styles.background}>
      <StatusBar
        barStyle={ 'light-content'}
        backgroundColor={'black'}
      />
      <CalculatorScreen />
    </View>
  );
}

