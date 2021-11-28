import React, {useRef} from 'react';
import {IntlProvider} from 'react-intl';
import RU from './assets/locales/ru.json';
import {
  // DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import Sentry from './manager/Sentry';
import {Appearance, Platform, StatusBar} from 'react-native';
import {Provider} from 'mobx-react';
import stores from './stores';
import Navigator from './screens/Navigator';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  // DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {enableScreens} from 'react-native-screens';
import {default as MIcon} from 'react-native-vector-icons/MaterialIcons';
import {default as MCIcon} from 'react-native-vector-icons/MaterialCommunityIcons';

void MIcon.loadFont();
void MCIcon.loadFont();

// if (process.env.NODE_ENV === 'development') {
//   const whyDidYouRender = require('@welldone-software/why-did-you-render');
//   whyDidYouRender(React, {
//     trackAllPureComponents: true,
//   });
// }

const colors = {
  primary: '#FA4A0C',
  accent: '#FA4A0C',
  error: '#CB4F4F',
  text: '#14171B',
  background: '#F5F5F8',
};

const defaultTheme = {
  ...NavDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    ...colors,
  },
};

// const darkTheme = {
//   ...NavDarkTheme,
//   ...PaperDarkTheme,
//   colors: {
//     ...NavDarkTheme.colors,
//     ...PaperDarkTheme.colors,
//     ...colors,
//   },
// };

enableScreens();

const App: React.FunctionComponent = () => {
  const theme =
    Appearance.getColorScheme() === 'dark' ? defaultTheme : defaultTheme;
  const navContainerRef = useRef<NavigationContainerRef<any>>(null);
  return (
    <IntlProvider messages={RU} defaultLocale={'ru'} locale={'ru'}>
      <Provider {...stores}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <NavigationContainer
              theme={theme}
              ref={navContainerRef}
              onReady={() => {
                Sentry.routingInstrumentation.registerNavigationContainer(
                  // @ts-ignore
                  navContainerRef,
                );
              }}>
              <StatusBar
                animated
                barStyle={
                  Appearance.getColorScheme() === 'dark' &&
                  Platform.OS !== 'ios'
                    ? 'light-content'
                    : 'dark-content'
                }
              />
              <Navigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    </IntlProvider>
  );
};

export default App;
