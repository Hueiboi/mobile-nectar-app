import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// 1. Import Context và Data
import { CartContext } from '../context/CartContext';
import { EXCLUSIVE_OFFERS, BEST_SELLING, GROCERIES } from '../constants/data';
import ProductCard from '../components/ProductCard'; // Đảm bảo ProductCard đã nhận prop onAdd

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  
  // 2. Lấy hàm addToCart từ Context (Đáp ứng Yêu cầu 2 của thầy)
  const { addToCart } = useContext(CartContext);

  const SectionHeader = ({ title, onPress }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    </View>
  );

  // Hàm xử lý khi bấm vào sản phẩm
  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { item: product });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header Location */}
        <View style={styles.header}>
          <Image source={require('../assets/Carrot_Orange.png')} style={styles.logo} />
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={18} color="#4C4C4C" />
            <Text style={styles.locationText}>Dhaka, Banasree</Text>
          </View>
        </View>

        {/* Search Bar: sang Tab Explore để tìm kiếm */}
        <TouchableOpacity 
          activeOpacity={1}
          style={styles.searchBox} 
          onPress={() => navigation.navigate('Explore')}
        >
          <Ionicons name="search" size={20} color="#181725" />
          <Text style={{ marginLeft: 10, color: '#7C7C7C' }}>Search Store</Text>
        </TouchableOpacity>

        {/* Promo Banner */}
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/fresh_vegetables.jpg')} style={styles.bannerImage} resizeMode="cover" />
        </View>

        {/* Exclusive Offer */}
        <SectionHeader title="Exclusive Offer" onPress={() => {}} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {EXCLUSIVE_OFFERS.map(item => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onPress={() => handleProductPress(item)}
              onAdd={() => addToCart(item)} // Gửi hành động thêm vào giỏ (Ảnh 4)
            />
          ))}
        </ScrollView>

        {/* Best Selling */}
        <SectionHeader title="Best Selling" onPress={() => {}} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {BEST_SELLING.map(item => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onPress={() => handleProductPress(item)}
              onAdd={() => addToCart(item)}
            />
          ))}
        </ScrollView>

        {/* Groceries Section */}
        <SectionHeader title="Groceries" onPress={() => {}} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.groceryList, {marginBottom: 20, marginLeft: 20}]}>
           {/* Mock Categories nhỏ */}
           <TouchableOpacity style={[styles.groceryCategory, { backgroundColor: '#F8A44C20' }]}>
              <Image source={require('../assets/pulses.jpg')} style={styles.groceryImg} />
              <Text style={styles.groceryText}>Pulses</Text>
           </TouchableOpacity>
           <TouchableOpacity style={[styles.groceryCategory, { backgroundColor: '#53B17520' }]}>
              <Image source={require('../assets/rice.jpg')} style={styles.groceryImg} />
              <Text style={styles.groceryText}>Rice</Text>
           </TouchableOpacity>
        </ScrollView>

        {/* List Groceries Products */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {GROCERIES.map(item => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onPress={() => handleProductPress(item)}
              onAdd={() => addToCart(item)}
            />
          ))}
        </ScrollView>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  logo: { width: 30, height: 35, marginBottom: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 18, fontWeight: '600', color: '#4C4C4C', marginLeft: 5 },
  
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginHorizontal: 20,
    height: 52,
  },
  searchInput: { flex: 1, paddingLeft: 10, fontWeight: '600', fontSize: 14 },
  
  bannerContainer: { marginHorizontal: 20, marginVertical: 20, borderRadius: 8, overflow: 'hidden' },
  bannerImage: { width: '100%', height: 115 },

  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    marginTop: 25, 
    marginBottom: 15 
  },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: '#181725' },
  seeAllText: { fontSize: 16, color: '#53B175', fontWeight: '600' },

  horizontalList: { paddingLeft: 20 },
  
  groceryCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    height: 105,
    borderRadius: 18,
    padding: 15,
    marginRight: 15,
  },
  groceryImg: { width: 70, height: 70, marginRight: 15 },
  groceryText: { fontSize: 20, fontWeight: '600', color: '#3E423F' }
});

export default HomeScreen;