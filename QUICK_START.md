# ⚡ Hızlı Başlangıç Rehberi

## 5 Dakikada Başla

### 1️⃣ Projeyi Hazırla (1 dakika)

```bash
cd VoiceAssistant
npm install
```

### 2️⃣ API Key Al (2 dakika)

1. https://elevenlabs.io adresine git
2. Hesap oluştur
3. Profile → API Keys → Create New Key
4. API Key'i kopyala

### 3️⃣ .env Dosyasını Yapılandır (1 dakika)

```bash
# .env dosyasını aç
# Aşağıdaki satırları düzenle:
ELEVENLABS_API_KEY=sk_your_api_key_here
ELEVENLABS_BASE_URL=https://api.elevenlabs.io/v1
```

### 4️⃣ Uygulamayı Çalıştır (1 dakika)

```bash
# Terminal 1: Metro Bundler
npm start

# Terminal 2: Uygulamayı çalıştır
npm run android
```

## İlk Kullanım

### Adım 1: Mikrofon İzni
- Uygulama açıldığında izin isteyecek
- "Tamam" butonuna tıkla

### Adım 2: API Key Ekle
1. "⚙️ Ayarlar" butonuna tıkla
2. API Key'i yapıştır
3. "💾 Kaydet" butonuna tıkla

### Adım 3: Ses Seç
1. Ayarlar'da "Ses Kütüphanesi" butonuna tıkla
2. Bir ses seç
3. "✓ Seç" butonuna tıkla

### Adım 4: Test Et
1. Ana ekrana dön
2. "Merhaba" yaz
3. "ElevenLabs" seçeneğini seç
4. "🔊 Metni Oku" butonuna tıkla
5. Ses oynatılacak ✅

## Temel Komutlar

```bash
# Uygulamayı çalıştır
npm run android

# Metro Bundler'ı başlat
npm start

# Cache temizle
npm run clean

# Android cache temizle
npm run clean:android

# Build et
npm run build:android
```

## Sorun Giderme (Hızlı)

| Sorun | Çözüm |
|-------|-------|
| Uygulamada beyaz ekran | `npm start` ve `npm run android` çalıştır |
| Kırmızı hata ekranı | Hata mesajını oku, kodu düzelt, Ctrl+M ile reload et |
| Emülatör başlamıyor | Android Studio → Device Manager → Play |
| API Key hatası | `.env` dosyasını kontrol et, uygulamayı yeniden başlat |
| Mikrofon çalışmıyor | Ayarlar → İzinler → Mikrofon → İzin Ver |

## Özellik Testi

### Speech-to-Text
```
1. "🎤 Konuşmaya Başla" butonuna tıkla
2. "Merhaba dünya" söyle
3. Metin görünmeli ✅
```

### Standart TTS
```
1. Metin gir
2. "Standart Ses" seçeneğini seç
3. "🔊 Metni Oku" butonuna tıkla
4. Ses duyulmalı ✅
```

### ElevenLabs TTS
```
1. Metin gir
2. "ElevenLabs" seçeneğini seç
3. "🔊 Metni Oku" butonuna tıkla
4. Profesyonel ses duyulmalı ✅
```

## Dosya Yapısı (Önemli)

```
VoiceAssistant/
├── src/
│   ├── components/      # UI bileşenleri
│   ├── screens/         # Ekranlar
│   ├── services/        # API ve depolama
│   ├── utils/           # Yardımcı fonksiyonlar
│   ├── styles/          # Renkler ve fontlar
│   └── config/          # Yapılandırma
├── .env                 # API Key (GİT'E EKLEME!)
├── App.tsx              # Ana uygulama
└── package.json         # Bağımlılıklar
```

## Geliştirme İpuçları

### 1. Hot Reload
- Kodu değiştir
- Ctrl+M (Cmd+M) ile debug menüsünü aç
- "Reload" seçeneğini seç
- Otomatik reload olur

### 2. Debugging
```bash
# Console logları görmek için
adb logcat

# Veya Android Studio Logcat tab'ında
```

### 3. Emülatör Hızlandırma
```bash
# Hardware acceleration'ı etkinleştir
emulator -avd Pixel_4_API_33 -accel on
```

## Sonraki Adımlar

1. **Özelleştir**
   - Renkleri değiştir (src/styles/theme.ts)
   - Yazı tiplerini değiştir
   - Logo ekle

2. **Geliştir**
   - Yeni özellikler ekle
   - Hata düzelt
   - Performance optimize et

3. **Deploy**
   - APK oluştur
   - Google Play'e yükle
   - Kullanıcılara dağıt

## Kaynaklar

- 📖 [README_TR.md](README_TR.md) - Detaylı dokümantasyon
- 🔧 [SETUP_GUIDE.md](SETUP_GUIDE.md) - Kurulum rehberi
- 🐛 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Sorun giderme
- ✨ [FEATURES.md](FEATURES.md) - Özellikler rehberi
- 🔌 [API_INTEGRATION.md](API_INTEGRATION.md) - API detayları
- 📁 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Proje yapısı

## Sık Sorulan Sorular

**S: API Key'i nereden alabilirim?**
C: https://elevenlabs.io adresinden

**S: Ücretsiz mi?**
C: Evet, aylık 10.000 karakter ücretsiz

**S: Offline çalışabilir mi?**
C: Standart TTS offline çalışır, ElevenLabs internet gerektirir

**S: Başka dil ekleyebilir miyim?**
C: Evet, src/utils/constants.ts dosyasında

**S: Tema değiştirebilir miyim?**
C: Evet, src/styles/theme.ts dosyasında

## Başarı Kontrol Listesi

- [ ] Proje klonlandı
- [ ] npm install çalıştırıldı
- [ ] .env dosyası yapılandırıldı
- [ ] Emülatör başlatıldı
- [ ] Uygulama çalıştırıldı
- [ ] Mikrofon izni verildi
- [ ] API Key eklendi
- [ ] Ses seçildi
- [ ] Speech-to-Text test edildi
- [ ] Standart TTS test edildi
- [ ] ElevenLabs TTS test edildi

Tüm kontrol listesi tamamlandı mı? 🎉

## Yardım

Sorunlar için:
1. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) dosyasını oku
2. GitHub Issues'i kontrol et
3. Stack Overflow'da ara

---

**Başarıyla başladın! 🚀**

Şimdi [README_TR.md](README_TR.md) dosyasını oku ve daha fazla öğren.

