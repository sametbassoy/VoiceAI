# 🔧 Sorun Giderme Rehberi

## Kurulum Sorunları

### Problem: "npm install" başarısız oluyor

**Çözüm:**
```bash
# npm cache temizle
npm cache clean --force

# node_modules sil
rm -rf node_modules

# Yeniden yükle
npm install
```

### Problem: "Node version mismatch"

**Çözüm:**
```bash
# Node versiyonunu kontrol et
node --version  # v20+ olmalı

# NVM kullanıyorsan
nvm use 20

# Yoksa Node.js'i güncelle
# https://nodejs.org/
```

### Problem: "ANDROID_HOME not found"

**Çözüm (Windows):**
1. Sistem Özellikleri → Ortam Değişkenleri
2. Yeni Sistem Değişkeni Ekle:
   - Adı: `ANDROID_HOME`
   - Değeri: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
3. PATH'e ekle: `%ANDROID_HOME%\platform-tools`
4. Bilgisayarı yeniden başlat

## Build Sorunları

### Problem: "Gradle build failed"

**Çözüm:**
```bash
# Android cache temizle
cd android
./gradlew clean
cd ..

# Yeniden build et
npm run android
```

### Problem: "SDK not found"

**Çözüm:**
```bash
# Android SDK'yı kontrol et
echo %ANDROID_HOME%

# SDK Manager'ı aç
# Android Studio → Tools → SDK Manager
# Eksik SDK'ları yükle
```

### Problem: "Java version mismatch"

**Çözüm:**
```bash
# Java versiyonunu kontrol et
java -version  # 11+ olmalı

# JAVA_HOME'u ayarla (Windows)
# Sistem Özellikleri → Ortam Değişkenleri
# JAVA_HOME=C:\Program Files\Java\jdk-11
```

## Runtime Sorunları

### Problem: "Metro Bundler hatası"

**Çözüm:**
```bash
# Metro cache'ini temizle
npm start -- --reset-cache

# Veya
watchman watch-del-all
npm start
```

### Problem: "Module not found"

**Çözüm:**
```bash
# Bağımlılıkları yeniden yükle
npm install

# Veya spesifik modülü yükle
npm install react-native-tts
```

### Problem: "Babel transformation error"

**Çözüm:**
```bash
# babel.config.js kontrol et
# Dosya proje kökünde olmalı

# Cache temizle
npm start -- --reset-cache
```

## Emülatör Sorunları

### Problem: "Emülatör başlamıyor"

**Çözüm:**
```bash
# Emülatörleri listele
emulator -list-avds

# Emülatörü başlat
emulator -avd Pixel_4_API_33

# Veya Android Studio'dan başlat
# Tools → Device Manager → Play
```

### Problem: "Emülatör çok yavaş"

**Çözüm:**
```bash
# Hardware acceleration'ı etkinleştir
emulator -avd Pixel_4_API_33 -accel on

# Veya Android Studio'da:
# Tools → Device Manager → Edit → Advanced Settings
# Graphics: Hardware
```

### Problem: "Emülatör bağlantısı kesildi"

**Çözüm:**
```bash
# ADB'yi yeniden başlat
adb kill-server
adb start-server

# Cihazları kontrol et
adb devices

# Emülatörü yeniden başlat
```

## Uygulama Sorunları

### Problem: "Uygulamada beyaz ekran"

**Çözüm:**
```bash
# Metro Bundler'ı kontrol et
npm start

# Ayrı terminalde
npm run android

# Veya manuel olarak
npx react-native run-android
```

### Problem: "Uygulamada kırmızı hata ekranı"

**Çözüm:**
1. Hata mesajını oku
2. Dosya ve satır numarasını kontrol et
3. Kodu düzelt
4. Ctrl+M (Cmd+M) ile reload et

### Problem: "Uygulamada sarı uyarı"

**Çözüm:**
- Genellikle güvenli, görmezden gelebilirsin
- Veya console.disableYellowBox = true; ekle

## Ses Sorunları

### Problem: "Mikrofon çalışmıyor"

**Çözüm:**
1. İzinleri kontrol et:
   - Ayarlar → Uygulamalar → VoiceAssistant → İzinler
   - Mikrofon: İzin Ver
2. Emülatörde:
   - Extended Controls → Microphone → Virtual microphone uses host audio input
3. Kodu kontrol et:
   ```typescript
   const hasPermission = await requestMicrophonePermission();
   if (!hasPermission) {
     // İzin yok
   }
   ```

