import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { BEVERAGES } from '../constants/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BeverageScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  // Render từng item trong Grid
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { item })}
    >
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      
      <View style={styles.infoContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemUnit}>{item.unit}, Price</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.plusBtn}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Header Custom */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beverages</Text>
        <TouchableOpacity>
          <Feather name="sliders" size={24} color="#181725" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={BEVERAGES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#181725' },
  
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  listPadding: { paddingTop: 10, paddingBottom: 20 },

  card: {
    width: '46%', // Đảm bảo vừa vặn 2 cột có gap
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    backgroundColor: '#FFF',
  },
  productImage: {
    width: '100%',
    height: 100,
    marginBottom: 15,
  },
  infoContainer: { height: 60 },
  itemName: { fontSize: 16, fontWeight: '700', color: '#181725' },
  itemUnit: { fontSize: 14, color: '#7C7C7C', marginTop: 5 },
  
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: { fontSize: 18, fontWeight: '600', color: '#181725' },
  plusBtn: {
    backgroundColor: '#53B175',
    width: 45,
    height: 45,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default BeverageScreen;