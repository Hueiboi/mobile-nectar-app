import React, { useEffect, useContext } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext'; 

const SplashScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboard'); 
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#58af7a" transient={true} />
      
      <View style={[
        styles.content,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }
      ]}>
        <Image 
          source={require('../assets/Logo.png')}
          style={styles.logo}
          resizeMode="cover" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#58af7a', 
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',   
    paddingHorizontal: 40,
  },
  logo: {
    height: 100, 
  },
});

export default SplashScreen;