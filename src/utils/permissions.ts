import { PermissionsAndroid, Platform } from 'react-native';

export const requestMicrophonePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Mikrofon İzni',
        message: 'Sesli asistan uygulaması mikrofon erişimine ihtiyaç duyuyor.',
        buttonNeutral: 'Sonra Sor',
        buttonNegative: 'İptal',
        buttonPositive: 'Tamam',
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Mikrofon izni hatası:', err);
    return false;
  }
};

export const requestStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Depolama İzni',
        message: 'Sesli asistan uygulaması depolama erişimine ihtiyaç duyuyor.',
        buttonNeutral: 'Sonra Sor',
        buttonNegative: 'İptal',
        buttonPositive: 'Tamam',
      }
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn('Depolama izni hatası:', err);
    return false;
  }
};

export const requestAllPermissions = async (): Promise<boolean> => {
  const micPermission = await requestMicrophonePermission();
  const storagePermission = await requestStoragePermission();
  
  return micPermission && storagePermission;
};

