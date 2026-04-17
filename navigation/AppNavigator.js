import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Đảm bảo đã install
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import NumberScreen from '../screens/NumberScreen';
import VerificationScreen from '../screens/VerificationScreen';
import SignIn from '../screens/SignIn';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SelectLocationScreen from '../screens/SelectLocationScreen';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BeverageScreen from '../screens/BeverageScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
     screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#53B175',
        tabBarInactiveTintColor: '#181725',
        tabBarStyle: { height: 90, paddingBottom: 30 },
      }}
    >
      <Tab.Screen 
      name="Shop" 
      component={HomeScreen} 
      options={{
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="storefront-outline" size={24} color={color} />,
      }}
    />
    <Tab.Screen 
      name="Explore" 
      component={ExploreScreen} 
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
      }}
    />
    <Tab.Screen 
      name="Cart" 
      component={HomeScreen} 
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={24} color={color} />,
      }}
    />
    <Tab.Screen 
      name="Favourite" 
      component={HomeScreen} 
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={24} color={color} />,
      }}
    />
    <Tab.Screen 
      name="Account" 
      component={HomeScreen} 
      options={{
        tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={20} color={color} />,
      }}
    />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, gestureEnabled: true }}
      >
        {/* Luồng Auth & Splash */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboard" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="NumberInput" component={NumberScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Luồng Chính (Sau khi Login) */}
        <Stack.Screen name="Main" component={MainTabs} /> 
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Beverages" component={BeverageScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
