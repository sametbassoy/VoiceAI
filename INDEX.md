# 📑 Dokümantasyon İndeksi

## 🎯 Başlangıç

Yeni başlıyorsan buradan başla:

1. **[QUICK_START.md](QUICK_START.md)** ⚡
   - 5 dakikada başla
   - Temel komutlar
   - İlk test

2. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** 🔧
   - Detaylı kurulum
   - Ön gereksinimler
   - Adım adım talimatlar

## 📚 Dokümantasyon

### Genel Bilgi
- **[README_TR.md](README_TR.md)** - Proje açıklaması ve genel bilgiler
- **[SUMMARY.md](SUMMARY.md)** - Proje özeti ve istatistikler

### Detaylı Rehberler
- **[FEATURES.md](FEATURES.md)** - Tüm özelliklerin detaylı açıklaması
- **[API_INTEGRATION.md](API_INTEGRATION.md)** - ElevenLabs API entegrasyonu
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - Proje yapısı ve dosya organizasyonu

### Sorun Giderme
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Sorun giderme rehberi

## 🗂️ Dosya Yapısı

```
VoiceAssistant/
├── 📄 Dokümantasyon
│   ├── INDEX.md                  # Bu dosya
│   ├── QUICK_START.md            # Hızlı başlangıç
│   ├── SETUP_GUIDE.md            # Kurulum rehberi
│   ├── README_TR.md              # Türkçe dokümantasyon
│   ├── SUMMARY.md                # Proje özeti
│   ├── FEATURES.md               # Özellikler rehberi
│   ├── API_INTEGRATION.md        # API entegrasyonu
│   ├── TROUBLESHOOTING.md        # Sorun giderme
│   └── PROJECT_STRUCTURE.md      # Proje yapısı
│
├── 📁 src/                       # Kaynak kod
│   ├── components/               # UI bileşenleri (5 dosya)
│   ├── screens/                  # Ekranlar (3 dosya)
│   ├── services/                 # Servisler (3 dosya)
│   ├── utils/                    # Yardımcı fonksiyonlar (3 dosya)
│   ├── styles/                   # Stil tanımları (2 dosya)
│   └── config/                   # Yapılandırma (1 dosya)
│
├── 📁 android/                   # Android native kodu
├── 📁 ios/                       # iOS native kodu
│
├── 🔧 Yapılandırma
│   ├── App.tsx                   # Ana uygulama
│   ├── index.js                  # Giriş noktası
│   ├── app.json                  # Uygulama yapılandırması
│   ├── package.json              # Bağımlılıklar
│   ├── tsconfig.json             # TypeScript yapılandırması
│   ├── babel.config.js           # Babel yapılandırması
│   ├── metro.config.js           # Metro yapılandırması
│   ├── jest.config.js            # Jest yapılandırması
│   └── .gitignore                # Git ignore kuralları
│
└── 🔐 Ortam
    ├── .env                      # Ortam değişkenleri
    └── .env.example              # Örnek ortam değişkenleri
```

## 🎯 Görevlere Göre Rehber

### "Uygulamayı hızlı başlatmak istiyorum"
→ [QUICK_START.md](QUICK_START.md)

### "Adım adım kurulum yapmak istiyorum"
→ [SETUP_GUIDE.md](SETUP_GUIDE.md)

### "Özellikleri öğrenmek istiyorum"
→ [FEATURES.md](FEATURES.md)

### "API entegrasyonunu anlamak istiyorum"
→ [API_INTEGRATION.md](API_INTEGRATION.md)

