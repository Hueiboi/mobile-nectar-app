import React, { useState, useMemo } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, 
  TextInput, TouchableOpacity, Dimensions 
} from 'react-native';
// Đảm bảo bạn có ALL_PRODUCTS trong file data của mình
import { CATEGORIES, SEARCH_PRODUCTS } from '../constants/data'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard'; // Tái sử dụng ProductCard cũ

const { width } = Dimensions.get('window');
const itemWidth = (width - 60) / 2; 

const ExploreScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // useMemo để tối ưu hiệu năng lọc dữ liệu khi danh sách sản phẩm lớn
  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) return [];
    return SEARCH_PRODUCTS.filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  // Render Category
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.catCard, 
        { backgroundColor: item.color, borderColor: item.borderColor } 
      ]}
      onPress={() => {
        if (item.name === 'Beverages') {
          navigation.navigate('Beverages');
        }
      }}
    >
      <Image source={item.image} style={styles.catImage} resizeMode="contain" />
      <Text style={styles.catName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {searchText ? 'Search Results' : 'Find Products'}
        </Text>
        
        <View style={styles.headerRow}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#181725" />
            <TextInput 
              placeholder="Search Store" 
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              onFocus={() => setIsFocused(true)}   // Bắt đầu search
              onBlur={() => {
                if(searchText === '') setIsFocused(false); // Mất focus và ko có chữ thì ẩn
              }}
            />
          </View>
          
          {/* LOGIC: Chỉ hiển thị nút Filter khi đang search hoặc ô search có chữ */}
          {(isFocused || searchText.length > 0) && (
            <TouchableOpacity 
              style={styles.filterBtn}
              onPress={() => navigation.navigate('Filter')}
            >
              <Ionicons name="options-outline" size={24} color="#181725" />
            </TouchableOpacity>
          )}
        </View>

        {/* Logic hiển thị: Nếu có text thì hiện sản phẩm, ngược lại hiện Category */}
        {searchText.length > 0 ? (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <View style={{ width: itemWidth, marginBottom: 15 }}>
                <ProductCard item={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            ListEmptyComponent={() => (
              <Text style={styles.emptyText}>No products found for "{searchText}"</Text>
            )}
          />
        ) : (
          <FlatList
            data={CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { paddingHorizontal: 20, flex: 1 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: '#181725'
  },
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20,
    gap: 10 
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 52,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, fontWeight: '600' },
  filterBtn: { padding: 5 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  catCard: {
    width: itemWidth,
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catImage: { width: 100, height: 80, marginBottom: 15 },
  catName: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#181725'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#7C7C7C',
    fontSize: 16
  }
});

export default ExploreScreen;