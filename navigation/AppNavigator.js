import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Đảm bảo đã install
import { AuthContext } from '../context/AuthContext';
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
import CartScreen from '../screens/CartScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FilterScreen from '../screens/FilterScreen';
import AccountScreen from '../screens/AccountScreen';
import OrderAcceptedScreen from '../screens/OrderAcceptedScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

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
      component={CartScreen} 
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={24} color={color} />,
      }}
    />
    <Tab.Screen 
      name="Favourite" 
      component={FavouriteScreen} 
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={24} color={color} />,
      }}
    />
    <Tab.Screen 
      name="Account" 
      component={AccountScreen} 
      options={{
        tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={20} color={color} />,
      }}
    />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
        {userToken == null ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Onboard" component={OnboardingScreen} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="NumberInput" component={NumberScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} /> 
            <Stack.Screen 
              name="Filter" 
              component={FilterScreen} 
              options={{ presentation: 'modal', animationEnabled: true }} 
            />
            <Stack.Screen name="Beverages" component={BeverageScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="OrderAccepted" component={OrderAcceptedScreen} />
            <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}