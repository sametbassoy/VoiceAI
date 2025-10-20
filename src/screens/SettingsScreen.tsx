import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ELEVENLABS_API_KEY } from '@env';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../styles/theme';
import { LANGUAGES, THEMES, DEFAULT_THEME } from '../utils/constants';
import { showSuccessAlert, showErrorAlert } from '../utils/helpers';
import storageService from '../services/storageService';
import elevenlabsService from '../services/elevenlabsService';
import LoadingIndicator from '../components/LoadingIndicator';

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const [apiKey, setApiKey] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES.TR.code);
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME);
  const [remainingCharacters, setRemainingCharacters] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadSettings();
    }, [])
  );

  const loadSettings = async () => {
    try {
      const savedLanguage = await storageService.getLanguage();
      const savedTheme = await storageService.getTheme();

      if (savedLanguage) setSelectedLanguage(savedLanguage);
      if (savedTheme) setSelectedTheme(savedTheme);

      // .env dosyasından API anahtarını yükle
      if (ELEVENLABS_API_KEY && ELEVENLABS_API_KEY.startsWith('sk_')) {
        setApiKey(ELEVENLABS_API_KEY);
        await fetchRemainingCharacters(ELEVENLABS_API_KEY);
      } else {
        // Fallback: Storage dan yükle
        const savedApiKey = await storageService.getApiKey();
        if (savedApiKey && savedApiKey.startsWith('sk_')) {
          setApiKey(savedApiKey);
          await fetchRemainingCharacters(savedApiKey);
        }
      }
    } catch (error) {
      console.error('Ayarlar yükleme hatası:', error);
    }
  };

  const fetchRemainingCharacters = async (key: string) => {
    try {
      if (!key) {
        console.warn('⚠️ API anahtarı boş');
        return;
      }

      elevenlabsService.setApiKey(key);
      const remaining = await elevenlabsService.getRemainingCharacters();
      setRemainingCharacters(remaining);
      console.log('✅ Kalan karakter sayısı:', remaining);
    } catch (error: any) {
      console.error('❌ Karakter sayısı hatası:', error?.message || error);
      // Hata olsa bile devam et, API anahtarı yine de geçerli olabilir
    }
  };

  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);
    await storageService.saveLanguage(language);
    showSuccessAlert('Dil başarıyla değiştirildi');
  };

  const handleThemeChange = async (theme: string) => {
    setSelectedTheme(theme);
    await storageService.saveTheme(theme);
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Geçmişi Temizle',
      'Tüm geçmiş kayıtları silmek istediğinize emin misiniz?',
      [
        { text: 'İptal', onPress: () => {} },
        {
          text: 'Sil',
          onPress: async () => {
            try {
              await storageService.clearHistory();
              showSuccessAlert('Geçmiş temizlendi');
            } catch (error) {
              showErrorAlert('Hata', 'Geçmiş temizlenemedi');
            }
          },
        },
      ]
    );
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Tüm Verileri Temizle',
      'Tüm ayarlar ve geçmiş silinecek. Bu işlem geri alınamaz!',
      [
        { text: 'İptal', onPress: () => {} },
        {
          text: 'Sil',
          onPress: async () => {
            try {
              await storageService.clear();
              setApiKey('');
              setSelectedLanguage(LANGUAGES.TR.code);
              setSelectedTheme(DEFAULT_THEME);
              showSuccessAlert('Tüm veriler temizlendi');
            } catch (error) {
              showErrorAlert('Hata', 'Veriler temizlenemedi');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>⚙️ Ayarlar</Text>
        </View>

        {/* API Configuration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API Yapılandırması</Text>

          <View style={styles.card}>
            <Text style={styles.label}>ElevenLabs API Anahtarı</Text>
            <TextInput
              style={styles.input}
              placeholder="sk_... ile başlayan API anahtarını gir"
              value={apiKey}
              onChangeText={setApiKey}
              secureTextEntry={true}
              placeholderTextColor={COLORS.TEXT_LIGHT_SECONDARY}
            />

            <TouchableOpacity
              style={[styles.button, !apiKey && styles.buttonDisabled]}
              onPress={async () => {
                if (!apiKey.startsWith('sk_')) {
                  showErrorAlert('Hata', 'API anahtarı sk_ ile başlamalıdır');
                  return;
                }
                setIsLoading(true);
                try {
                  await storageService.saveApiKey(apiKey);
                  elevenlabsService.setApiKey(apiKey);
                  await fetchRemainingCharacters(apiKey);
                  showSuccessAlert('Başarılı', 'API anahtarı kaydedildi');
                } catch (error) {
                  showErrorAlert('Hata', 'API anahtarı kaydedilemedi');
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading || !apiKey}
            >
              <Text style={styles.buttonText}>💾 API Anahtarını Kaydet</Text>
            </TouchableOpacity>

            {apiKey && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setIsLoading(true);
                  fetchRemainingCharacters(apiKey).then(() => {
                    setIsLoading(false);
                  });
                }}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>📊 Kalan Karakteri Kontrol Et</Text>
              </TouchableOpacity>
            )}

            {remainingCharacters > 0 && (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  ✅ Kalan Karakter: {remainingCharacters.toLocaleString()} / 10,000
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Language Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dil Seçimi</Text>
          
          <View style={styles.card}>
            {Object.values(LANGUAGES).map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.option,
                  selectedLanguage === lang.code && styles.optionSelected,
                ]}
                onPress={() => handleLanguageChange(lang.code)}
              >
                <View style={styles.radioButton}>
                  {selectedLanguage === lang.code && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.optionText}>
                  {lang.flag} {lang.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Theme Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tema</Text>
          
          <View style={styles.card}>
            {Object.values(THEMES).map((theme) => (
              <TouchableOpacity
                key={theme}
                style={[
                  styles.option,
                  selectedTheme === theme && styles.optionSelected,
                ]}
                onPress={() => handleThemeChange(theme)}
              >
                <View style={styles.radioButton}>
                  {selectedTheme === theme && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
                <Text style={styles.optionText}>
                  {theme === THEMES.LIGHT ? '☀️ Açık' : '🌙 Koyu'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Veri Yönetimi</Text>
          
          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.button, styles.buttonWarning]}
              onPress={handleClearHistory}
            >
              <Text style={styles.buttonText}>🗑️ Geçmişi Temizle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonDanger]}
              onPress={handleClearAllData}
            >
              <Text style={styles.buttonText}>⚠️ Tüm Verileri Temizle</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.aboutTitle}>Sesli Asistan v1.0</Text>
            <Text style={styles.aboutText}>
              Speech-to-Text, Text-to-Speech ve ElevenLabs API entegrasyonlu mobil uygulama
            </Text>
          </View>
        </View>
      </ScrollView>

      <LoadingIndicator visible={isLoading} message="Kaydediliyor..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_LIGHT,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.LG,
  },
  header: {
    marginBottom: SPACING.XL,
  },
  title: {
    fontSize: FONTS.SIZE.XXL,
    fontWeight: FONTS.WEIGHT.BOLD,
    color: COLORS.TEXT_LIGHT,
  },
  section: {
    marginBottom: SPACING.XL,
  },
  sectionTitle: {
    fontSize: FONTS.SIZE.LG,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.TEXT_LIGHT,
    marginBottom: SPACING.MD,
  },
  card: {
    backgroundColor: COLORS.BG_LIGHT_SECONDARY,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.LG,
    ...SHADOWS.LIGHT,
  },
  label: {
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.TEXT_LIGHT,
    marginBottom: SPACING.SM,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: BORDER_RADIUS.MD,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    fontSize: FONTS.SIZE.BASE,
    color: COLORS.TEXT_LIGHT,
  },
  eyeButton: {
    marginLeft: SPACING.SM,
    padding: SPACING.MD,
  },
  eyeButtonText: {
    fontSize: FONTS.SIZE.LG,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    marginBottom: SPACING.MD,
  },
  buttonDisabled: {
    backgroundColor: COLORS.TEXT_LIGHT_SECONDARY,
    opacity: 0.5,
  },
  buttonWarning: {
    backgroundColor: COLORS.WARNING,
  },
  buttonDanger: {
    backgroundColor: COLORS.ERROR,
  },
  buttonText: {
    color: COLORS.BG_LIGHT,
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
  },
  label: {
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.TEXT_LIGHT,
    marginBottom: SPACING.SM,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  optionSelected: {
    backgroundColor: COLORS.BG_LIGHT,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
  },
  optionText: {
    fontSize: FONTS.SIZE.BASE,
    color: COLORS.TEXT_LIGHT,
  },
  infoBox: {
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.MD,
    marginTop: SPACING.MD,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.SUCCESS,
  },
  infoText: {
    fontSize: FONTS.SIZE.SM,
    color: COLORS.TEXT_LIGHT,
  },
  aboutTitle: {
    fontSize: FONTS.SIZE.LG,
    fontWeight: FONTS.WEIGHT.BOLD,
    color: COLORS.TEXT_LIGHT,
    marginBottom: SPACING.SM,
  },
  aboutText: {
    fontSize: FONTS.SIZE.SM,
    color: COLORS.TEXT_LIGHT_SECONDARY,
    lineHeight: 20,
  },
});

export default SettingsScreen;

