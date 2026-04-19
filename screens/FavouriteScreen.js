import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { BEVERAGES } from '../constants/data';
import { Entypo } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Favorites = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Text style={styles.title}>Favourite</Text>
      <FlatList
        data={BEVERAGES}
        renderItem={({ item }) => (
          <View style={styles.favItem}>
            <Image source={item.image} style={styles.img} resizeMode="contain" />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.unit}>{item.unit}</Text>
            </View>
            <Text style={styles.price}>${item.price}</Text>
            <Entypo name="chevron-right" size={24} color="black" />
          </View>
        )}
      />
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.btnText}>Add All To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 15 },
  favItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  img: { width: 50, height: 50 },
  name: { fontSize: 16, fontWeight: 'bold' },
  unit: { color: '#7C7C7C' },
  price: { fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  addBtn: { backgroundColor: '#53B175', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});

export default Favorites;