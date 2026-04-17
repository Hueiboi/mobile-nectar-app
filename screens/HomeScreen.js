import React from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Image, 
  TextInput, TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { EXCLUSIVE_OFFERS, BEST_SELLING, GROCERIES } from '../constants/data';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  // Sub-component: Section Header
  const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    </View>
  );

  const ProductCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { item })}
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemUnit}>{item.unit}, Price</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <TouchableOpacity style={styles.addBtn}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        {/* 1. Header Location */}
        <View style={styles.header}>
          <Image source={require('../assets/Carrot_Orange.png')} style={styles.logo} />
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={18} color="#4C4C4C" />
            <Text style={styles.locationText}>Dhaka, Banassre</Text>
          </View>
        </View>

        {/* 2. Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#181725" />
          <TextInput 
            placeholder="Search Store" 
            style={styles.searchInput}
            placeholderTextColor="#7C7C7C"
          />
        </View>

        {/* 3. Promo Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            source={require('../assets/fresh_vegetables.jpg')} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* 4. Exclusive Offer Section */}
        <SectionHeader title="Exclusive Offer" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {EXCLUSIVE_OFFERS.map(item => <ProductCard key={item.id} item={item} />)}
        </ScrollView>

        {/* 5. Best Selling Section */}
        <SectionHeader title="Best Selling" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {BEST_SELLING.map(item => <ProductCard key={item.id} item={item} />)}
        </ScrollView>

        {/* 6. Groceries Section (Mô phỏng list ngang nhỏ hơn) */}
        <SectionHeader title="Groceries" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.horizontalList, {paddingBottom: 20}]}>
            <View style={[styles.groceryCategory, { backgroundColor: '#F8A44C20' }]}>
                <Image source={require('../assets/pulses.jpg')} style={styles.groceryImg} />
                <Text style={styles.groceryText}>Pulses</Text>
            </View>
            <View style={[styles.groceryCategory, { backgroundColor: '#53B17520' }]}>
                <Image source={require('../assets/rice.jpg')} style={styles.groceryImg} />
                <Text style={styles.groceryText}>Rice</Text>
            </View>
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {GROCERIES.map(item => <ProductCard key={item.id} item={item} />)}
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
  card: {
    width: 173,
    height: 248,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    marginRight: 15,
  },
  cardImage: { width: '100%', height: 100, marginBottom: 15 },
  itemName: { fontSize: 16, fontWeight: '700', color: '#181725' },
  itemUnit: { fontSize: 14, color: '#7C7C7C', marginTop: 5 },
  cardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 'auto' 
  },
  itemPrice: { fontSize: 18, fontWeight: '600', color: '#181725' },
  addBtn: { 
    backgroundColor: '#53B175', 
    width: 45, 
    height: 45, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

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