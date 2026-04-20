import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OrderAcceptedScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.content}>
        {/* Hình ảnh check thành công (Dùng ảnh trong assets của bạn hoặc icon) */}
        <Image 
          source={require('../assets/Accepted.png')} 
          style={styles.image} 
          resizeMode="contain" 
        />
        
        <Text style={styles.title}>Your Order has been accepted</Text>
        <Text style={styles.subtitle}>
          Your items has been placed and is on its way to being processed
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.trackBtn}
          onPress={() => {
            // Logic nhảy sang màn Lịch sử đơn hàng nếu bạn đã làm
            // navigation.navigate('Orders'); 
          }}
        >
          <Text 
            style={styles.trackBtnText}
            onPress={() => navigation.navigate('OrderHistory')}
          >
            Track Order
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.navigate('Main')} // Quay về trang chủ
        >
          <Text style={styles.backBtnText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 250, height: 250, marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#181725', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', paddingHorizontal: 20, lineHeight: 22 },
  footer: { marginTop: 'auto' },
  trackBtn: { backgroundColor: '#53B175', padding: 20, borderRadius: 19, marginBottom: 15 },
  trackBtnText: { color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600' },
  backBtn: { padding: 15 },
  backBtnText: { color: '#181725', textAlign: 'center', fontSize: 18, fontWeight: '600' },
});

export default OrderAcceptedScreen;