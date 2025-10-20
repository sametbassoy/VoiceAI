# 🔌 ElevenLabs API Entegrasyon Dökümanı

## Genel Bilgi

ElevenLabs API, profesyonel kaliteli metin-konuşma (TTS) hizmeti sağlar. Bu dokümanda API entegrasyonunun detayları açıklanmıştır.

## API Endpoints

### 1. Text-to-Speech (Metin → Ses)

**Endpoint:**
```
POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
```

**Headers:**
```
xi-api-key: YOUR_API_KEY
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "Okunacak metin",
  "model_id": "eleven_multilingual_v2",
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.75,
    "style": 0,
    "use_speaker_boost": true
  }
}
```

**Response:**
- Status: 200 OK
- Content-Type: audio/mpeg
- Body: MP3 audio stream

**Hata Yanıtları:**
```json
{
  "detail": "Error message"
}
```

**Hata Kodları:**
- `400`: Geçersiz istek
- `401`: Geçersiz API Key
- `403`: Yetkisiz erişim
- `429`: Çok fazla istek (rate limit)
- `500`: Sunucu hatası

### 2. Ses Listesi (Voices)

**Endpoint:**
```
GET https://api.elevenlabs.io/v1/voices
```

**Headers:**
```
xi-api-key: YOUR_API_KEY
```

**Response:**
```json
{
  "voices": [
    {
      "voice_id": "21m00Tcm4TlvDq8ikWAM",
      "name": "Adam",
      "category": "premade",
      "labels": {
        "accent": "Turkish",
        "age": "young",
        "gender": "male"
      },
      "description": "Genç erkek sesi",
      "preview_url": "https://..."
    }
  ]
}
```

### 3. Kullanıcı Bilgisi

**Endpoint:**
```
GET https://api.elevenlabs.io/v1/user
```

**Headers:**
```
xi-api-key: YOUR_API_KEY
```

**Response:**
```json
{
  "subscription": {
    "tier": "free",
    "character_count": 1500,
    "character_limit": 10000,
    "can_extend_character_limit": true,
    "allowed_to_extend_character_limit": true,
    "next_character_count_reset_unix": 1234567890
  }
}
```

## Ses Ayarları (Voice Settings)

### Stability (Kararlılık)
- **Aralık**: 0.0 - 1.0
- **Varsayılan**: 0.5
- **Açıklama**: Daha yüksek değer daha tutarlı ses üretir
- **Kullanım**: Profesyonel uygulamalar için 0.7+

### Similarity Boost (Benzerlik Artırma)
- **Aralık**: 0.0 - 1.0
- **Varsayılan**: 0.75
- **Açıklama**: Sesin orijinal karakteristiğine ne kadar yakın olacağı
- **Kullanım**: Doğal ses için 0.75+

### Style (Stil)
- **Aralık**: 0.0 - 1.0
- **Varsayılan**: 0
- **Açıklama**: Konuşma stilinin dramatikliği
- **Kullanım**: Normal konuşma için 0

### Use Speaker Boost (Hoparlör Artırma)
- **Tür**: Boolean
- **Varsayılan**: true
- **Açıklama**: Ses kalitesini artırır
- **Kullanım**: Çoğu durumda true

## Model Seçenekleri

### Mevcut Modeller

1. **eleven_multilingual_v2** (Önerilen)
   - Çok dilli destek
   - En iyi kalite
   - Daha hızlı işleme
   - Önerilen model

2. **eleven_monolingual_v1**
   - Tek dil (İngilizce)
   - Eski model
   - Daha düşük kalite

## Karakter Limitleri

### Ücretsiz Plan
- **Aylık Limit**: 10,000 karakter
- **Ses Sayısı**: Sınırsız
- **Kalite**: Standart

### Paid Plans
- **Starter**: 50,000 karakter/ay
- **Professional**: 500,000 karakter/ay
- **Scale**: Özel fiyatlandırma

## Uygulama Kodunda Kullanım

### ElevenLabsService Sınıfı

```typescript
import elevenlabsService from '../services/elevenlabsService';

// Metin okutma
const audioBuffer = await elevenlabsService.textToSpeech(
  'Merhaba dünya',
  'voice_id_here',
  {
    stability: 0.5,
    similarity_boost: 0.75
  }
);

// Ses listesi
const voices = await elevenlabsService.getVoices();

// Kullanıcı bilgisi
const userInfo = await elevenlabsService.getUserInfo();

// Kalan karakter
const remaining = await elevenlabsService.getRemainingCharacters();
```

### Hata Yönetimi

