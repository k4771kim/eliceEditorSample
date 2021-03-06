import { AppRegistry, YellowBox } from 'react-native';
// if build release failed in android, try replace import statement with below.
// import App from './lib/App';
import App from './src/App';
YellowBox.ignoreWarnings([
  // 'Warning: componentWillMount is deprecated',
  // 'Warning: isMounted',
  'Warning: isMounted(...) is deprecated',
  'Class RCTCxxModule',
  'Module RCTImageLoader'
]);

AppRegistry.registerComponent('eliceEditorSample', () => App);
