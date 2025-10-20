import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  NativeModules,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../styles/theme';
import { requestMicrophonePermission } from '../utils/permissions';
import { ERROR_MESSAGES } from '../utils/constants';

interface SpeechToTextButtonProps {
  onResult: (text: string) => void;
  onError?: (error: string) => void;
  language?: string;
}

const SpeechToTextButton: React.FC<SpeechToTextButtonProps> = ({
  onResult,
  onError,
  language = 'tr-TR',
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [voiceReady, setVoiceReady] = useState(false);

  useEffect(() => {
    const setupVoice = async () => {
      try {
        console.log('🎤 Voice modülü başlatılıyor...');

        // Native modül mevcut mu kontrol et
        const isLinked = !!(NativeModules as any)?.Voice;
        if (!isLinked) {
          throw new Error(
            Platform.OS === 'android'
              ? "Voice native modülü yüklenemedi. Çözüm: Proje yolunu kısaltın (örn. C:\\\VoiceApp), ardından android klasöründe 'gradlew clean' çalıştırıp uygulamayı yeniden kurun."
              : 'Voice native modülü yüklenemedi.'
          );
        }

        // Voice event listeners'ları ayarla
        Voice.onSpeechStart = handleSpeechStart;
        Voice.onSpeechRecognized = handleSpeechRecognized;
        Voice.onSpeechEnd = handleSpeechEnd;
        Voice.onSpeechError = handleSpeechError;
        Voice.onSpeechResults = handleSpeechResults;
        Voice.onSpeechPartialResults = handleSpeechPartialResults;

        setVoiceReady(true);
        console.log('✅ Voice modülü başarıyla başlatıldı');
      } catch (error) {
        console.error('❌ Voice setup hatası:', error);
        setVoiceReady(false);
      }
    };

    setupVoice();

    return () => {
      try {
        if (Voice && (Voice as any).removeAllListeners) {
          (Voice as any).removeAllListeners();
        }
        if (Voice && Voice.destroy) {
          Voice.destroy().catch(() => {});
        }
      } catch (error) {
        console.error('Voice destroy hatası:', error);
      }
    };
  }, []);

  const handleSpeechStart = () => {
    setIsListening(true);
    setRecognizedText('');
  };

  const handleSpeechRecognized = () => {
    console.log('Konuşma tanındı');
  };

  const handleSpeechEnd = () => {
    setIsListening(false);
  };

  const handleSpeechError = (error: any) => {
    console.error('Konuşma hatası:', error);
    setIsListening(false);
    const errorMessage = error?.error?.message || ERROR_MESSAGES.SPEECH_RECOGNITION_FAILED;
    onError?.(errorMessage);
    Alert.alert('Hata', errorMessage);
  };

  const handleSpeechResults = (result: any) => {
    if (result.value && result.value.length > 0) {
      const text = result.value[0];
      setRecognizedText(text);
      onResult(text);
    }
  };

  const handleSpeechPartialResults = (result: any) => {
    if (result.value && result.value.length > 0) {
      setRecognizedText(result.value[0]);
    }
  };

  const startListening = async () => {
    try {
      if (!voiceReady) {
        throw new Error('Voice modülü henüz hazır değil');
      }

      // Native modül tekrar kontrol
      const isLinked = !!(NativeModules as any)?.Voice;
      if (!isLinked) {
        throw new Error(
          Platform.OS === 'android'
            ? "Konuşma motoru hazır değil (native modül yok). Lütfen projeyi kısa bir klasöre taşıyıp temiz build alın: C\\VoiceApp → android\\gradlew clean → npm run android"
            : 'Konuşma motoru hazır değil (native modül yok).'
        );
      }

      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert('İzin Gerekli', ERROR_MESSAGES.MICROPHONE_PERMISSION_DENIED);
        return;
      }

      console.log('🎤 Dinleme başlatılıyor, dil:', language);
      setIsListening(true);
      setRecognizedText('');

      // Voice.start() çağrısı
      await Voice.start(language);
      console.log('✅ Voice.start() başarıyla çağrıldı');
    } catch (error: any) {
      console.error('❌ Dinleme başlatma hatası:', error);
      setIsListening(false);
      const errorMsg = error?.message || ERROR_MESSAGES.SPEECH_RECOGNITION_FAILED;
      onError?.(errorMsg);
      Alert.alert('Hata', errorMsg);
    }
  };

  const stopListening = async () => {
    try {
      if (Voice && Voice.stop) {
        await Voice.stop();
      }
      setIsListening(false);
    } catch (error) {
      console.error('❌ Dinleme durdurma hatası:', error);
      setIsListening(false);
    }
  };

  const handlePress = async () => {
    if (isListening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          isListening && styles.buttonActive,
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {isListening ? '🎙️ Dinleniyor...' : '🎤 Konuşmaya Başla'}
        </Text>
      </TouchableOpacity>
      {recognizedText && (
        <Text style={styles.recognizedText}>
          Tanınan: {recognizedText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.MD,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACING.LG,
    paddingHorizontal: SPACING.XL,
    borderRadius: BORDER_RADIUS.LG,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.MEDIUM,
  },
  buttonActive: {
    backgroundColor: COLORS.SECONDARY,
  },
  buttonText: {
    color: COLORS.BG_LIGHT,
    fontSize: FONTS.SIZE.LG,
    fontWeight: FONTS.WEIGHT.BOLD,
  },
  recognizedText: {
    marginTop: SPACING.MD,
    fontSize: FONTS.SIZE.SM,
    color: COLORS.TEXT_LIGHT_SECONDARY,
    fontStyle: 'italic',
  },
});

export default SpeechToTextButton;

