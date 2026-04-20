import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const AccountScreen = () => {
  const { logout } = useContext(AuthContext); 

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 30 }}>
        <Image source={require('../assets/Avatar.png')} style={{ width: 65, height: 65, borderRadius: 30 }} />
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Afsar Hossen</Text>
          <Text style={{ color: '#7C7C7C' }}>Imshuvo97@gmail.com</Text>
        </View>
      </View>

      {['Orders', 'My Details', 'Delivery Address', 'Payment Methods'].map(menu => (
        <View key={menu} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
           <Text style={{ fontSize: 18 }}>{menu}</Text>
           <Ionicons name="chevron-forward" size={20} />
        </View>
      ))}

      <TouchableOpacity 
        onPress={logout}
        style={{ backgroundColor: '#F2F3F2', padding: 20, borderRadius: 15, marginTop: 'auto', marginBottom: 20, flexDirection: 'row', justifyContent: 'center' }}
      >
        <Ionicons name="log-out-outline" size={24} color="#53B175" style={{ marginRight: 10 }} />
        <Text style={{ color: '#53B175', fontWeight: 'bold', fontSize: 18 }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;