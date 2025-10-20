import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { useFocusEffect } from '@react-navigation/native';
import { ELEVENLABS_API_KEY } from '@env';
import SpeechToTextButton from '../components/SpeechToTextButton';
import TextInputArea from '../components/TextInputArea';
import VoiceSelector from '../components/VoiceSelector';
import PlayButton from '../components/PlayButton';
import LoadingIndicator from '../components/LoadingIndicator';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../styles/theme';
import { VOICE_TYPES, DEFAULT_LANGUAGE, CHARACTER_LIMIT } from '../utils/constants';
import { showErrorAlert, showSuccessAlert } from '../utils/helpers';
import elevenlabsService from '../services/elevenlabsService';
import audioService from '../services/audioService';
import storageService from '../services/storageService';
import TTS from 'react-native-tts';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [text, setText] = useState('');
  const [selectedVoiceType, setSelectedVoiceType] = useState(VOICE_TYPES.NATIVE);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE.code);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [selectedVoiceId, setSelectedVoiceId] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    loadSettings();
    initializeTTS();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadSettings();
    }, [])
  );

  const loadSettings = async () => {
    try {
      const savedVoiceType = await storageService.getVoiceType();
      const savedLanguage = await storageService.getLanguage();
      const savedVoiceId = await storageService.getSelectedVoice();

      if (savedVoiceType) setSelectedVoiceType(savedVoiceType);
      if (savedLanguage) setLanguage(savedLanguage);
      if (savedVoiceId) setSelectedVoiceId(savedVoiceId);

      // .env dosyasından API anahtarını yükle
      if (ELEVENLABS_API_KEY && ELEVENLABS_API_KEY.startsWith('sk_')) {
        console.log('✅ .env dosyasından API anahtarı yüklendi');
        setApiKey(ELEVENLABS_API_KEY);
        elevenlabsService.setApiKey(ELEVENLABS_API_KEY);
      } else {
        // Fallback: Storage'dan yükle
        const savedApiKey = await storageService.getApiKey();
        if (savedApiKey && savedApiKey.startsWith('sk_')) {
          console.log('✅ Storage dan API anahtarı yüklendi');
          setApiKey(savedApiKey);
          elevenlabsService.setApiKey(savedApiKey);
        } else {
          console.warn('⚠️ Geçerli API anahtarı bulunamadı');
        }
      }
    } catch (error) {
      console.error('❌ Ayarlar yükleme hatası:', error);
    }
  };

  const initializeTTS = async () => {
    try {
      await TTS.setDefaultLanguage(language);
      await TTS.setDefaultRate(speechRate);
    } catch (error) {
      console.error('TTS başlatma hatası:', error);
    }
  };

  const handleTextChange = (newText: string) => {
    if (newText.length <= CHARACTER_LIMIT) {
      setText(newText);
    }
  };

  const handleClearText = () => {
    setText('');
  };

  const handleVoiceTypeChange = async (type: string) => {
    setSelectedVoiceType(type);
    await storageService.saveVoiceType(type);
  };

  const handlePlayText = async () => {
    if (!text.trim()) {
      showErrorAlert('Hata', 'Lütfen metin girin');
      return;
    }

    if (selectedVoiceType === VOICE_TYPES.NATIVE) {
      await handleNativeTTS();
    } else {
      await handleElevenLabsTTS();
    }
  };

  const handleNativeTTS = async () => {
    try {
      setIsLoading(true);

      // TTS ayarlarını yapılandır
      await TTS.setDefaultLanguage(language);
      await TTS.setDefaultRate(speechRate);
      await TTS.setDefaultPitch(1.0);

      // Metni oku
      TTS.speak(text);

      await storageService.addToHistory(text);

      // Konuşma tamamlandığında loading'i kapat
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error: any) {
      setIsLoading(false);
      console.error('TTS hatası:', error);
      showErrorAlert('Hata', 'Metin okutulamadı: ' + (error?.message || ''));
    }
  };

  const handleElevenLabsTTS = async () => {
    try {
      // API key kontrolü
      if (!apiKey || !apiKey.startsWith('sk_')) {
        showErrorAlert(
          'Hata',
          'API anahtarı ayarlanmamış veya geçersiz. Lütfen ayarlardan geçerli bir ElevenLabs API anahtarı ekleyin.'
        );
        navigation.navigate('Settings');
        return;
      }

      // Ses seçimi kontrolü
      if (!selectedVoiceId) {
        showErrorAlert('Hata', 'Ses seçilmemiş. Lütfen ses kütüphanesinden seçin.');
        navigation.navigate('VoiceLibrary');
        return;
      }

      // Metin kontrolü
      if (!text.trim()) {
        showErrorAlert('Hata', 'Lütfen metin girin');
        return;
      }

      setIsLoading(true);
      console.log('🔊 ElevenLabs TTS başlatılıyor...');

      const audioBuffer = await elevenlabsService.textToSpeech(
        text,
        selectedVoiceId,
        {
          stability: 0.5,
          similarity_boost: 0.75,
        }
      );

      console.log('✅ Ses buffer alındı, oynatılıyor...');
      await audioService.playAudioFromBuffer(audioBuffer);
      await storageService.addToHistory(text);
      showSuccessAlert('Metin başarıyla okundu');
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error('❌ ElevenLabs TTS hatası:', error);
      showErrorAlert('Hata', error.message || 'Ses oluşturulamadı');
    }
  };

  const handleSpeechResult = (result: string) => {
    setText(result);
    storageService.addToHistory(result);
  };

  const handleSpeechError = (error: string) => {
    showErrorAlert('Konuşma Hatası', error);
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
          <Text style={styles.title}>🎤 Sesli Asistan</Text>
          <Text style={styles.subtitle}>Konuşun, yazın, dinleyin</Text>
        </View>

        {/* Speech to Text */}
        <View style={styles.section}>
          <SpeechToTextButton
            onResult={handleSpeechResult}
            onError={handleSpeechError}
            language={language}
          />
        </View>

        {/* Text Input */}
        <View style={styles.section}>
          <TextInputArea
            value={text}
            onChangeText={handleTextChange}
            onClear={handleClearText}
            maxLength={CHARACTER_LIMIT}
          />
        </View>

        {/* Voice Selector */}
        <View style={styles.section}>
          <VoiceSelector
            selectedType={selectedVoiceType}
            onSelect={handleVoiceTypeChange}
          />
        </View>

        {/* Speech Rate Control */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ses Hızı</Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>0.5x</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.1}
              value={speechRate}
              onValueChange={setSpeechRate}
              minimumTrackTintColor={COLORS.PRIMARY}
              maximumTrackTintColor={COLORS.BORDER_LIGHT}
            />
            <Text style={styles.sliderLabel}>{speechRate.toFixed(1)}x</Text>
          </View>
        </View>

        {/* Play Button */}
        <View style={styles.section}>
          <PlayButton
            onPress={handlePlayText}
            isLoading={isLoading}
            isDisabled={!text.trim()}
          />
        </View>

        {/* Settings Button */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.settingsButtonText}>⚙️ Ayarlar</Text>
        </TouchableOpacity>
      </ScrollView>

      <LoadingIndicator visible={isLoading} message="Hazırlanıyor..." />
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
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.SIZE.XXXL,
    fontWeight: FONTS.WEIGHT.BOLD,
    color: COLORS.TEXT_LIGHT,
  },
  subtitle: {
    fontSize: FONTS.SIZE.BASE,
    color: COLORS.TEXT_LIGHT_SECONDARY,
    marginTop: SPACING.SM,
  },
  section: {
    marginBottom: SPACING.LG,
  },
  sectionTitle: {
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.TEXT_LIGHT,
    marginBottom: SPACING.MD,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.MD,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderLabel: {
    fontSize: FONTS.SIZE.SM,
    color: COLORS.TEXT_LIGHT_SECONDARY,
    minWidth: 40,
  },
  settingsButton: {
    marginTop: SPACING.XL,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    backgroundColor: COLORS.BG_LIGHT_SECONDARY,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.TEXT_LIGHT,
  },
});

export default HomeScreen;

