# 🎤 Sesli Asistan - React Native Uygulaması

Speech-to-Text, Text-to-Speech ve ElevenLabs API entegrasyonlu profesyonel sesli asistan mobil uygulaması.

## 📋 Özellikler

### 1. **Speech-to-Text (Konuşmadan Metne)**
- Native Android API kullanarak gerçek zamanlı konuşma tanıma
- Türkçe ve İngilizce dil desteği
- Gerçek zamanlı metin görüntüleme

### 2. **Text-to-Speech (Metinden Konuşmaya)**
- **Standart Ses**: Cihazın native TTS motoru (ücretsiz, offline)
- **ElevenLabs**: Profesyonel kaliteli ses sentezi (premium)
- Ses hızı kontrolü (0.5x - 2.0x)
- Ses tonu ve stabilite ayarları

### 3. **ElevenLabs API Entegrasyonu**
- Profesyonel kaliteli ses sentezi
- Çok dilli destek (Türkçe, İngilizce, vb.)
- Ses kütüphanesi (50+ farklı ses)
- Karakter kullanım takibi
- Ses önizleme özelliği

### 4. **Ek Özellikler**
- Konuşma geçmişi
- Ayarlar yönetimi
- Dil seçimi
- API key yönetimi
- Veri yönetimi (temizle, sıfırla)

## 🛠️ Teknoloji Stack

- **React Native** 0.82+
- **TypeScript**
- **React Navigation** (Stack Navigator)
- **@react-native-voice/voice** (STT)
- **react-native-tts** (Native TTS)
- **react-native-sound** (Ses oynatma)
- **axios** (HTTP istekleri)
- **AsyncStorage** (Yerel veri depolama)
- **react-native-permissions** (İzin yönetimi)

## 📦 Kurulum

### 1. Projeyi Klonla
```bash
git clone <repository-url>
cd VoiceAssistant
```

### 2. Bağımlılıkları Yükle
```bash
npm install
```

### 3. ElevenLabs API Key Alma
1. https://elevenlabs.io adresine git
2. Ücretsiz hesap oluştur
3. Profile → API Keys → Create New Key
4. API Key'i kopyala

### 4. .env Dosyasını Yapılandır
```bash
cp .env.example .env
```

`.env` dosyasını düzenle:
```
ELEVENLABS_API_KEY=sk_your_api_key_here
ELEVENLABS_BASE_URL=https://api.elevenlabs.io/v1
```

### 5. Android Emülatörü Başlat
```bash
# Android Studio'dan emülatör başlat veya
adb devices  # Bağlı cihazları kontrol et
```

### 6. Uygulamayı Çalıştır
```bash
npx react-native run-android
```

## 📱 Ekranlar

### Ana Ekran (Home)
- Konuşmaya başla butonu
- Metin giriş alanı
- Ses seçimi (Standart/ElevenLabs)
- Ses hızı kontrolü
- Metni oku butonu

### Ayarlar Ekranı (Settings)
- ElevenLabs API Key yönetimi
- Dil seçimi (Türkçe/İngilizce)
- Tema seçimi (Açık/Koyu)
- Kalan karakter gösterimi
- Veri yönetimi (geçmiş temizle, tüm verileri sıfırla)

### Ses Kütüphanesi (Voice Library)
- Tüm mevcut sesleri listele
- Ses arama
- Ses önizleme
- Ses seçimi

## 🎯 Kullanım Senaryoları

### Senaryo 1: Konuşmadan Metne Dönüştürme
1. Ana ekranda "🎤 Konuşmaya Başla" butonuna bas
2. Konuş
3. Metin otomatik olarak metin alanında görünür

### Senaryo 2: Standart Ses ile Metni Oku
1. Metin gir veya konuş
2. "Standart Ses" seçeneğini seç
3. "🔊 Metni Oku" butonuna bas
4. Cihazın native sesi metni okur

