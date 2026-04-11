import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import NumberScreen from '../screens/NumberScreen';
import VerificationScreen from '../screens/VerificationScreen';
import SignIn from '../screens/SignIn';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SelectLocationScreen from '../screens/SelectLocationScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false, 
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboard" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="NumberInput" component={NumberScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;