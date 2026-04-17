import React from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, 
  TextInput, TouchableOpacity, Dimensions 
} from 'react-native';
import { CATEGORIES } from '../constants/data'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const itemWidth = (width - 60) / 2; 

const ExploreScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }) => (
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
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Find Products</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#181725" />
          <TextInput 
            placeholder="Search Store" 
            style={styles.searchInput}
            placeholderTextColor="#7C7C7C"
          />
        </View>

        <FlatList
          data={CATEGORIES}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { paddingHorizontal: 20 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
    color: '#181725'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 52,
    marginBottom: 20
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14, fontWeight: '600' },
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
  }
});

export default ExploreScreen;