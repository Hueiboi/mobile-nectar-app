import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const InfoModal = ({ visible, name, studentId, onFinished }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          if (onFinished) onFinished();
        });
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
      <View style={styles.modal}>
        <View style={styles.indicator} />
        <Text style={styles.label}>Sinh viên thực hiện:</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>MSSV: {studentId}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 60, 
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    width: width * 0.8,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderLeftWidth: 5,
    borderLeftColor: '#58AF7A',
  },
  indicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E2E2',
    borderRadius: 2,
    marginBottom: 10,
  },
  label: { fontSize: 12, color: '#7C7C7C', marginBottom: 4 },
  name: { fontSize: 18, fontWeight: '700', color: '#181725' },
  id: { fontSize: 14, color: '#53B175', fontWeight: '600', marginTop: 2 },
});

export default InfoModal;