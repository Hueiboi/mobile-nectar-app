import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  Image, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ImageBackground 
        source={require('../assets/Onboarding.png')} 
        style={styles.background}
      >
        {/* Phủ một lớp Gradient để text dễ đọc hơn */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={[
            styles.content, 
            { paddingBottom: insets.bottom + 40 } 
          ]}>
            
            <Image 
              source={require('../assets/Carrot.png')} 
              style={styles.icon}
              resizeMode="contain"
            />

            <Text style={styles.title}>Welcome{"\n"}to our store</Text>
            <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>

            <TouchableOpacity 
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', 
  },
  gradient: {
    paddingHorizontal: 30,
    height: '60%', 
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 56,
    marginBottom: 15,
  },
  title: {
    fontSize: 48,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 56,
  },
  subtitle: {
    fontSize: 16,
    color: '#FCFCFC',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#58AF7A',
    width: '100%',
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;