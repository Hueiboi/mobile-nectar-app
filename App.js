import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import AppNavigator from './navigation/AppNavigator'; 
import InfoModal from './components/Info';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <InfoModal
          visible={true}
          name="Bùi Đình Hiếu"
          studentId="23810310246"
        />
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
