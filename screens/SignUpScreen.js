import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  
  // State cho form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo cà rốt quen thuộc */}
          <Image 
            source={require('../assets/Carrot_Orange.png')} 
            style={styles.logo} 
          />

          <View style={styles.header}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Enter your credentials to continue</Text>
          </View>

          {/* Input Group */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput 
              style={styles.input}
              placeholder="Afsar Hassen Shuvo"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input}
              placeholder="imshuvo97@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            {/* Hiển thị icon check xanh nếu email hợp lệ (giả lập) */}
            {email.includes('@') && (
              <Ionicons name="checkmark" size={20} color="#53B175" style={styles.checkIcon} />
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput 
                style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                placeholder="********"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#7C7C7C" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing you agree to our 
              <Text style={styles.linkText}> Terms of Service </Text> 
              and 
              <Text style={styles.linkText}> Privacy Policy</Text>.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.signUpBtn}
            onPress={() => alert('Đăng ký thành công!')}
          >
            <Text style={styles.signUpBtnText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupLink}>Login</Text> 
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  logo: { alignSelf: 'center', width: 30, height: 35, marginBottom: 60 },
  header: { marginBottom: 40 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725' },
  subtitle: { fontSize: 16, color: '#7C7C7C', marginTop: 10 },
  inputGroup: { marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: '500' },
  input: { fontSize: 18, color: '#181725', paddingVertical: 10 },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center' },
  checkIcon: { position: 'absolute', right: 0, bottom: 15 },
  termsContainer: { marginVertical: 20 },
  termsText: { fontSize: 14, color: '#7C7C7C', lineHeight: 22 },
  linkText: { color: '#53B175' },
  signUpBtn: { 
    backgroundColor: '#53B175', 
    height: 67, 
    borderRadius: 19, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10
  },
  signUpBtnText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { fontSize: 14, color: '#181725', fontWeight: '600' },
  signupLink: { fontSize: 14, color: '#53B175', fontWeight: '600' }
});

export default SignUpScreen;