# 🚀 Sesli Asistan - Kurulum ve Başlama Rehberi

## Adım 1: Ön Gereksinimler

Aşağıdaki yazılımları yüklü olduğundan emin ol:

- **Node.js** v20+ (https://nodejs.org/)
- **Java Development Kit (JDK)** 11+ (https://www.oracle.com/java/technologies/downloads/)
- **Android Studio** (https://developer.android.com/studio)
- **Git** (https://git-scm.com/)

### Kurulum Kontrolü
```bash
node --version      # v20.x.x
npm --version       # 10.x.x
java -version       # 11+
```

## Adım 2: Android Ortamını Yapılandır

### Android SDK Kurulumu
1. Android Studio'yu aç
2. SDK Manager'ı aç (Tools → SDK Manager)
3. Aşağıdakileri yükle:
   - Android SDK Platform 33+
   - Android SDK Build-Tools 33+
   - Android Emulator
   - Android SDK Platform-Tools

### ANDROID_HOME Ortam Değişkeni
Windows'ta:
```bash
# Sistem Özellikleri → Ortam Değişkenleri
# Yeni Değişken Ekle:
ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
```

PATH'e ekle:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
```

## Adım 3: Projeyi Klonla ve Kur

```bash
# Proje klasörüne git
cd VoiceAssistant

# Bağımlılıkları yükle
npm install

# Bağımlılıkları kontrol et
npm list
```

## Adım 4: ElevenLabs API Key Alma

1. https://elevenlabs.io adresine git
2. **Sign Up** butonuna tıkla
3. Email ve şifre ile hesap oluştur
4. Email doğrulaması yap
5. Dashboard'a gir
6. Sol menüden **Profile** → **API Keys** seç
7. **Create New Key** butonuna tıkla
8. API Key'i kopyala

## Adım 5: .env Dosyasını Yapılandır

```bash
# .env.example'dan .env oluştur
cp .env.example .env
```

`.env` dosyasını düzenle (metin editörü ile aç):
```
ELEVENLABS_API_KEY=sk_your_api_key_here
ELEVENLABS_BASE_URL=https://api.elevenlabs.io/v1
```

**Örnek:**
```
ELEVENLABS_API_KEY=sk_1234567890abcdefghijklmnop
ELEVENLABS_BASE_URL=https://api.elevenlabs.io/v1
```

## Adım 6: Android Emülatörü Başlat

### Seçenek 1: Android Studio'dan
1. Android Studio'yu aç
2. AVD Manager'ı aç (Tools → Device Manager)
3. Bir emülatör seç veya yeni oluştur
4. Play butonuna tıkla

### Seçenek 2: Komut Satırından
```bash
# Mevcut emülatörleri listele
emulator -list-avds

# Emülatörü başlat
emulator -avd Pixel_4_API_33
```

### Seçenek 3: Fiziksel Cihaz
1. USB kablosu ile cihazı bilgisayara bağla
2. Cihazda Developer Mode'u aç
3. USB Debugging'i etkinleştir
4. Bağlantıyı onayla

Bağlantıyı kontrol et:
```bash
adb devices
```

## Adım 7: Uygulamayı Çalıştır

### Metro Bundler'ı Başlat
```bash
npm start
```

### Ayrı Terminalde Uygulamayı Çalıştır
```bash
npm run android
```

Veya:
```bash
npx react-native run-android
```

## Adım 8: İlk Kullanım

### Mikrofon İzni Verme
1. Uygulama açıldığında izin isteyecek
2. **Tamam** butonuna tıkla

### API Key Ekleme
1. Ana ekranda **⚙️ Ayarlar** butonuna tıkla
2. "ElevenLabs API Anahtarı" alanına API Key'i yapıştır
3. **💾 Kaydet** butonuna tıkla

### Ses Seçme
1. Ayarlar ekranında **Ses Kütüphanesi** butonuna tıkla
2. Bir ses seç
3. **✓ Seç** butonuna tıkla

### İlk Test
1. Ana ekrana dön
2. Metin alanına "Merhaba" yaz
3. "ElevenLabs" seçeneğini seç
4. **🔊 Metni Oku** butonuna tıkla
5. Ses oynatılacak

## 🔧 Sorun Giderme

### "Metro Bundler Hatası"
```bash
npm start -- --reset-cache
```

### "Build Hatası"
```bash
npm run clean:android
npm run android
```

### "Emülatör Başlamıyor"
```bash
# Emülatör cache'ini temizle
emulator -avd Pixel_4_API_33 -wipe-data
```

### "Cihaz Görünmüyor"
```bash
# ADB'yi yeniden başlat
adb kill-server
adb start-server
adb devices
```

### "API Key Hatası"
- `.env` dosyasının proje kökünde olduğundan emin ol
- API Key'in `sk_` ile başladığından emin ol
- Uygulamayı yeniden başlat

### "Mikrofon Çalışmıyor"
- Ayarlar → Uygulamalar → VoiceAssistant → İzinler → Mikrofon
- İzni etkinleştir

### "Ses Oynatılamıyor"
- İnternet bağlantısını kontrol et
- API Key'in geçerli olduğundan emin ol
- Kalan karakter limitini kontrol et (Ayarlar'da gösterilir)

## 📱 Özellik Testleri

### Speech-to-Text Test
1. "🎤 Konuşmaya Başla" butonuna tıkla
2. "Merhaba dünya" söyle
3. Metin alanında görünmesi gerekir

### Native TTS Test
1. Metin gir
2. "Standart Ses" seçeneğini seç
3. "🔊 Metni Oku" butonuna tıkla
4. Cihazın sesi duyulmalı

### ElevenLabs TTS Test
1. Metin gir
2. "ElevenLabs" seçeneğini seç
3. "🔊 Metni Oku" butonuna tıkla
4. Profesyonel ses duyulmalı

### Ses Kütüphanesi Test
1. Ayarlar → Ses Kütüphanesi
2. Bir ses seç
3. "▶️" butonuna tıkla (önizleme)
4. Ses duyulmalı

## 🎯 Sonraki Adımlar

1. **Özelleştirme**: Renkleri ve yazı tiplerini değiştir
2. **Dil Ekleme**: Yeni dil desteği ekle
3. **Tema**: Dark mode ekle
4. **Geçmiş**: Konuşma geçmişini görüntüle
5. **Export**: Ses dosyalarını dışa aktar

## 📚 Kaynaklar

- [React Native Docs](https://reactnative.dev/)
- [ElevenLabs API Docs](https://elevenlabs.io/docs)
- [Android Developer Docs](https://developer.android.com/docs)
- [React Navigation Docs](https://reactnavigation.org/)

## 💡 İpuçları

- Metro Bundler'ı açık tutarak geliştirme yap
- Kod değişikliklerinde otomatik reload olur
- Emülatörde Ctrl+M (Cmd+M) ile debug menüsünü aç
- `console.log()` ile debug et

## ❓ Sık Sorulan Sorular

**S: API Key'i nereden alabilirim?**
C: https://elevenlabs.io adresinden ücretsiz hesap oluştur ve API Keys bölümünden al.

**S: Ücretsiz API Key'in limiti nedir?**
C: Aylık 10.000 karakter limit vardır.

**S: Offline çalışabilir mi?**
C: Standart TTS offline çalışır, ElevenLabs internet gerektirir.

**S: Başka dil ekleyebilir miyim?**
C: Evet, `constants.ts` dosyasında LANGUAGES'a ekle.

**S: Tema değiştirebilir miyim?**
C: Evet, `theme.ts` dosyasında renkler tanımlanmıştır.

---

**Başarıyla kurdum! 🎉**

Sorunlar için GitHub Issues'i kullan veya README_TR.md dosyasını oku.

