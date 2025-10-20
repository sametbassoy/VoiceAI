import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ELEVENLABS_API_KEY } from '@env';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../styles/theme';
import { showErrorAlert, showSuccessAlert } from '../utils/helpers';
import elevenlabsService from '../services/elevenlabsService';
import audioService from '../services/audioService';
import storageService from '../services/storageService';
import LoadingIndicator from '../components/LoadingIndicator';

interface Voice {
  voice_id: string;
  name: string;
  category?: string;
  labels?: Record<string, string>;
  description?: string;
  preview_url?: string;
}

const VoiceLibraryScreen: React.FC = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [filteredVoices, setFilteredVoices] = useState<Voice[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState('');
  const [previewingVoiceId, setPreviewingVoiceId] = useState('');

  useEffect(() => {
    loadVoices();
    loadSelectedVoice();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadVoices();
      loadSelectedVoice();
    }, [])
  );

  const loadVoices = async () => {
    try {
      setIsLoading(true);

      // .env dosyasından API anahtarını yükle
      if (ELEVENLABS_API_KEY && ELEVENLABS_API_KEY.startsWith('sk_')) {
        elevenlabsService.setApiKey(ELEVENLABS_API_KEY);
        console.log('✅ VoiceLibrary: .env API anahtarı ayarlandı');
      } else {
        // Fallback: Storage dan yükle
        const savedApiKey = await storageService.getApiKey();
        if (savedApiKey && savedApiKey.startsWith('sk_')) {
          elevenlabsService.setApiKey(savedApiKey);
          console.log('✅ VoiceLibrary: Storage API anahtarı ayarlandı');
        } else {
          throw new Error('Geçerli API anahtarı bulunamadı. Lütfen ayarlardan API anahtarını ekleyin.');
        }
      }

      console.log('🔊 Ses listesi yükleniyor...');
      const voiceList = await elevenlabsService.getVoices();

      if (!voiceList || voiceList.length === 0) {
        throw new Error('Ses listesi boş. API anahtarını kontrol edin.');
      }

      console.log(`✅ ${voiceList.length} ses yüklendi`);
      setVoices(voiceList);
      setFilteredVoices(voiceList);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error('❌ Ses listesi yükleme hatası:', error?.message || error);
      showErrorAlert('Hata', error.message || 'Ses listesi yüklenemedi');
    }
  };

  const loadSelectedVoice = async () => {
    try {
      const saved = await storageService.getSelectedVoice();
      if (saved) setSelectedVoiceId(saved);
    } catch (error) {
      console.error('Seçili ses yükleme hatası:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredVoices(voices);
    } else {
      const filtered = voices.filter((voice) =>
        voice.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredVoices(filtered);
    }
  };

  const handleSelectVoice = async (voiceId: string) => {
    try {
      setSelectedVoiceId(voiceId);
      await storageService.saveSelectedVoice(voiceId);
      showSuccessAlert('Ses başarıyla seçildi');
    } catch (error) {
      showErrorAlert('Hata', 'Ses seçilemedi');
    }
  };

  const handlePreviewVoice = async (voice: Voice) => {
    try {
      setPreviewingVoiceId(voice.voice_id);
      
      const audioBuffer = await elevenlabsService.textToSpeech(
        `Merhaba, ben ${voice.name}. Bu benim ses örneğidir.`,
        voice.voice_id
      );

      await audioService.playAudioFromBuffer(audioBuffer, `preview_${voice.voice_id}.mp3`);
      setPreviewingVoiceId('');
    } catch (error: any) {
      setPreviewingVoiceId('');
      showErrorAlert('Hata', error.message || 'Ses önizlemesi oynatılamadı');
    }
  };

  const renderVoiceItem = ({ item }: { item: Voice }) => {
    const isSelected = selectedVoiceId === item.voice_id;
    const isPreviewing = previewingVoiceId === item.voice_id;

    return (
      <View style={[styles.voiceCard, isSelected && styles.voiceCardSelected]}>
        <View style={styles.voiceInfo}>
          <Text style={styles.voiceName}>{item.name}</Text>
          {item.category && (
            <Text style={styles.voiceCategory}>{item.category}</Text>
          )}
          {item.labels && Object.keys(item.labels).length > 0 && (
            <View style={styles.labelsContainer}>
              {Object.entries(item.labels).map(([key, value]) => (
                <View key={key} style={styles.label}>
                  <Text style={styles.labelText}>{value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.voiceActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.previewButton]}
            onPress={() => handlePreviewVoice(item)}
            disabled={isPreviewing}
          >
            <Text style={styles.actionButtonText}>
              {isPreviewing ? '⏳' : '▶️'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              isSelected ? styles.selectButtonActive : styles.selectButton,
            ]}
            onPress={() => handleSelectVoice(item.voice_id)}
          >
            <Text style={styles.actionButtonText}>
              {isSelected ? '✓' : '○'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🎭 Ses Kütüphanesi</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Ses ara..."
          placeholderTextColor={COLORS.TEXT_LIGHT_SECONDARY}
          value={searchText}
          onChangeText={handleSearch}
        />
        {searchText && (
          <TouchableOpacity
            onPress={() => {
              setSearchText('');
              setFilteredVoices(voices);
            }}
            style={styles.clearSearchButton}
          >
            <Text style={styles.clearSearchButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Voice List */}
      {isLoading ? (
        <View style={styles.centerContainer}>
          <LoadingIndicator visible={true} message="Sesler yükleniyor..." />
        </View>
      ) : filteredVoices.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            {searchText ? 'Ses bulunamadı' : 'Ses listesi boş'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredVoices}
          renderItem={renderVoiceItem}
          keyExtractor={(item) => item.voice_id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}

      <LoadingIndicator visible={isLoading} message="Yükleniyor..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_LIGHT,
  },
  header: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  title: {
    fontSize: FONTS.SIZE.XXL,
    fontWeight: FONTS.WEIGHT.BOLD,
    color: COLORS.TEXT_LIGHT,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: BORDER_RADIUS.MD,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    fontSize: FONTS.SIZE.BASE,
    color: COLORS.TEXT_LIGHT,
  },
  clearSearchButton: {
    marginLeft: SPACING.SM,
    padding: SPACING.SM,
  },
  clearSearchButtonText: {
    fontSize: FONTS.SIZE.LG,
    color: COLORS.TEXT_LIGHT_SECONDARY,
  },
  listContent: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
  },
  voiceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.BG_LIGHT_SECONDARY,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.MD,
    marginBottom: SPACING.MD,
    borderWidth: 2,
    borderColor: COLORS.BORDER_LIGHT,
    ...SHADOWS.LIGHT,
  },
  voiceCardSelected: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.BG_LIGHT,
  },
  voiceInfo: {
    flex: 1,
  },
  voiceName: {
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.TEXT_LIGHT,
  },
  voiceCategory: {
    fontSize: FONTS.SIZE.SM,
    color: COLORS.TEXT_LIGHT_SECONDARY,
    marginTop: SPACING.XS,
  },
  labelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.SM,
    gap: SPACING.XS,
  },
  label: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.SM,
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.XS,
  },
  labelText: {
    fontSize: FONTS.SIZE.XS,
    color: COLORS.BG_LIGHT,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
  },
  voiceActions: {
    flexDirection: 'row',
    gap: SPACING.SM,
    marginLeft: SPACING.MD,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.MD,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.LIGHT,
  },
  previewButton: {
    backgroundColor: COLORS.INFO,
  },
  selectButton: {
    backgroundColor: COLORS.BORDER_LIGHT,
  },
  selectButtonActive: {
    backgroundColor: COLORS.SUCCESS,
  },
  actionButtonText: {
    fontSize: FONTS.SIZE.LG,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONTS.SIZE.BASE,
    color: COLORS.TEXT_LIGHT_SECONDARY,
  },
});

export default VoiceLibraryScreen;

