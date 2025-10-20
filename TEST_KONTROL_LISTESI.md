# Test Kontrol Listesi

## 🔧 Ön Hazırlık

### 1. Ortam Ayarları
- [ ] `.env` dosyasında `ELEVENLABS_API_KEY` ayarlandı mı?
- [ ] API anahtarı `sk_` ile başlıyor mu?
- [ ] API anahtarı geçerli mi? (ElevenLabs dashboard'dan kontrol et)

### 2. Uygulamayı Başlat
```bash
# Metro bundler'ı temizle
npm start -- --reset-cache

# Veya
yarn start --reset-cache
```

### 3. Console Loglarını Kontrol Et
Uygulamayı açtığında şu logları görmelisin:
```
✅ Voice listeners başarıyla ayarlandı
✅ .env dosyasından API anahtarı yüklendi
```

---

## 🎤 Test 1: Speech-to-Text (Konuşmaya Başla)

### Adımlar:
1. Ana ekrana git
2. "🎤 Konuşmaya Başla" butonuna tıkla
3. Mikrofon izni iste (ilk kez)
4. İzin ver
5. Konuş (örn: "Merhaba")
6. Konuşmayı bitir

### Beklenen Sonuç:
- [ ] Buton "🎙️ Dinleniyor..." olarak değişti
- [ ] Konuşma tanındı
- [ ] Metin input alanına yazıldı
- [ ] Hata mesajı yok

### Hata Durumunda:
```
❌ Dinleme başlatma hatası
❌ Voice modülü hazır değil
```
**Çözüm:** Uygulamayı yeniden başlat, mikrofon izni kontrol et

---

## 🔊 Test 2: Native TTS (Yerleşik Metin Oku)

### Adımlar:
1. Ana ekrana git
2. Metin input alanına "Merhaba dünya" yaz
3. Ses türü "Native" olduğundan emin ol
4. "▶️ Oynat" butonuna tıkla

### Beklenen Sonuç:
- [ ] Loading göstergesi görüldü
- [ ] Cihaz hoparlöründen Türkçe ses çıktı
- [ ] Metin geçmişe eklendi
- [ ] Hata mesajı yok

### Hata Durumunda:
```
❌ Metin okutulamadı
❌ TTS hatası
```
**Çözüm:** Cihazın sesini aç, TTS ayarlarını kontrol et

---

## 🎵 Test 3: ElevenLabs TTS

### Adımlar:
1. Ana ekrana git
2. "🎧 Ses Kütüphanesi" butonuna tıkla
3. Ses listesi yüklenmesini bekle
4. Bir ses seç (örn: "Aria")
5. Ana ekrana dön
6. Metin input alanına "Merhaba ElevenLabs" yaz
7. Ses türü "ElevenLabs" olduğundan emin ol
8. "▶️ Oynat" butonuna tıkla

### Beklenen Sonuç:
- [ ] Ses listesi yüklendi (100+ ses)
- [ ] Ses seçildi
- [ ] Loading göstergesi görüldü
- [ ] ElevenLabs sesi çıktı
- [ ] Metin geçmişe eklendi
- [ ] Hata mesajı yok

### Console Logları:
```
✅ 100 ses yüklendi
🔊 ElevenLabs API çağrısı yapılıyor
✅ ElevenLabs API başarılı
```

### Hata Durumunda:
```
❌ API anahtarı geçersiz veya yetkisiz erişim
❌ Ses listesi yüklenemedi
```
**Çözüm:** API anahtarını kontrol et, `.env` dosyasını güncelle

---

## ⚙️ Test 4: Ayarlar

### Adımlar:
1. "⚙️ Ayarlar" ekranına git
2. Dil seç (Türkçe/İngilizce)
3. Konuşma hızını ayarla
4. API anahtarını gir (opsiyonel)
5. Kaydet

### Beklenen Sonuç:
- [ ] Ayarlar kaydedildi
- [ ] Dil değişti
- [ ] Konuşma hızı değişti
- [ ] Hata mesajı yok

---

## 🔴 Test 5: Hata Yönetimi

### Test 5.1: Geçersiz API Anahtarı
1. `.env` dosyasında API anahtarını yanlış yap
2. Uygulamayı yeniden başlat
3. Ses Kütüphanesi'ne git

**Beklenen Sonuç:**
```
❌ API anahtarı geçersiz veya yetkisiz erişim
```

### Test 5.2: Boş Metin
1. Metin input alanını boş bırak
2. "▶️ Oynat" butonuna tıkla

**Beklenen Sonuç:**
```
❌ Lütfen metin girin
```

### Test 5.3: Ses Seçilmemiş
1. Ses türü "ElevenLabs" olarak ayarla
2. Ses seçme (Ses Kütüphanesi'ne gitme)
3. Metin gir
4. "▶️ Oynat" butonuna tıkla

**Beklenen Sonuç:**
```
❌ Ses seçilmemiş. Lütfen ses kütüphanesinden seçin.
```

---

## 📊 Test Sonuçları

| Test | Durum | Notlar |
|------|-------|--------|
| Speech-to-Text | ✅/❌ | |
| Native TTS | ✅/❌ | |
| ElevenLabs TTS | ✅/❌ | |
| Ayarlar | ✅/❌ | |
| Hata Yönetimi | ✅/❌ | |

---

## 🐛 Sorun Giderme

### Sorun: "API anahtarı geçersiz"
**Çözüm:**
1. `.env` dosyasını aç
2. API anahtarının `sk_` ile başladığını kontrol et
3. API anahtarının boşluk içermediğini kontrol et
4. Uygulamayı yeniden başlat

### Sorun: "Ses listesi yüklenemedi"
**Çözüm:**
1. İnternet bağlantısını kontrol et
2. API anahtarını kontrol et
3. ElevenLabs sunucusunun çalışıp çalışmadığını kontrol et
4. Uygulamayı yeniden başlat

### Sorun: "Konuşmaya başla" çalışmıyor
**Çözüm:**
1. Mikrofon izni verildiğini kontrol et
2. Cihazın mikrofonu çalışıp çalışmadığını kontrol et
3. Uygulamayı yeniden başlat

---

## ✅ Tüm Testler Başarılı!

Eğer tüm testler başarılı olduysa, uygulamayı kullanmaya başlayabilirsin! 🎉

