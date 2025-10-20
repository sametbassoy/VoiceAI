import { Alert } from 'react-native';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from './constants';

export const showErrorAlert = (title: string, message: string) => {
  Alert.alert(title, message, [{ text: 'Tamam', onPress: () => {} }]);
};

export const showSuccessAlert = (message: string) => {
  Alert.alert('Başarılı', message, [{ text: 'Tamam', onPress: () => {} }]);
};

export const formatCharacterCount = (used: number, total: number): string => {
  return `${used} / ${total}`;
};

export const isCharacterLimitExceeded = (text: string, limit: number): boolean => {
  return text.length > limit;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const maskApiKey = (apiKey: string): string => {
  if (!apiKey || apiKey.length < 8) return '****';
  const start = apiKey.substring(0, 5);
  const end = apiKey.substring(apiKey.length - 3);
  return `${start}...${end}`;
};

export const isValidApiKey = (apiKey: string): boolean => {
  return apiKey && apiKey.length > 10 && apiKey.startsWith('sk_');
};

export const getErrorMessage = (errorCode: string): string => {
  return (ERROR_MESSAGES as any)[errorCode] || ERROR_MESSAGES.UNKNOWN_ERROR;
};

export const getSuccessMessage = (messageCode: string): string => {
  return (SUCCESS_MESSAGES as any)[messageCode] || 'İşlem başarılı.';
};

export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `0:${remainingSeconds.toString().padStart(2, '0')}`;
};

