import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const NumberInput = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);

  const handlePhoneChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setPhoneNumber(cleaned);
  };

  useEffect(() => {
    // Auto focus bàn phím
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
        <TouchableOpacity 
          style={[styles.backBtn, { marginTop: insets.top + 10 }]} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Enter your mobile number</Text>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.phoneRow}>
                <Image 
                  source={{ uri: 'https://flagcdn.com/w40/bd.png' }} 
                  style={styles.flag} 
                />
                <Text style={styles.countryCode}>+880</Text>
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  placeholder="012345678"
                  maxLength={10}
                />
              </View>
            </View>
          </View>

          <View style={[styles.footer, { marginBottom: insets.bottom + 20 }]}>
            <TouchableOpacity 
              style={[
                styles.fab, 
                { opacity: phoneNumber.length > 8 ? 1 : 0.5 }
              ]}
              disabled={phoneNumber.length <= 8}
              onPress={() => navigation.navigate('Verification')}
            >
              <Ionicons name="chevron-forward" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingHorizontal: 25 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', left: -10, zIndex: 10 },
  content: { flex: 1, paddingTop: 40 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725', marginBottom: 40 },
  inputWrapper: { width: '100%' },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: '500', marginBottom: 10 },
  phoneRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10
  },
  flag: { width: 33, height: 23, marginRight: 12, borderRadius: 4 },
  countryCode: { fontSize: 18, color: '#181725', marginRight: 10 },
  input: { flex: 1, fontSize: 18, color: '#181725' },
  footer: {
    alignItems: 'flex-end', // Đẩy nút sang phải
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  fab: {
    width: 67,
    height: 67,
    borderRadius: 33.5,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#53B175',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
  }
});

export default NumberInput;