```typescript
try {
  const audioBuffer = await elevenlabsService.textToSpeech(
    text,
    voiceId
  );
} catch (error) {
  if (error.message.includes('API anahtarı')) {
    // API Key hatası
  } else if (error.message.includes('İnternet')) {
    // Bağlantı hatası
  } else if (error.message.includes('limit')) {
    // Karakter limiti hatası
  }
}
```

## Performans Optimizasyonu

### 1. Caching
```typescript
// Ses listesini cache'le
const cachedVoices = await storageService.getJSON('voices');
if (!cachedVoices) {
  const voices = await elevenlabsService.getVoices();
  await storageService.setJSON('voices', voices);
}
```

### 2. Debouncing
```typescript
// API çağrılarını debounce et
const debouncedTTS = debounce(
  (text) => elevenlabsService.textToSpeech(text, voiceId),
  500
);
```

### 3. Batch Processing
```typescript
// Birden fazla metni toplu işle
const texts = ['Merhaba', 'Dünya'];
const audioBuffers = await Promise.all(
  texts.map(text => 
    elevenlabsService.textToSpeech(text, voiceId)
  )
);
```

## Güvenlik

### API Key Yönetimi
1. `.env` dosyasında sakla
2. Asla hardcode etme
3. Git'e commit etme
4. `.gitignore`'a ekle

### Rate Limiting
- Saniyede maksimum 10 istek
- Dakikada maksimum 600 istek
- Aylık karakter limiti

### Hata Yönetimi
```typescript
// 429 (Too Many Requests) hatası
if (error.response?.status === 429) {
  // Retry logic ile tekrar dene
  await new Promise(resolve => setTimeout(resolve, 5000));
  // Tekrar dene
}
```

## Ses Seçimi

### Popüler Sesler

| Voice ID | Name | Language | Gender |
|----------|------|----------|--------|
| 21m00Tcm4TlvDq8ikWAM | Adam | Turkish | Male |
| EXAVITQu4vr4xnSDxMaL | Ayşe | Turkish | Female |
| TxGEqnHWrfWFTfGW9XjX | James | English | Male |
| pNInz6obpgDQGcFmaJgB | Bella | English | Female |

### Ses Seçme Kodu
```typescript
// Ses listesini getir
const voices = await elevenlabsService.getVoices();

// Türkçe sesler filtrele
const turkishVoices = voices.filter(
  v => v.labels?.accent === 'Turkish'
);

// Erkek sesler filtrele
const maleVoices = turkishVoices.filter(
  v => v.labels?.gender === 'male'
);
```

## Test Senaryoları

### 1. Basit TTS
```typescript
const audioBuffer = await elevenlabsService.textToSpeech(
  'Merhaba',
  'voice_id'
);
```

### 2. Uzun Metin
```typescript
const longText = 'Lorem ipsum dolor sit amet...'; // 1000+ karakter
const audioBuffer = await elevenlabsService.textToSpeech(
  longText,
  'voice_id'
);
```

### 3. Özel Ayarlar
```typescript
const audioBuffer = await elevenlabsService.textToSpeech(
  'Merhaba',
  'voice_id',
  {
    stability: 0.8,
    similarity_boost: 0.9,
    style: 0.5
  }
);
```

### 4. Hata Durumları
```typescript
// Geçersiz API Key
elevenlabsService.setApiKey('invalid_key');
// 401 hatası beklenir

// Geçersiz Voice ID
await elevenlabsService.textToSpeech('Merhaba', 'invalid_id');
// 400 hatası beklenir

// Boş metin
await elevenlabsService.textToSpeech('', 'voice_id');
// Hata beklenir
```

## Sorun Giderme

### "401 Unauthorized"
- API Key'i kontrol et
- API Key'in geçerli olduğundan emin ol
- API Key'i yenile

### "429 Too Many Requests"
- İstek sayısını azalt
- Retry logic ekle
- Rate limiting'i kontrol et

### "400 Bad Request"
- Metin boş değilse kontrol et
- Voice ID'nin geçerli olduğundan emin ol
- Request body'yi kontrol et

### "500 Internal Server Error"
- Daha sonra tekrar dene
- ElevenLabs status sayfasını kontrol et

## Kaynaklar

- [ElevenLabs API Docs](https://elevenlabs.io/docs)
- [API Reference](https://elevenlabs.io/docs/api-reference)
- [Pricing](https://elevenlabs.io/pricing)
- [Status Page](https://status.elevenlabs.io/)

---

**Son Güncelleme**: 2024
**API Versiyonu**: v1

