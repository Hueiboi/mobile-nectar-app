import React, { useState, useContext } from 'react'; 
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext'; 
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProductDetailScreen = ({ route, navigation }) => {
const insets = useSafeAreaInsets();
  const { item } = route.params || {};
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  const handleAddToBasket = () => {
    if (item) {
      addToCart(item, quantity); 
      navigation.goBack();  
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Header Section */}
        <View style={styles.imageHeader}>
          <View style={styles.headerBtns}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={28} color="#181725" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="upload" size={24} color="#181725" />
            </TouchableOpacity>
          </View>
          <Image 
            source={item?.image || require('../assets/apple.jpg')} 
            style={styles.mainImage} 
            resizeMode="contain" 
          />
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.productName}>{item?.name || 'Product Name'}</Text>
              <Text style={styles.unitText}>{item?.unit || 'Unit'}, Price</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="#7C7C7C" />
            </TouchableOpacity>
          </View>

          {/* Quantity and Price */}
          <View style={styles.priceQuantityRow}>
            <View style={styles.counter}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Text style={styles.counterSymbol}>-</Text>
              </TouchableOpacity>
              <View style={styles.quantityBox}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Text style={[styles.counterSymbol, {color: '#53B175'}]}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.priceText}>
              ${((item?.price || 0) * quantity).toFixed(2)}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Expandable Sections */}
          <ExpandableRow title="Product Detail" content="Apples are nutritious. Apples may be good for weight loss. Apples may be good for your heart." isOpen={true} />
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Nutritions</Text>
            <View style={styles.rowRight}>
              <View style={styles.nutritionBadge}><Text style={styles.nutritionText}>100gr</Text></View>
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Review</Text>
            <View style={styles.rowRight}>
              <View style={styles.stars}>
                {[1,2,3,4,5].map(i => <Ionicons key={i} name="star" size={16} color="#F3603F" />)}
              </View>
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.basketBtn} 
          onPress={handleAddToBasket}
        >
          <Text style={styles.basketBtnText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Sub-component cho các hàng mở rộng
const ExpandableRow = ({ title, content, isOpen }) => (
  <View style={styles.expandableContainer}>
    <View style={styles.row}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {isOpen ? <Ionicons name="chevron-down" size={24} color="#181725" /> : <Ionicons name="chevron-forward" size={24} color="#181725" />}
    </View>
    {isOpen && <Text style={styles.descriptionText}>{content}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  imageHeader: {
    height: 350,
    backgroundColor: '#F2F3F2',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtns: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 1
  },
  mainImage: { width: '100%', height: 250, alignSelf: 'center', marginTop: 20 },
  contentSection: { padding: 25 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  productName: { fontSize: 24, fontWeight: '700', color: '#181725' },
  unitText: { fontSize: 16, color: '#7C7C7C', marginTop: 5, fontWeight: '600' },
  priceQuantityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 },
  counter: { flexDirection: 'row', alignItems: 'center' },
  counterSymbol: { fontSize: 28, color: '#B3B3B3', paddingHorizontal: 15 },
  quantityBox: { borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 17, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
  quantityText: { fontSize: 18, fontWeight: '600' },
  priceText: { fontSize: 24, fontWeight: '700', color: '#181725' },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginVertical: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#181725' },
  descriptionText: { color: '#7C7C7C', lineHeight: 21, marginTop: 10, fontSize: 13 },
  nutritionBadge: { backgroundColor: '#EBEBEB', borderRadius: 5, paddingHorizontal: 8, paddingVertical: 2, marginRight: 10 },
  nutritionText: { fontSize: 12, color: '#7C7C7C' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  stars: { flexDirection: 'row', marginRight: 10 },
  footer: { padding: 25, paddingBottom: 40 },
  basketBtn: { backgroundColor: '#53B175', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  basketBtnText: { color: '#FFF', fontSize: 18, fontWeight: '600' }
});

export default ProductDetailScreen;