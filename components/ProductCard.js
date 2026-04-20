import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ item, onAdd }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ProductDetail', { item })}
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      
      <View style={styles.infoContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemUnit}>{item.unit}, Price</Text>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.itemPrice}>${item.price}</Text>
        
        <TouchableOpacity 
          style={styles.addBtn}
          onPress={(e) => {
            if (onAdd) onAdd();
          }}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 173,
    backgroundColor: '#FFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    padding: 15,
    marginRight: 15,
  },
  cardImage: {
    width: '100%',
    height: 80,
    marginBottom: 15,
  },
  infoContainer: {
    marginBottom: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181725',
  },
  itemUnit: {
    fontSize: 14,
    color: '#7C7C7C',
    marginTop: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
  },
  addBtn: {
    backgroundColor: '#53B175',
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;