import { ELEVENLABS_API_KEY, ELEVENLABS_BASE_URL } from '@env';

// API key'in geçerli olup olmadığını kontrol et
const isValidApiKey = (key: string | undefined): boolean => {
  return !!(key && key.startsWith('sk_') && key.length > 10);
};

const apiKey = ELEVENLABS_API_KEY || '';
const baseUrl = ELEVENLABS_BASE_URL || 'https://api.elevenlabs.io/v1';

if (!isValidApiKey(apiKey)) {
  console.warn('⚠️ ElevenLabs API Key geçersiz veya ayarlanmamış. Lütfen .env dosyasını kontrol edin.');
}

export const API_CONFIG = {
  ELEVENLABS: {
    API_KEY: apiKey,
    BASE_URL: baseUrl,
    HEADERS: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
  },
  TIMEOUT: 30000,
};

export const VOICE_SETTINGS = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0,
  use_speaker_boost: true,
};

export const MODEL_ID = 'eleven_multilingual_v2';

