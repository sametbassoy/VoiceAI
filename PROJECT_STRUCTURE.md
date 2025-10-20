# 📁 Proje Yapısı

## Genel Yapı

```
VoiceAssistant/
├── src/                          # Kaynak kod
│   ├── components/               # React bileşenleri
│   ├── screens/                  # Ekran bileşenleri
│   ├── services/                 # İş mantığı servisleri
│   ├── utils/                    # Yardımcı fonksiyonlar
│   ├── styles/                   # Stil tanımları
│   └── config/                   # Yapılandırma dosyaları
├── android/                      # Android native kodu
├── ios/                          # iOS native kodu
├── App.tsx                       # Ana uygulama bileşeni
├── index.js                      # Giriş noktası
├── app.json                      # Uygulama yapılandırması
├── package.json                  # Bağımlılıklar
├── tsconfig.json                 # TypeScript yapılandırması
├── babel.config.js               # Babel yapılandırması
├── .env                          # Ortam değişkenleri
├── .env.example                  # Örnek ortam değişkenleri
├── .gitignore                    # Git ignore kuralları
└── README_TR.md                  # Türkçe dokümantasyon
```

## Detaylı Yapı

### src/components/

Yeniden kullanılabilir React bileşenleri.

```
components/
├── LoadingIndicator.tsx          # Yükleme göstergesi
├── SpeechToTextButton.tsx        # Konuşma tanıma butonu
├── TextInputArea.tsx             # Metin giriş alanı
├── VoiceSelector.tsx             # Ses seçim bileşeni
└── PlayButton.tsx                # Oynatma butonu
```

**LoadingIndicator.tsx**
- Yükleme sırasında gösterilen modal
- Özelleştirilebilir mesaj
- Spinner animasyonu

**SpeechToTextButton.tsx**
- Konuşma tanıma başlat/durdur
- Gerçek zamanlı metin gösterimi
- Hata yönetimi
- İzin kontrolü

**TextInputArea.tsx**
- Metin giriş alanı
- Karakter sayacı
- Temizle butonu
- Limit uyarısı

**VoiceSelector.tsx**
- Standart vs ElevenLabs seçimi
- Radio button UI
- Açıklama metinleri

**PlayButton.tsx**
- Metni oku butonu
- Loading durumu
- Disabled durumu

### src/screens/

Tam ekran bileşenleri (sayfalar).

```
screens/
├── HomeScreen.tsx                # Ana ekran
├── SettingsScreen.tsx            # Ayarlar ekranı
└── VoiceLibraryScreen.tsx        # Ses kütüphanesi ekranı
```

**HomeScreen.tsx**
- Speech-to-Text bileşeni
- Metin giriş alanı
- Ses seçimi
- Ses hızı kontrolü
- Oynatma butonu
- Ayarlar bağlantısı

**SettingsScreen.tsx**
- API Key yönetimi
- Dil seçimi
- Tema seçimi
- Karakter takibi
- Veri yönetimi (temizle, sıfırla)

**VoiceLibraryScreen.tsx**
- Ses listesi
- Ses arama
- Ses önizleme
- Ses seçimi
- Etiket gösterimi

### src/services/

İş mantığı ve API entegrasyonu.

```
services/
├── elevenlabsService.ts          # ElevenLabs API
├── audioService.ts               # Ses oynatma
└── storageService.ts             # Yerel depolama
```

**elevenlabsService.ts**
- Text-to-Speech API çağrısı
- Ses listesi getirme
- Kullanıcı bilgisi
- Hata yönetimi
- API Key yönetimi

**audioService.ts**
- Ses dosyası oynatma
- Buffer'dan oynatma
- Oynatma durumu takibi
- Ses durdurma
- Kaynak temizleme

**storageService.ts**
- AsyncStorage wrapper
- API Key depolama
- Ses seçimi depolama
- Dil depolama
- Tema depolama
- Geçmiş yönetimi

### src/utils/

Yardımcı fonksiyonlar ve sabitler.

```
utils/
├── constants.ts                  # Sabitler
├── helpers.ts                    # Yardımcı fonksiyonlar
└── permissions.ts                # İzin yönetimi
```

**constants.ts**
- Dil tanımları
- Ses türleri
- Depolama anahtarları
- Hata mesajları
- Başarı mesajları

**helpers.ts**
- Alert gösterme
- Metin biçimlendirme
- API Key maskeleme
- Debounce
- Hata mesajı getirme

**permissions.ts**
- Mikrofon izni isteme
- Depolama izni isteme
- Tüm izinleri isteme

### src/styles/

Stil tanımları ve tema.

```
styles/
├── theme.ts                      # Renk, font, spacing
└── globalStyles.ts               # Global stil tanımları
```

**theme.ts**
- Renk paletesi
- Font tanımları
- Spacing değerleri
- Border radius
- Shadow tanımları
- Light/Dark tema

**globalStyles.ts**
- Container stilleri
- Text stilleri
- Button stilleri
- Input stilleri
- Card stilleri
- Flex stilleri

### src/config/

Yapılandırma dosyaları.

