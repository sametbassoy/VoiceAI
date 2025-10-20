export const LANGUAGES = {
  TR: { code: 'tr-TR', name: 'Türkçe', flag: '🇹🇷' },
  EN: { code: 'en-US', name: 'English', flag: '🇺🇸' },
};

export const DEFAULT_LANGUAGE = LANGUAGES.TR;

export const VOICE_TYPES = {
  NATIVE: 'native',
  ELEVENLABS: 'elevenlabs',
};

export const DEFAULT_VOICE_TYPE = VOICE_TYPES.NATIVE;

export const CHARACTER_LIMIT = 10000;

export const STORAGE_KEYS = {
  API_KEY: '@voice_assistant_api_key',
  SELECTED_VOICE: '@voice_assistant_selected_voice',
  SELECTED_VOICE_TYPE: '@voice_assistant_selected_voice_type',
  LANGUAGE: '@voice_assistant_language',
  THEME: '@voice_assistant_theme',
  HISTORY: '@voice_assistant_history',
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const DEFAULT_THEME = THEMES.LIGHT;

export const ERROR_MESSAGES = {
  INVALID_API_KEY: 'API anahtarı geçersiz. Lütfen ayarlardan kontrol edin.',
  NO_INTERNET: 'İnternet bağlantısı gerekli. Lütfen bağlantınızı kontrol edin.',
  CHARACTER_LIMIT_EXCEEDED: 'Aylık karakter limitini aştınız (10.000 karakter).',
  AUDIO_PLAYBACK_FAILED: 'Ses oynatılamadı. Lütfen tekrar deneyin.',
  MICROPHONE_PERMISSION_DENIED: 'Mikrofon izni gerekli. Lütfen ayarlardan izin verin.',
  SPEECH_RECOGNITION_FAILED: 'Konuşma tanıma başarısız oldu. Lütfen tekrar deneyin.',
  VOICE_LIST_FAILED: 'Ses listesi yüklenemedi. Lütfen tekrar deneyin.',
  UNKNOWN_ERROR: 'Bilinmeyen bir hata oluştu. Lütfen tekrar deneyin.',
};

export const SUCCESS_MESSAGES = {
  TEXT_TO_SPEECH_SUCCESS: 'Metin başarıyla okundu.',
  VOICE_SELECTED: 'Ses başarıyla seçildi.',
  SETTINGS_SAVED: 'Ayarlar kaydedildi.',
};

