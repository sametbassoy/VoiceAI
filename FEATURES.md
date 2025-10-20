# ✨ Özellikler Rehberi

## 🎤 Speech-to-Text (Konuşmadan Metne)

### Açıklama
Cihazın mikrofonu kullanarak konuşmayı gerçek zamanlı olarak metne dönüştürür.

### Nasıl Kullanılır
1. Ana ekranda "🎤 Konuşmaya Başla" butonuna tıkla
2. Konuş
3. Metin otomatik olarak metin alanında görünür

### Desteklenen Diller
- 🇹🇷 Türkçe (tr-TR)
- 🇺🇸 İngilizce (en-US)

### Teknik Detaylar
- **Kütüphane**: @react-native-voice/voice
- **API**: Android Native Speech Recognition
- **Gerçek Zamanlı**: Evet
- **Offline**: Evet (Android 5.0+)

### Ayarlar
- Dil seçimi (Ayarlar → Dil Seçimi)
- Otomatik geçmiş kaydı

## 🔊 Text-to-Speech (Metinden Konuşmaya)

### Standart Ses (Native TTS)

**Açıklama**
Cihazın yerleşik TTS motorunu kullanarak metni sese dönüştürür.

**Avantajları**
- ✅ Ücretsiz
- ✅ Offline çalışır
- ✅ Hızlı
- ✅ İzin gerektirmez

**Dezavantajları**
- ❌ Kalite değişken
- ❌ Sınırlı ses seçeneği
- ❌ Cihaza bağlı

**Nasıl Kullanılır**
1. Metin gir
2. "Standart Ses" seçeneğini seç
3. "🔊 Metni Oku" butonuna tıkla

**Ayarlar**
- Ses Hızı: 0.5x - 2.0x
- Dil: Türkçe/İngilizce

### ElevenLabs TTS (Premium)

**Açıklama**
ElevenLabs API'sini kullanarak profesyonel kaliteli ses üretir.

**Avantajları**
- ✅ Yüksek kalite
- ✅ Doğal ses
- ✅ 50+ ses seçeneği
- ✅ Çok dilli destek
- ✅ Özelleştirilebilir

**Dezavantajları**
- ❌ İnternet gerekli
- ❌ API Key gerekli
- ❌ Aylık limit (10.000 karakter)
- ❌ Ücretli

**Nasıl Kullanılır**
1. Ayarlar → ElevenLabs API Key ekle
2. Ayarlar → Ses Kütüphanesi → Ses seç
3. Ana ekranda "ElevenLabs" seçeneğini seç
4. Metin gir
5. "🔊 Metni Oku" butonuna tıkla

**Ses Ayarları**
- **Stability** (0.0 - 1.0): Ses tutarlılığı
  - Düşük (0.3): Daha değişken, doğal
  - Yüksek (0.8): Daha tutarlı, profesyonel
  
- **Similarity Boost** (0.0 - 1.0): Orijinal sese benzerlik
  - Düşük (0.5): Daha farklı, yaratıcı
  - Yüksek (0.9): Daha benzer, doğru

## 🎭 Ses Kütüphanesi

### Açıklama
ElevenLabs'ın tüm mevcut seslerini görüntüle, ara ve seç.

### Özellikler
- 📋 50+ profesyonel ses
- 🔍 Ses arama
- ▶️ Ses önizleme
- ✓ Ses seçimi
- 🏷️ Ses etiketleri (cinsiyet, yaş, aksent)

### Nasıl Kullanılır
1. Ana ekranda "⚙️ Ayarlar" butonuna tıkla
2. "Ses Kütüphanesi" butonuna tıkla
3. Ses ara veya listeden seç
4. "▶️" butonuna tıkla (önizleme)
5. "✓" butonuna tıkla (seç)

### Ses Kategorileri
- **Erkek Sesler**: Adam, James, vb.
- **Kadın Sesler**: Ayşe, Bella, vb.
- **Çocuk Sesler**: Çeşitli
- **Özel Sesler**: Dramatik, Profesyonel, vb.

### Ses Etiketleri
- **Cinsiyet**: Male, Female
- **Yaş**: Young, Middle-aged, Old
- **Aksent**: Turkish, American, British, vb.
- **Stil**: Formal, Casual, Dramatic, vb.

## ⚙️ Ayarlar

### API Yapılandırması

**ElevenLabs API Key**
- API Key'i gir ve kaydet
- Maskelenmiş gösterim (güvenlik)
- Kalan karakter gösterimi

**Nasıl Yapılır**
1. Ayarlar ekranını aç
2. "ElevenLabs API Anahtarı" alanına yapıştır
3. "💾 Kaydet" butonuna tıkla

### Dil Seçimi

**Desteklenen Diller**
- 🇹🇷 Türkçe (tr-TR)
- 🇺🇸 İngilizce (en-US)