```
config/
└── api.config.ts                 # API yapılandırması
```

**api.config.ts**
- ElevenLabs API URL
- API Key
- Headers
- Timeout
- Voice settings
- Model ID

### android/

Android native kodu.

```
android/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── AndroidManifest.xml    # İzinler
│   │   │   ├── java/
│   │   │   │   └── MainActivity.java
│   │   │   └── res/
│   │   └── test/
│   └── build.gradle
├── gradle/
├── build.gradle
├── gradle.properties
├── gradlew
├── gradlew.bat
└── settings.gradle
```

**AndroidManifest.xml**
- İnternet izni
- Mikrofon izni
- Depolama izni
- Ağ durumu izni

### Konfigürasyon Dosyaları

**App.tsx**
- Navigation setup
- Stack Navigator
- Ekran tanımları

**index.js**
- Giriş noktası
- AppRegistry

**app.json**
- Uygulama adı
- Sürüm
- Açıklama

**package.json**
- Bağımlılıklar
- Dev bağımlılıkları
- Scripts

**tsconfig.json**
- TypeScript yapılandırması

**babel.config.js**
- Babel presets
- Plugins (react-native-dotenv)

**.env**
- ElevenLabs API Key
- API Base URL

**.gitignore**
- node_modules
- .env
- Build dosyaları

## Veri Akışı

```
User Input
    ↓
HomeScreen
    ↓
SpeechToTextButton / TextInputArea
    ↓
elevenlabsService / audioService
    ↓
ElevenLabs API / Native TTS
    ↓
Audio Output
```

## Bileşen Hiyerarşisi

```
App
├── NavigationContainer
│   └── Stack.Navigator
│       ├── HomeScreen
│       │   ├── SpeechToTextButton
│       │   ├── TextInputArea
│       │   ├── VoiceSelector
│       │   └── PlayButton
│       ├── SettingsScreen
│       │   ├── TextInput (API Key)
│       │   ├── RadioButton (Dil)
│       │   ├── RadioButton (Tema)
│       │   └── Button (Veri Yönetimi)
│       └── VoiceLibraryScreen
│           ├── TextInput (Arama)
│           └── FlatList (Sesler)
└── LoadingIndicator
```

## Dosya Boyutları (Tahmini)

```
components/
├── LoadingIndicator.tsx          ~50 satır
├── SpeechToTextButton.tsx        ~150 satır
├── TextInputArea.tsx             ~100 satır
├── VoiceSelector.tsx             ~100 satır
└── PlayButton.tsx                ~70 satır

screens/
├── HomeScreen.tsx                ~250 satır
├── SettingsScreen.tsx            ~300 satır
└── VoiceLibraryScreen.tsx        ~300 satır

services/
├── elevenlabsService.ts          ~150 satır
├── audioService.ts               ~150 satır
└── storageService.ts             ~150 satır

utils/
├── constants.ts                  ~80 satır
├── helpers.ts                    ~100 satır
└── permissions.ts                ~60 satır

styles/
├── theme.ts                      ~150 satır
└── globalStyles.ts               ~150 satır

config/
└── api.config.ts                 ~30 satır

App.tsx                            ~70 satır
```

## Bağımlılık Ağacı

```
react-native
├── @react-native-voice/voice
├── react-native-tts
├── react-native-sound
├── react-native-fs
├── axios
├── @react-native-community/netinfo
├── react-native-permissions
├── @react-native-async-storage/async-storage
├── react-native-dotenv
├── react-native-paper
├── @react-navigation/native
│   ├── @react-navigation/stack
│   ├── react-native-screens
│   └── react-native-safe-area-context
└── TypeScript
```

## Geliştirme Akışı

1. **Yeni Feature Ekleme**
   - Uygun klasöre dosya oluştur
   - Component/Service/Util oluştur
   - Gerekli imports ekle
   - Stil ekle (theme.ts'den)
   - Test et

2. **Bug Fix**
   - Sorunu tanımla
   - İlgili dosyayı bul
   - Kodu düzelt
   - Test et
   - Commit et

3. **Refactoring**
   - Kodu iyileştir
   - Tekrar eden kodu azalt
   - Performance optimize et
   - Test et

## Best Practices

1. **Dosya Organizasyonu**
   - Dosyaları türüne göre klasörlere ayır
   - Açıklayıcı isimler kullan
   - Index dosyaları kullan (opsiyonel)

2. **Naming Convention**
   - Components: PascalCase (HomeScreen.tsx)
   - Functions: camelCase (handlePress)
   - Constants: UPPER_SNAKE_CASE (API_KEY)
   - Files: PascalCase (HomeScreen.tsx)

3. **TypeScript**
   - Tüm props'ları type'la
   - Interface kullan
   - Any kullanmaktan kaçın

4. **Stil**
   - theme.ts'den renk al
   - globalStyles.ts'den stil al
   - Inline style kullanmaktan kaçın

5. **Error Handling**
   - Try-catch kullan
   - Kullanıcı dostu mesajlar
   - Logging ekle

---

**Proje yapısı anlaşıldı! 🎉**

