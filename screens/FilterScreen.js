import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CATEGORY_FILTERS = [
  { id: '1', name: 'Eggs' },
  { id: '2', name: 'Noodles & Pasta' },
  { id: '3', name: 'Chips & Crisps' },
  { id: '4', name: 'Fast Food' },
];

const BRAND_FILTERS = [
  { id: '1', name: 'Individual Collection' },
  { id: '2', name: 'Cocola' },
  { id: '3', name: 'Ifad' },
  { id: '4', name: 'Kazi Farmas' },
];

const FilterScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedCats, setSelectedCats] = useState(['Eggs']); // Mặc định chọn Eggs 
  const [selectedBrands, setSelectedBrands] = useState(['Cocola']);

  const toggleFilter = (item, type) => {
    let list = type === 'cat' ? [...selectedCats] : [...selectedBrands];
    let setFunc = type === 'cat' ? setSelectedCats : setSelectedBrands;

    if (list.includes(item)) {
      setFunc(list.filter(i => i !== item));
    } else {
      setFunc([...list, item]);
    }
  };

  const FilterItem = ({ label, isSelected, onPress }) => (
    <TouchableOpacity style={styles.filterItemRow} onPress={onPress}>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <Text style={[styles.filterLabel, isSelected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {CATEGORY_FILTERS.map(item => (
            <FilterItem 
              key={item.id} 
              label={item.name} 
              isSelected={selectedCats.includes(item.name)}
              onPress={() => toggleFilter(item.name, 'cat')}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brand</Text>
          {BRAND_FILTERS.map(item => (
            <FilterItem 
              key={item.id} 
              label={item.name} 
              isSelected={selectedBrands.includes(item.name)}
              onPress={() => toggleFilter(item.name, 'brand')}
            />
          ))}
        </View>
      </ScrollView>

      {/* Button Apply */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.applyBtn} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.applyBtnText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#181725' },
  scrollContent: { flex: 1, backgroundColor: '#F2F3F2', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: '#181725', marginBottom: 20 },
  filterItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: '#B1B1B1',
    borderRadius: 8,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#53B175',
    borderColor: '#53B175',
  },
  filterLabel: { fontSize: 16, color: '#181725', fontWeight: '500' },
  labelSelected: { color: '#53B175' },
  footer: { padding: 20, backgroundColor: '#F2F3F2' },
  applyBtn: {
    backgroundColor: '#53B175',
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtnText: { color: '#FFF', fontSize: 18, fontWeight: '600' }
});

export default FilterScreen;