import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { storageService, KEYS } from '../service/StorageService';
import { Ionicons } from '@expo/vector-icons';

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const savedOrders = await storageService.get(KEYS.ORDERS) || [];
      setOrders(savedOrders);
    };
    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>{item.date}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Completed</Text>
        </View>
      </View>
      
      {item.items.map((prod, index) => (
        <Text key={index} style={styles.productName}>
          • {prod.name} (x{prod.quantity})
        </Text>
      ))}
      
      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Total: ${item.total}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.empty}>No orders yet</Text>}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  orderCard: { backgroundColor: '#F2F3F2', borderRadius: 15, padding: 15, marginBottom: 15 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  orderDate: { color: '#7C7C7C', fontWeight: '500' },
  statusBadge: { backgroundColor: '#53B175', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  productName: { fontSize: 16, color: '#181725', marginBottom: 5 },
  orderFooter: { borderTopWidth: 1, borderTopColor: '#E2E2E2', marginTop: 10, paddingTop: 10, alignItems: 'flex-end' },
  totalText: { fontWeight: 'bold', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 100, color: '#7C7C7C' }
});

export default OrderHistoryScreen;