import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

class StorageService {
  /**
   * Değer kaydet
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Storage hatası (${key}):`, error);
      throw error;
    }
  }

  /**
   * Değer getir
   */
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Storage hatası (${key}):`, error);
      return null;
    }
  }

  /**
   * JSON değer kaydet
   */
  async setJSON(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Storage hatası (${key}):`, error);
      throw error;
    }
  }

  /**
   * JSON değer getir
   */
  async getJSON(key: string): Promise<any> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Storage hatası (${key}):`, error);
      return null;
    }
  }

  /**
   * Değer sil
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Storage hatası (${key}):`, error);
      throw error;
    }
  }

  /**
   * Tüm verileri temizle
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage temizleme hatası:', error);
      throw error;
    }
  }

  // API Key işlemleri
  async saveApiKey(apiKey: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.API_KEY, apiKey);
  }

  async getApiKey(): Promise<string | null> {
    return await this.getItem(STORAGE_KEYS.API_KEY);
  }

  // Seçili ses işlemleri
  async saveSelectedVoice(voiceId: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.SELECTED_VOICE, voiceId);
  }

  async getSelectedVoice(): Promise<string | null> {
    return await this.getItem(STORAGE_KEYS.SELECTED_VOICE);
  }

  // Ses türü işlemleri
  async saveVoiceType(voiceType: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.SELECTED_VOICE_TYPE, voiceType);
  }

  async getVoiceType(): Promise<string | null> {
    return await this.getItem(STORAGE_KEYS.SELECTED_VOICE_TYPE);
  }

  // Dil işlemleri
  async saveLanguage(language: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.LANGUAGE, language);
  }

  async getLanguage(): Promise<string | null> {
    return await this.getItem(STORAGE_KEYS.LANGUAGE);
  }

  // Tema işlemleri
  async saveTheme(theme: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.THEME, theme);
  }

  async getTheme(): Promise<string | null> {
    return await this.getItem(STORAGE_KEYS.THEME);
  }

  // Geçmiş işlemleri
  async addToHistory(text: string): Promise<void> {
    try {
      const history = await this.getJSON(STORAGE_KEYS.HISTORY) || [];
      const newEntry = {
        text,
        timestamp: new Date().toISOString(),
      };
      history.unshift(newEntry);
      // Son 50 öğeyi tut
      if (history.length > 50) {
        history.pop();
      }
      await this.setJSON(STORAGE_KEYS.HISTORY, history);
    } catch (error) {
      console.error('Geçmiş ekleme hatası:', error);
    }
  }

  async getHistory(): Promise<any[]> {
    return (await this.getJSON(STORAGE_KEYS.HISTORY)) || [];
  }

  async clearHistory(): Promise<void> {
    await this.removeItem(STORAGE_KEYS.HISTORY);
  }
}

export default new StorageService();