### Senaryo 3: ElevenLabs ile Profesyonel Ses
1. Ayarlar → ElevenLabs API Key ekle
2. Ayarlar → Ses Kütüphanesi → Ses seç
3. Ana ekranda "ElevenLabs" seçeneğini seç
4. Metin gir
5. "🔊 Metni Oku" butonuna bas
6. Profesyonel kaliteli ses oynatılır

## 🔐 Güvenlik

- API Key `.env` dosyasında saklanır
- `.env` dosyası `.gitignore`'a eklenir
- Hassas veriler AsyncStorage'da şifrelenmez (üretim için şifreleme eklenebilir)
- İzin yönetimi runtime'da yapılır

## 📊 Proje Yapısı

```
VoiceAssistant/
├── src/
│   ├── components/
│   │   ├── LoadingIndicator.tsx
│   │   ├── SpeechToTextButton.tsx
│   │   ├── TextInputArea.tsx
│   │   ├── VoiceSelector.tsx
│   │   └── PlayButton.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── VoiceLibraryScreen.tsx
│   ├── services/
│   │   ├── elevenlabsService.ts
│   │   ├── audioService.ts
│   │   └── storageService.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   └── permissions.ts
│   ├── styles/
│   │   ├── theme.ts
│   │   └── globalStyles.ts
│   └── config/
│       └── api.config.ts
├── android/
├── ios/
├── App.tsx
├── .env
├── .env.example
├── .gitignore
└── package.json
```

## 🚀 Geliştirme

### Yeni Feature Ekleme
1. Uygun klasöre dosya oluştur
2. TypeScript kullan
3. Stil için `theme.ts` kullan
4. Hata yönetimi ekle

### Debugging
```bash
# React Native Debugger
npx react-native start

# Ayrı terminalde
npx react-native run-android
```

## 🐛 Sorun Giderme

### "API Key Geçersiz" Hatası
- API Key'i kontrol et
- `.env` dosyasının doğru yolda olduğundan emin ol
- Uygulamayı yeniden başlat

### Mikrofon İzni Hatası
- Ayarlar → Uygulamalar → VoiceAssistant → İzinler → Mikrofon
- İzni etkinleştir

### Ses Oynatılamıyor
- İnternet bağlantısını kontrol et
- API Key'in geçerli olduğundan emin ol
- Kalan karakter limitini kontrol et

### Build Hatası
```bash
# Cache temizle
npm cache clean --force
rm -rf node_modules
npm install

# Android cache temizle
cd android
./gradlew clean
cd ..

# Yeniden build et
npx react-native run-android
```

## 📝 API Endpoints

### ElevenLabs API

#### Text-to-Speech
```
POST /text-to-speech/{voice_id}
Headers:
  - xi-api-key: YOUR_API_KEY
  - Content-Type: application/json

Body:
{
  "text": "Okunacak metin",
  "model_id": "eleven_multilingual_v2",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.75
  }
}

Response: Audio stream (mp3)
```

#### Ses Listesi
```
GET /voices
Headers:
  - xi-api-key: YOUR_API_KEY

Response:
{
  "voices": [
    {
      "voice_id": "...",
      "name": "...",
      "category": "...",
      "labels": {...}
    }
  ]
}
```

#### Kullanıcı Bilgisi
```
GET /user
Headers:
  - xi-api-key: YOUR_API_KEY

Response:
{
  "subscription": {
    "character_count": 1000,
    "character_limit": 10000
  }
}
```

## 📄 Lisans

MIT License

## 👨‍💻 Geliştirici

Sesli Asistan - React Native Uygulaması

## 🤝 Katkı

Katkılar hoş karşılanır! Lütfen pull request gönderin.

## 📞 Destek

Sorunlar için GitHub Issues'i kullan.

---

**Not**: Bu uygulama eğitim amaçlı geliştirilmiştir. Üretim ortamında ek güvenlik önlemleri alınmalıdır.

