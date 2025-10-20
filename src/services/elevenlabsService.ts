import axios, { AxiosInstance } from 'axios';
import { API_CONFIG, VOICE_SETTINGS, MODEL_ID } from '../config/api.config';

interface TextToSpeechOptions {
  stability?: number;
  similarity_boost?: number;
  style?: number;
  use_speaker_boost?: boolean;
}

interface Voice {
  voice_id: string;
  name: string;
  category?: string;
  labels?: Record<string, string>;
  description?: string;
  preview_url?: string;
}

interface UserInfo {
  subscription: {
    character_count: number;
    character_limit: number;
  };
}

class ElevenLabsService {
  private axiosInstance: AxiosInstance;
  private apiKey: string;

  constructor() {
    this.apiKey = API_CONFIG.ELEVENLABS.API_KEY;
    this.initializeAxios();
  }

  private initializeAxios(): void {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.ELEVENLABS.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Metni sese dönüştür
   */
  async textToSpeech(
    text: string,
    voiceId: string,
    options: TextToSpeechOptions = {}
  ): Promise<ArrayBuffer> {
    try {
      // API key kontrolü
      if (!this.apiKey || !this.apiKey.startsWith('sk_')) {
        throw new Error('API anahtarı geçersiz. Lütfen ayarlardan geçerli bir API anahtarı ekleyin.');
      }

      if (!text || text.trim().length === 0) {
        throw new Error('Metin boş olamaz');
      }

      if (!voiceId) {
        throw new Error('Ses ID gerekli');
      }

      console.log('🔊 ElevenLabs API çağrısı yapılıyor:', { voiceId, textLength: text.length });

      const response = await this.axiosInstance.post(
        `/text-to-speech/${voiceId}`,
        {
          text: text.trim(),
          model_id: MODEL_ID,
          voice_settings: {
            stability: options.stability ?? VOICE_SETTINGS.stability,
            similarity_boost: options.similarity_boost ?? VOICE_SETTINGS.similarity_boost,
            style: options.style ?? VOICE_SETTINGS.style,
            use_speaker_boost: options.use_speaker_boost ?? VOICE_SETTINGS.use_speaker_boost,
          },
        },
        {
          responseType: 'arraybuffer',
        }
      );

      console.log('✅ ElevenLabs API başarılı');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Mevcut sesleri getir
   */
  async getVoices(): Promise<Voice[]> {
    try {
      const response = await this.axiosInstance.get('/voices');
      return response.data.voices || [];
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Kullanıcı bilgisini getir (kalan karakter sayısı)
   */
  async getUserInfo(): Promise<UserInfo> {
    try {
      const response = await this.axiosInstance.get('/user');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Kalan karakter sayısını getir
   */
  async getRemainingCharacters(): Promise<number> {
    try {
      const userInfo = await this.getUserInfo();
      const limit = userInfo.subscription.character_limit;
      const used = userInfo.subscription.character_count;
      return Math.max(0, limit - used);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * API key'i güncelle
   */
  setApiKey(apiKey: string): void {
    if (!apiKey || !apiKey.startsWith('sk_')) {
      console.warn('⚠️ Geçersiz API anahtarı formatı. Lütfen geçerli bir ElevenLabs API anahtarı sağlayın.');
      return;
    }
    this.apiKey = apiKey;
    this.axiosInstance.defaults.headers['xi-api-key'] = apiKey;
    console.log('✅ API anahtarı güncellendi');
  }

  /**
   * Hata yönetimi
   */
  private handleError(error: any): Error {
    console.error('❌ ElevenLabs Hata:', error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Sunucu yanıt verdi ama hata kodu döndü
        const status = error.response.status;
        const data = error.response.data as any;

        if (status === 401 || status === 403) {
          return new Error('❌ API anahtarı geçersiz veya yetkisiz erişim. Lütfen ayarlardan API anahtarını kontrol edin.');
        }

        if (status === 429) {
          return new Error('⏱️ Çok fazla istek gönderildi. Lütfen biraz bekleyin.');
        }

        if (status === 400) {
          const detail = data?.detail || data?.message || 'Geçersiz istek';
          return new Error(`❌ Geçersiz istek: ${detail}`);
        }

        if (status === 500) {
          return new Error('❌ ElevenLabs sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        }

        return new Error(data?.detail || data?.message || `❌ API Hatası: ${status}`);
      } else if (error.request) {
        // İstek yapıldı ama yanıt alınmadı
        return new Error('❌ İnternet bağlantısı yok veya ElevenLabs sunucusuna ulaşılamıyor');
      }
    }

    return new Error(error?.message || '❌ Bilinmeyen bir hata oluştu');
  }
}

export default new ElevenLabsService();

