import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { CartContext } from '../context/CartContext'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { storageService, KEYS } from '../service/StorageService'; 

const CheckoutRow = ({ label, value }) => (
  <View style={styles.checkoutRow}>
    <Text style={{ color: '#7C7C7C', fontSize: 18 }}>{label}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold', color: '#181725', marginRight: 10 }}>{value}</Text>
      <Ionicons name="chevron-forward" size={18} color="#181725" />
    </View>
  </View>
);

const MyCart = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, setCartItems } = useContext(CartContext);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cartItems,
        total: getTotalPrice(),
      };
      
      // Lấy list cũ, thêm đơn mới vào
      const oldOrders = await storageService.get(KEYS.ORDERS) || [];
      await storageService.save(KEYS.ORDERS, [newOrder, ...oldOrders]);
      
      await storageService.save(KEYS.CART, []);
      setCartItems([]);
      setCheckoutVisible(false); 
      navigation.navigate('OrderAccepted'); 
    } catch (error) {
      console.log("Order error:", error);
      setCartItems([]);
      setCheckoutVisible(false);
      navigation.navigate('OrderAccepted');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.details}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Entypo name="cross" size={24} color="#7C7C7C" />
          </TouchableOpacity>
        </View>
        <Text style={styles.unit}>{item.unit}</Text>
        <View style={styles.quantityRow}>
          <View style={styles.counter}>
            <TouchableOpacity 
              style={styles.btn} 
              onPress={() => updateQuantity(item.id, -1)}
            >
              <Text style={styles.btnText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.btn} 
              onPress={() => updateQuantity(item.id, 1)}
            >
              <Text style={[styles.btnText, {color: '#53B175'}]}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>My Cart</Text>
      
      <FlatList 
        data={cartItems} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
      />

      {cartItems.length > 0 && (
        <TouchableOpacity 
          style={styles.checkoutBtn}
          onPress={() => setCheckoutVisible(true)} 
        >
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.priceTag}>
            <Text style={styles.totalPrice}>${getTotalPrice()}</Text>
          </View>
        </TouchableOpacity>
      )}

      <Modal
        visible={isCheckoutVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCheckoutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.checkoutSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setCheckoutVisible(false)}>
                <Ionicons name="close" size={24} color="#181725" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <CheckoutRow label="Delivery" value="Select Method" />
              <CheckoutRow label="Payment" value="💳" />
              <CheckoutRow label="Promo Code" value="Pick discount" />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Cost</Text>
                <Text style={styles.totalValue}>${getTotalPrice()}</Text>
              </View>
            </View>

            <Text style={styles.termsText}>
              By placing an order you agree to our <Text style={{fontWeight: 'bold'}}>Terms And Conditions</Text>
            </Text>

            <TouchableOpacity 
              style={styles.placeOrderBtn} 
              onPress={handlePlaceOrder}
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  cartItem: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  image: { width: 80, height: 80 },
  details: { flex: 1, marginLeft: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 18, fontWeight: 'bold' },
  unit: { color: '#7C7C7C', marginVertical: 5 },
  quantityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  counter: { flexDirection: 'row', alignItems: 'center' },
  btn: { width: 35, height: 35, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnText: { fontSize: 20 },
  quantityText: { marginHorizontal: 15, fontSize: 16 },
  price: { fontSize: 18, fontWeight: 'bold' },
  checkoutBtn: { 
    position: 'absolute', bottom: 20, left: 20, right: 20, 
    backgroundColor: '#53B175', borderRadius: 19, padding: 20, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center' 
  },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  priceTag: { backgroundColor: '#489E67', padding: 5, borderRadius: 5, marginLeft: 15 },
  totalPrice: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  checkoutSheet: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold' },
  checkoutRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  totalLabel: { fontSize: 18, color: '#7C7C7C' },
  totalValue: { fontSize: 18, fontWeight: 'bold' },
  placeOrderBtn: { backgroundColor: '#53B175', padding: 20, borderRadius: 19, marginTop: 25 },
  placeOrderText: { color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
  termsText: { color: '#7C7C7C', fontSize: 13, marginTop: 15 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#7C7C7C' }
});

export default MyCart;