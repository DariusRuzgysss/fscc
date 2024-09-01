import React, {memo, useCallback, useEffect} from 'react';
import * as Screens from '../screens';
import {NavigationStack} from './types/navigation';
import {SCREEN_NAMES} from './constants';
import {navigationRef} from './helpers/navigation';
import {useAuth} from './contexts/auth';

//Libraries
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator<NavigationStack>();

const AppStack = memo(() => {
  const {auth} = useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {auth ? (
        <>
          <Stack.Screen
            name={SCREEN_NAMES.PROFILE}
            component={Screens.ProfileScreen}
          />
        </>
      ) : (
        <Stack.Screen
          name={SCREEN_NAMES.LOGIN}
          component={Screens.LoginScreen}
          options={{
            animationTypeForReplace: !auth ? 'pop' : 'push',
          }}
        />
      )}
    </Stack.Navigator>
  );
});

export default memo(() => {
  const {i18n} = useTranslation();
  const {language, handleSetLanguage} = useAuth();

  useEffect(() => {
    const lang = language ? language : 'lt';
    i18n.changeLanguage(lang);
    handleSetLanguage(lang);
  }, [i18n, language, handleSetLanguage]);

  const onReady = useCallback(async () => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onReady={onReady}>
      <AppStack />
    </NavigationContainer>
  );
});
