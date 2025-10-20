import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ELEVENLABS_API_KEY } from '@env';
import TTS from 'react-native-tts';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../styles/theme';
import elevenlabsService from '../services/elevenlabsService';
import audioService from '../services/audioService';
import SpeechToTextButton from '../components/SpeechToTextButton';

const SimpleHomeScreen: React.FC = () => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voices, setVoices] = useState<any[]>([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState('');
  const [voiceType, setVoiceType] = useState('native');

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('🚀 Uygulama başlatılıyor...');

      if (ELEVENLABS_API_KEY && ELEVENLABS_API_KEY.startsWith('sk_')) {
        elevenlabsService.setApiKey(ELEVENLABS_API_KEY);
        console.log('✅ API anahtarı ayarlandı');
      }

      await loadVoices();
    } catch (error) {
      console.error('❌ Başlatma hatası:', error);
    }
  };



  const loadVoices = async () => {
    try {
      console.log('🔊 Sesler yükleniyor...');
      const voiceList = await elevenlabsService.getVoices();
      console.log(`✅ ${voiceList.length} ses yüklendi`);
      setVoices(voiceList);
      if (voiceList.length > 0) {
        setSelectedVoiceId(voiceList[0].voice_id);
      }
    } catch (error: any) {
      console.error('❌ Ses yükleme hatası:', error);
      Alert.alert('Hata', error.message || 'Sesler yüklenemedi');
    }
  };



  const playText = async () => {
    if (!text.trim()) {
      Alert.alert('Hata', 'Lütfen metin girin');
      return;
    }

    setIsLoading(true);
    try {
      if (voiceType === 'native') {
        console.log('🔊 Native TTS oynatılıyor...');
        await TTS.setDefaultLanguage('tr');
        await TTS.speak(text);
      } else {
        if (!selectedVoiceId) {
          Alert.alert('Hata', 'Lütfen ses seçin');
          setIsLoading(false);
          return;
        }

        console.log('🔊 ElevenLabs TTS oynatılıyor...');
        const audioBuffer = await elevenlabsService.textToSpeech(text, selectedVoiceId);
        await audioService.playAudioFromBuffer(audioBuffer);
      }
      console.log('✅ Ses oynatıldı');
    } catch (error: any) {
      console.error('❌ Oynatma hatası:', error);
      Alert.alert('Hata', error.message || 'Ses oynatılamadı');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎤 Sesli Asistan</Text>
      </View>

      {/* Metin Giriş */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Metin Girin</Text>
        <TextInput
          style={styles.input}
          placeholder="Metin yazın veya konuşun..."
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Speech-to-Text */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎤 Konuşmaya Başla</Text>
        <SpeechToTextButton
          onResult={(recognizedText) => {
            console.log('✅ Tanınan metin:', recognizedText);
            setText(recognizedText);
          }}
          onError={(error) => {
            console.error('❌ Hata:', error);
            Alert.alert('Hata', error);
          }}
          language="tr-TR"
        />
      </View>

      {/* Ses Türü Seçimi */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ses Türü</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.buttonSmall, voiceType === 'native' && styles.buttonSmallActive]}
            onPress={() => setVoiceType('native')}
          >
            <Text style={styles.buttonText}>Native TTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonSmall, voiceType === 'elevenlabs' && styles.buttonSmallActive]}
            onPress={() => setVoiceType('elevenlabs')}
          >
            <Text style={styles.buttonText}>ElevenLabs</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ElevenLabs Ses Seçimi */}
      {voiceType === 'elevenlabs' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ses Seçin</Text>
          <ScrollView horizontal style={styles.voiceList}>
            {voices.map((voice) => (
              <TouchableOpacity
                key={voice.voice_id}
                style={[
                  styles.voiceButton,
                  selectedVoiceId === voice.voice_id && styles.voiceButtonActive,
                ]}
                onPress={() => setSelectedVoiceId(voice.voice_id)}
              >
                <Text style={styles.voiceButtonText}>{voice.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Text-to-Speech */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔊 Metni Oku</Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={playText}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.BG_LIGHT} />
          ) : (
            <Text style={styles.buttonText}>▶️ Oynat</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Temizle */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.button, styles.buttonDanger]}
          onPress={() => setText('')}
        >
          <Text style={styles.buttonText}>🗑️ Temizle</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_LIGHT,
    padding: SPACING.LG,
  },
  header: {
    marginBottom: SPACING.XL,
    marginTop: SPACING.LG,
  },
  title: {
    fontSize: FONTS.SIZE.XL,
    fontWeight: FONTS.WEIGHT.BOLD,
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
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
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.MD,
    fontSize: FONTS.SIZE.BASE,
    color: COLORS.TEXT_LIGHT,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: COLORS.SECONDARY,
  },
  buttonPrimary: {
    backgroundColor: COLORS.PRIMARY,
  },
  buttonDanger: {
    backgroundColor: COLORS.ERROR,
  },
  buttonText: {
    color: COLORS.BG_LIGHT,
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: SPACING.MD,
  },
  buttonSmall: {
    flex: 1,
    backgroundColor: COLORS.BORDER_LIGHT,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
  },
  buttonSmallActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  voiceList: {
    marginBottom: SPACING.MD,
  },
  voiceButton: {
    backgroundColor: COLORS.BORDER_LIGHT,
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.MD,
    borderRadius: BORDER_RADIUS.MD,
    marginRight: SPACING.MD,
  },
  voiceButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  voiceButtonText: {
    color: COLORS.TEXT_LIGHT,
    fontSize: FONTS.SIZE.SM,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
  },
});

export default SimpleHomeScreen;