### "Proje yapısını öğrenmek istiyorum"
→ [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

### "Sorun gidermek istiyorum"
→ [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### "Genel bilgi almak istiyorum"
→ [README_TR.md](README_TR.md)

### "Proje özetini görmek istiyorum"
→ [SUMMARY.md](SUMMARY.md)

## 🚀 Hızlı Komutlar

```bash
# Kurulum
npm install

# Çalıştırma
npm start              # Metro Bundler
npm run android        # Uygulamayı çalıştır

# Temizleme
npm run clean          # npm cache temizle
npm run clean:android  # Android cache temizle

# Build
npm run build:android  # APK oluştur
```

## 📱 Özellikler Özeti

| Özellik | Durum | Rehber |
|---------|-------|--------|
| Speech-to-Text | ✅ | [FEATURES.md](FEATURES.md#-speech-to-text) |
| Standart TTS | ✅ | [FEATURES.md](FEATURES.md#standart-ses-native-tts) |
| ElevenLabs TTS | ✅ | [FEATURES.md](FEATURES.md#elevenlabs-tts-premium) |
| Ses Kütüphanesi | ✅ | [FEATURES.md](FEATURES.md#-ses-kütüphanesi) |
| Ayarlar | ✅ | [FEATURES.md](FEATURES.md#-ayarlar) |
| Karakter Takibi | ✅ | [FEATURES.md](FEATURES.md#-karakter-takibi) |
| Ses Hızı | ✅ | [FEATURES.md](FEATURES.md#-ses-hızı-kontrolü) |
| Geçmiş | ✅ | [FEATURES.md](FEATURES.md#-metin-alanı) |

## 🔧 Teknik Bilgi

### Teknoloji Stack
- React Native 0.82.0
- TypeScript 5.8.3
- React Navigation 6.1.9
- ElevenLabs API v1

### Dosya Sayıları
- TypeScript Dosyaları: 17
- Dokümantasyon Dosyaları: 8
- Yapılandırma Dosyaları: 8

### Kod Satırları (Tahmini)
- Toplam: ~2,370 satır
- Components: ~500 satır
- Screens: ~850 satır
- Services: ~450 satır

## 🎓 Öğrenme Yolu

### Başlangıç Seviyesi
1. [QUICK_START.md](QUICK_START.md) - Hızlı başla
2. [FEATURES.md](FEATURES.md) - Özellikleri öğren
3. [README_TR.md](README_TR.md) - Genel bilgi

### Orta Seviye
1. [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detaylı kurulum
2. [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Yapı
3. [API_INTEGRATION.md](API_INTEGRATION.md) - API

### İleri Seviye
1. Kaynak kodu oku (src/ klasörü)
2. Özelleştirmeler yap
3. Yeni özellikler ekle

## 🐛 Sorun Giderme Hızlı Erişim

| Sorun | Çözüm |
|-------|-------|
| Kurulum hatası | [SETUP_GUIDE.md](SETUP_GUIDE.md#adım-1-ön-gereksinimler) |
| Build hatası | [TROUBLESHOOTING.md](TROUBLESHOOTING.md#build-sorunları) |
| Runtime hatası | [TROUBLESHOOTING.md](TROUBLESHOOTING.md#runtime-sorunları) |
| Emülatör sorunu | [TROUBLESHOOTING.md](TROUBLESHOOTING.md#emülatör-sorunları) |
| Ses sorunu | [TROUBLESHOOTING.md](TROUBLESHOOTING.md#ses-sorunları) |
| API sorunu | [TROUBLESHOOTING.md](TROUBLESHOOTING.md#api-sorunları) |

## 📞 Yardım

### Sık Sorulan Sorular
- [README_TR.md](README_TR.md#sık-sorulan-sorular)
- [QUICK_START.md](QUICK_START.md#sık-sorulan-sorular)
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md#sık-sorulan-sorular)

### Kaynaklar
- [React Native Docs](https://reactnative.dev/)
- [ElevenLabs API Docs](https://elevenlabs.io/docs)
- [React Navigation Docs](https://reactnavigation.org/)

## ✅ Kontrol Listesi

Başlamadan önce kontrol et:

- [ ] Node.js v20+ yüklü
- [ ] Android Studio yüklü
- [ ] JDK 11+ yüklü
- [ ] ANDROID_HOME ayarlanmış
- [ ] ElevenLabs hesabı oluşturulmuş
- [ ] API Key alınmış

## 🎉 Başarıyla Başla!

1. [QUICK_START.md](QUICK_START.md) dosyasını oku
2. Kurulum adımlarını takip et
3. Uygulamayı çalıştır
4. Özellikleri test et
5. Özelleştirmeler yap

---

**Tüm dokümantasyon hazır! 📚**

Başlamak için [QUICK_START.md](QUICK_START.md) dosyasını oku.

