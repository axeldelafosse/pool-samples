import 'react-native-url-polyfill/auto';
import 'expo-asset';
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';

import App from './App';
import Share from './Share';

if (!__DEV__) {
  console.log = () => {};
}

registerRootComponent(App);
AppRegistry.registerComponent('share', () => Share);
