import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SelectLocation = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  // State quản lý giá trị chọn
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('Types of your area');

  // Hàm helper để render một ô chọn (Dropdown Item)
  const PickerInput = ({ label, value, onPress }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.picker} onPress={onPress}>
        <Text style={[styles.pickerText, value.includes('Types') && {color: '#B1B1B1'}]}>
          {value}
        </Text>
        {/* Dùng icon mũi tên từ thư viện hoặc Image png của bro */}
        <Ionicons name="chevron-down" size={20} color="#7C7C7C" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity 
        style={[styles.backBtn, { marginTop: insets.top + 10 }]} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#181725" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hình minh họa bản đồ/vị trí */}
        <Image 
          source={require('../assets/Map.png')} 
          style={styles.illustration}
          resizeMode="contain"
        />

        <View style={styles.textGroup}>
          <Text style={styles.title}>Select Your Location</Text>
          <Text style={styles.subtitle}>
            Switch on your location to stay in tune with what’s happening in your area
          </Text>
        </View>

        {/* Các ô chọn tĩnh */}
        <PickerInput 
          label="Your Zone" 
          value={zone} 
          onPress={() => alert('Show Zone Picker')} 
        />

        <View style={{ height: 30 }} />

        <PickerInput 
          label="Your Area" 
          value={area} 
          onPress={() => alert('Show Area Picker')} 
        />

        <TouchableOpacity 
          style={styles.submitBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  backBtn: { marginLeft: 20, width: 40, height: 40, justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 25, alignItems: 'center', paddingBottom: 40 },
  illustration: { width: 220, height: 170, marginTop: 20, marginBottom: 40 },
  textGroup: { alignItems: 'center', marginBottom: 60 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725', textAlign: 'center' },
  subtitle: { 
    fontSize: 16, 
    color: '#7C7C7C', 
    textAlign: 'center', 
    marginTop: 15, 
    lineHeight: 22 
  },
  inputContainer: { width: '100%' },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: '500', marginBottom: 10 },
  picker: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 15
  },
  pickerText: { fontSize: 18, color: '#181725' },
  submitBtn: { 
    backgroundColor: '#53B175', 
    width: '100%', 
    height: 67, 
    borderRadius: 19, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 60
  },
  submitBtnText: { color: '#FFF', fontSize: 18, fontWeight: '600' }
});

export default SelectLocation;