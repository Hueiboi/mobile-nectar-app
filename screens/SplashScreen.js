import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SplashScreen = () => { 
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#58af7a" />
      
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
          resizeMode="contain" 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#58af7a' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: '80%', height: 100 }, // Chỉnh lại cho dễ thấy
});

export default SplashScreen;