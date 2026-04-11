import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const SignInScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/Food.png')} 
        style={styles.headerImage}
      />

      <View style={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
        <Text style={styles.title}>Get your groceries{"\n"}with nectar</Text>

        <TouchableOpacity 
          style={styles.phoneInputFake}
          onPress={() => navigation.navigate('NumberInput')}
        >
          <Image 
            source={{ uri: 'https://flagcdn.com/w40/bd.png' }} 
            style={styles.flag} 
          />
          <Text style={styles.phoneNumber}>+880</Text> 
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Or connect with social media</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity 
          style={[styles.socialBtn, { backgroundColor: '#5383EC' }]}
          onPress={() => navigation.navigate('NumberInput')}
        >
          <FontAwesome name="google" size={22} color="white" style={styles.socialIcon} />
          <Text style={styles.socialBtnText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.socialBtn, { backgroundColor: '#4A66AC', marginTop: 20 }]}
          onPress={() => navigation.navigate('NumberInput')}
        >
          <FontAwesome name="facebook" size={22} color="white" style={styles.socialIcon} />
          <Text style={styles.socialBtnText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  headerImage: { width: '100%', height: 300, resizeMode: 'cover' },
  content: { paddingHorizontal: 25, marginTop: 30 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725', marginBottom: 30 },
  phoneInputFake: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 15,
    marginBottom: 40
  },
  flag: { width: 27, height: 18, marginRight: 12 },
  phoneNumber: { fontSize: 18, color: '#181725' },
  dividerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 40 
  },
  line: { flex: 1, height: 1, backgroundColor: '#E2E2E2' },
  dividerText: { marginHorizontal: 10, color: '#828282', fontSize: 14, fontWeight: '600' },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 67,
    borderRadius: 19,
    paddingHorizontal: 35,
    // Shadow cho Android/iOS
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  socialIcon: { marginRight: 40 },
  socialBtnText: { color: '#FFF', fontSize: 18, fontWeight: '600' }
});

export default SignInScreen;