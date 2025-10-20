import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SimpleHomeScreen from './src/screens/SimpleHomeScreen';
import { COLORS } from './src/styles/theme';
import { ELEVENLABS_API_KEY } from '@env';
import elevenlabsService from './src/services/elevenlabsService';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Uygulama başlatılıyor...');
        console.log('🔍 ELEVENLABS_API_KEY:', ELEVENLABS_API_KEY ? '✅ Yüklü' : '❌ Boş');

        // .env dosyasından API anahtarını yükle
        if (ELEVENLABS_API_KEY && ELEVENLABS_API_KEY.startsWith('sk_')) {
          elevenlabsService.setApiKey(ELEVENLABS_API_KEY);
          console.log('✅ App: API anahtarı başarıyla ayarlandı');
        } else {
          console.warn('⚠️ App: API anahtarı .env dosyasında bulunamadı');
        }
      } catch (error) {
        console.error('❌ App: Başlatma hatası:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.BG_LIGHT}
        translucent={false}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.BG_LIGHT,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: COLORS.PRIMARY,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            cardStyle: {
              backgroundColor: COLORS.BG_LIGHT,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={SimpleHomeScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