### Problem: "Ses oynatılamıyor"

**Çözüm:**
1. İnternet bağlantısını kontrol et
2. API Key'i kontrol et
3. Kalan karakter limitini kontrol et
4. Ses dosyasının geçerli olduğundan emin ol

### Problem: "Ses çok sessiz veya çok yüksek"

**Çözüm:**
```typescript
// Ses seviyesini ayarla
const audioBuffer = await elevenlabsService.textToSpeech(
  text,
  voiceId,
  {
    stability: 0.5,
    similarity_boost: 0.75
  }
);

// Cihaz ses seviyesini kontrol et
```

## API Sorunları

### Problem: "401 Unauthorized"

**Çözüm:**
1. API Key'i kontrol et
2. `.env` dosyasının doğru yolda olduğundan emin ol
3. API Key'i yenile
4. Uygulamayı yeniden başlat

### Problem: "429 Too Many Requests"

**Çözüm:**
```typescript
// Retry logic ekle
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.response?.status === 429 && i < maxRetries - 1) {
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
      } else {
        throw error;
      }
    }
  }
}
```

### Problem: "Karakter limiti aşıldı"

**Çözüm:**
1. Ayarlar'da kalan karakter sayısını kontrol et
2. Daha kısa metinler kullan
3. Aylık limiti bekle (sıfırlanır)
4. Paid plan'a geç

### Problem: "Ses listesi yüklenmiyor"

**Çözüm:**
```typescript
// İnternet bağlantısını kontrol et
const isConnected = await NetInfo.fetch();
if (!isConnected.isConnected) {
  // Offline
}

// API Key'i kontrol et
const userInfo = await elevenlabsService.getUserInfo();
```

## Depolama Sorunları

### Problem: "AsyncStorage hatası"

**Çözüm:**
```typescript
// Depolama izni kontrol et
const hasPermission = await requestStoragePermission();

// Veya depolama temizle
await storageService.clear();
```

### Problem: "Ayarlar kaydedilmiyor"

**Çözüm:**
```typescript
// Depolama işlemini kontrol et
try {
  await storageService.saveApiKey(apiKey);
  console.log('Kaydedildi');
} catch (error) {
  console.error('Hata:', error);
}
```

## Navigasyon Sorunları

### Problem: "Ekran geçişi çalışmıyor"

**Çözüm:**
```typescript
// Navigation prop'unu kontrol et
navigation.navigate('ScreenName');

// Veya
navigation.push('ScreenName');
```

### Problem: "Geri butonu çalışmıyor"

**Çözüm:**
```typescript
// Stack Navigator'da geri butonu otomatik
// Veya manuel olarak:
navigation.goBack();
```

## Performans Sorunları

### Problem: "Uygulama yavaş"

**Çözüm:**
1. Gereksiz re-render'ları azalt
2. useMemo/useCallback kullan
3. Büyük listelerde FlatList kullan
4. Resim boyutlarını optimize et

### Problem: "Bellek sızıntısı"

**Çözüm:**
```typescript
// useEffect cleanup
useEffect(() => {
  // Setup
  return () => {
    // Cleanup
    audioService.cleanup();
  };
}, []);
```

## Debugging

### React Native Debugger
```bash
# Yükle
npm install -g react-native-debugger

# Çalıştır
react-native-debugger
```

### Console Logging
```typescript
console.log('Debug:', value);
console.warn('Warning:', value);
console.error('Error:', value);
```

### Breakpoints
1. Chrome DevTools'u aç (Cmd+M → Debug)
2. Sources tab'ında breakpoint koy
3. Kodu adım adım çalıştır

## Sık Sorulan Sorular

**S: Uygulamayı sıfırlamak istiyorum**
C: `npm run clean:android` ve `npm run android`

**S: Tüm cache'i temizlemek istiyorum**
C: `npm cache clean --force` ve `rm -rf node_modules`

**S: Emülatörü sıfırlamak istiyorum**
C: `emulator -avd Pixel_4_API_33 -wipe-data`

**S: Logları görmek istiyorum**
C: `adb logcat` veya Android Studio Logcat

**S: Fiziksel cihazda test etmek istiyorum**
C: USB debugging'i aç ve `adb devices` ile kontrol et

## İletişim

Sorunlar için:
1. Bu rehberi oku
2. GitHub Issues'i kontrol et
3. Stack Overflow'da ara
4. React Native Community'ye sor

---

**Başarıyla çözdüm! 🎉**

