import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Pressable,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Verification = ({ navigation }) => {
  const [code, setCode] = useState('');
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);
  const CODE_LENGTH = 4;

  // Auto focus bàn phím
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (code.length === CODE_LENGTH) {
      const timer = setTimeout(() => {
        navigation.navigate('SelectLocation');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [code]);


  const renderCodeInputs = () => {
    const codeArray = code.split(''); 
    const inputs = [];

    for (let i = 0; i < CODE_LENGTH; i++) {
      inputs.push(
        <View key={i} style={[
          styles.codeBox,
          code.length === i && styles.codeBoxActive
        ]}>
          <Text style={styles.codeText}>{codeArray[i] || '-'}</Text>
        </View>
      );
    }
    return inputs;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.backBtn, { marginTop: insets.top + 10 }]} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#181725" />
      </TouchableOpacity>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Text style={styles.title}>Enter your 4-digit code</Text>
        <Text style={styles.label}>Code</Text>

        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={setCode}
          maxLength={CODE_LENGTH}
          keyboardType="number-pad"
          style={styles.hiddenInput}
        />

        <Pressable 
          style={styles.otpContainer} 
          onPress={() => inputRef.current?.focus()}
        >
          {renderCodeInputs()}
        </Pressable>

        <View style={[styles.footer, { marginBottom: insets.bottom + 30 }]}>
          <TouchableOpacity onPress={() => alert('OTP Resent!')}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.fab, { opacity: code.length === CODE_LENGTH ? 1 : 0.5 }]}
            disabled={code.length !== CODE_LENGTH}
            onPress={() => navigation.navigate('SelectLocation')}
            >
            <Ionicons name="chevron-forward" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingHorizontal: 25 },
  backBtn: { width: 40, height: 40, justifyContent: 'center', left: -10 },
  content: { flex: 1, marginTop: 40 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725', marginBottom: 20 },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: '500', marginBottom: 20 },
  hiddenInput: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15
  },
  codeBox: {
    width: 45,
    borderBottomWidth: 2,
    borderBottomColor: '#E2E2E2',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeBoxActive: {
    borderBottomColor: '#58AF7A',
  },
  codeText: {
    fontSize: 22,
    color: '#181725',
    fontWeight: '600'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resendText: {
    color: '#53B175',
    fontSize: 18,
    fontWeight: '500'
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

export default Verification;