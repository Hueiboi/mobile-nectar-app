import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CART } from '../constants/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';

const MyCart = () => {
  const insets = useSafeAreaInsets();
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.unit}>{item.unit}</Text>
        <View style={styles.quantityRow}>
          <View style={styles.counter}>
             <TouchableOpacity style={styles.btn}><Text>-</Text></TouchableOpacity>
             <Text style={{marginHorizontal: 10}}>1</Text>
             <TouchableOpacity style={styles.btn}><Text style={{color: '#53B175'}}>+</Text></TouchableOpacity>
          </View>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Text style={styles.title}>My Cart</Text>
      <FlatList data={CART} renderItem={renderItem} />
      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Go to Checkout</Text>
        <Text style={styles.totalPrice}>$12.96</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  cartItem: { flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  image: { width: 70, height: 70 },
  details: { flex: 1, marginLeft: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: 'bold' },
  unit: { color: '#7C7C7C', marginVertical: 5 },
  quantityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  counter: { flexDirection: 'row', alignItems: 'center' },
  btn: { width: 30, height: 30, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  price: { fontSize: 18, fontWeight: 'bold' },
  checkoutBtn: { backgroundColor: '#53B175', padding: 20, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 20, left: 20, right: 20 },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  totalPrice: { color: '#fff', position: 'absolute', right: 20, top: 20 }
});

export default MyCart;