**Etkilenen Alanlar**
- Speech-to-Text dili
- Arayüz dili (gelecek sürüm)
- TTS dili

### Tema Seçimi

**Tema Seçenekleri**
- ☀️ Açık Tema (Light)
- 🌙 Koyu Tema (Dark) - Gelecek sürüm

### Veri Yönetimi

**Geçmiş Temizle**
- Son 50 konuşma kaydını sil
- Geri alınamaz

**Tüm Verileri Temizle**
- Tüm ayarları sıfırla
- Geçmişi sil
- API Key'i sil
- Geri alınamaz

## 📊 Karakter Takibi

### Açıklama
ElevenLabs API'sinin aylık karakter limitini takip et.

### Bilgiler
- **Aylık Limit**: 10,000 karakter (ücretsiz)
- **Kullanılan**: Şu ana kadar kullanılan karakter
- **Kalan**: Kalan karakter sayısı
- **Sıfırlama**: Ayın ilk günü

### Nerede Gösterilir
- Ayarlar ekranında
- Ana ekranda (gelecek sürüm)

### Limit Aşıldığında
- Hata mesajı gösterilir
- ElevenLabs kullanılamaz
- Standart TTS kullanılabilir

## 🎚️ Ses Hızı Kontrolü

### Açıklama
Metin okunurken ses hızını ayarla.

### Aralık
- **Minimum**: 0.5x (çok yavaş)
- **Maksimum**: 2.0x (çok hızlı)
- **Varsayılan**: 1.0x (normal)

### Nasıl Kullanılır
1. Ana ekranda "Ses Hızı" slider'ını bul
2. Sola kaydır (yavaşla) veya sağa kaydır (hızlan)
3. Değer gerçek zamanlı güncellenir

### Etkilenen Alanlar
- Standart TTS
- ElevenLabs TTS (gelecek sürüm)

## 📝 Metin Alanı

### Özellikler
- ✏️ Manuel metin giriş
- 🎤 Speech-to-Text entegrasyonu
- 📊 Karakter sayacı
- 🗑️ Temizle butonu
- ⚠️ Limit uyarısı

### Karakter Limiti
- **Maksimum**: 1,000 karakter (görüntüleme)
- **ElevenLabs Limiti**: 10,000 karakter/ay

### Uyarılar
- %80 limit aşıldığında sarı uyarı
- Limit aşıldığında kırmızı uyarı

## 🔐 İzin Yönetimi

### Gerekli İzinler
1. **Mikrofon** (RECORD_AUDIO)
   - Speech-to-Text için
   - İlk kullanımda istenir

2. **Depolama** (WRITE_EXTERNAL_STORAGE)
   - Ses dosyaları için
   - İlk kullanımda istenir

3. **İnternet** (INTERNET)
   - ElevenLabs API için
   - Otomatik

### İzin Verme
1. Uygulama ilk açıldığında istenir
2. "Tamam" butonuna tıkla
3. Veya Ayarlar → Uygulamalar → VoiceAssistant → İzinler

## 💾 Veri Depolama

### Depolanan Veriler
- API Key (şifreli değil - gelecek sürüm)
- Seçili ses
- Dil tercihi
- Tema tercihi
- Konuşma geçmişi (son 50)

### Depolama Yeri
- **Android**: /data/data/com.voiceassistant/
- **Yerel**: AsyncStorage

### Gizlilik
- Veriler cihazda saklanır
- Sunucuya gönderilmez
- Sadece API çağrıları sunucuya gider

## 🚀 Gelecek Özellikler

### Planlanan
- [ ] Dark Mode
- [ ] Ses Klonlama
- [ ] Ses Kaydı
- [ ] Ses Dosyası İthalatı
- [ ] Ses Dosyası Dışa Aktarma
- [ ] Çoklu Dil Arayüzü
- [ ] Ses Geçmişi Görüntüleme
- [ ] Favori Metinler
- [ ] Ses Ayarları Profilleri
- [ ] Offline Mod
- [ ] Senkronizasyon (Cloud)

## 🎯 Kullanım İpuçları

### İpucu 1: Hızlı Metin Oluşturma
Konuşmak yerine yazı yazmanız daha hızlı olabilir.

### İpucu 2: Ses Seçimi
Farklı sesler deneyin, en beğendiğinizi seçin.

### İpucu 3: Hız Ayarı
Hızlı konuşma için 1.5x, yavaş konuşma için 0.7x kullanın.

### İpucu 4: Karakter Limiti
Uzun metinleri parçalara bölerek kullanın.

### İpucu 5: Offline Kullanım
İnternet olmadığında Standart TTS kullanın.

---

**Tüm özellikleri keşfet ve sesli asistanı tam potansiyeliyle kullan! 🎉**

