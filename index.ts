/**
 * @format
 */

import 'react-native-gesture-handler';
import 'mobx-react/batchingForReactNative';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}
// <<start date picker stuff>>
const isAndroid = require('react-native').Platform.OS === 'android';
const isHermesEnabled = !!global.HermesInternal;

if (isHermesEnabled || isAndroid) {
  require('@formatjs/intl-getcanonicallocales/polyfill');
  require('@formatjs/intl-locale/polyfill');

  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/ru.js');

  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/locale-data/ru.js');

  require('@formatjs/intl-listformat/polyfill');
  require('@formatjs/intl-listformat/locale-data/ru.js');

  require('@formatjs/intl-numberformat/polyfill');
  require('@formatjs/intl-numberformat/locale-data/ru.js');

  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/ru.js');

  require('@formatjs/intl-datetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/locale-data/ru.js');

  require('@formatjs/intl-datetimeformat/add-golden-tz.js');
  require('@formatjs/intl-datetimeformat/add-all-tz');

  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
  const RNLocalize = require('react-native-localize');
  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {
    Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone());
  }
}
// <<end date picker stuff>>

AppRegistry.registerComponent(appName, () => App);
