# Hata Çözüm Rehberi

## Yapılan Düzeltmeler

### 1. **Speech-to-Text Hatası: "Cannot read property 'startSpeech' of null"**

**Sorun:** Voice modülü düzgün başlatılmıyor ve null referans hatası oluşuyor.

**Çözüm:**
- ✅ `SpeechToTextButton.tsx` güncellendi
- Voice modülü varlığı her adımda kontrol ediliyor
- `Voice.destroy()` çağrısında null check eklendi
- `startListening()` ve `stopListening()` fonksiyonlarında güvenlik kontrolleri eklendi
- Dependency array düzeltildi

**Dosya:** `src/components/SpeechToTextButton.tsx`

---

### 2. **ElevenLabs API Hatası: "API anahtarı geçersiz"**

**Sorun:** API anahtarı geçersiz olarak gösteriliyor veya ayarlanmıyor.

**Çözüm:**
- ✅ `api.config.ts` güncellendi - API key validation eklendi
- ✅ `elevenlabsService.ts` güncellendi - API key format kontrolü eklendi
- ✅ `HomeScreen.tsx` güncellendi - API key yükleme mantığı iyileştirildi
- ✅ `VoiceLibraryScreen.tsx` güncellendi - API key validation eklendi

**Dosyalar:**
- `src/config/api.config.ts`
- `src/services/elevenlabsService.ts`
- `src/screens/HomeScreen.tsx`
- `src/screens/VoiceLibraryScreen.tsx`

---

## Gerekli Adımlar

### 1. `.env` Dosyasını Kontrol Edin

```bash
# .env dosyasının içeriği şu şekilde olmalı:
ELEVENLABS_API_KEY=sk_60876f703dcb5a5bc74c7069e88117a1cccf10adc270d3f1
ELEVENLABS_BASE_URL=https://api.elevenlabs.io/v1
```

**Önemli:** API anahtarı `sk_` ile başlamalıdır!

### 2. Geçerli API Anahtarı Alın

1. https://elevenlabs.io adresine gidin
2. Hesap oluşturun veya giriş yapın
3. Dashboard'dan API anahtarını kopyalayın
4. `.env` dosyasında `ELEVENLABS_API_KEY` değerini güncelleyin

### 3. Uygulamayı Yeniden Başlatın

```bash
# Metro bundler'ı temizle
npm start -- --reset-cache

# Veya
yarn start --reset-cache
```

### 4. Ayarlar Ekranından API Anahtarını Ekleyin (Opsiyonel)

Eğer `.env` dosyasında ayarlamak istemezseniz, uygulamada:
1. Settings ekranına gidin
2. API anahtarını girin
3. Kaydedin

---

## Hata Mesajları ve Çözümleri

### "API anahtarı geçersiz veya yetkisiz erişim"
- ✅ API anahtarının `sk_` ile başladığını kontrol edin
- ✅ API anahtarının doğru olduğunu ElevenLabs dashboard'dan kontrol edin
- ✅ `.env` dosyasını güncelledikten sonra uygulamayı yeniden başlatın

### "Ses listesi yüklenemedi"
- ✅ İnternet bağlantısını kontrol edin
- ✅ API anahtarının geçerli olduğunu kontrol edin
- ✅ ElevenLabs sunucusunun çalışıp çalışmadığını kontrol edin

### "Konuşmaya başla" butonunda hata
- ✅ Mikrofon izni verildiğini kontrol edin
- ✅ Cihazın mikrofonu çalışıp çalışmadığını kontrol edin
- ✅ Voice modülünün yüklü olduğunu kontrol edin

---

## Debugging İçin Console Logları

Uygulamayı çalıştırırken console'da şu logları görmelisiniz:

```
✅ Voice listeners başarıyla ayarlandı
✅ .env dosyasından API anahtarı yüklendi
✅ VoiceLibrary: .env API anahtarı ayarlandı
✅ 100 ses yüklendi
🔊 ElevenLabs API çağrısı yapılıyor
✅ ElevenLabs API başarılı
```

Eğer hata logları görürseniz:
```
❌ API anahtarı geçersiz
❌ Dinleme başlatma hatası
❌ Ses listesi yükleme hatası
```

Bu durumda yukarıdaki çözümleri deneyin.

---

## Hızlı Kontrol Listesi

- [ ] `.env` dosyasında `ELEVENLABS_API_KEY` ayarlandı mı?
- [ ] API anahtarı `sk_` ile başlıyor mu?
- [ ] Uygulamayı yeniden başlattınız mı?
- [ ] Metro bundler'ı temizledikten sonra başlattınız mı?
- [ ] Mikrofon izni verildi mi?
- [ ] İnternet bağlantısı var mı?

---

## Daha Fazla Yardım

Hala sorun yaşıyorsanız:
1. Console loglarını kontrol edin
2. `.env` dosyasını tekrar kontrol edin
3. ElevenLabs API anahtarının geçerli olduğunu doğrulayın
4. Uygulamayı tamamen kapatıp yeniden açın

