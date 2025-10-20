import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../styles/theme';
import { VOICE_TYPES } from '../utils/constants';

interface VoiceSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedType,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ses Seçimi</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedType === VOICE_TYPES.NATIVE && styles.optionSelected,
          ]}
          onPress={() => onSelect(VOICE_TYPES.NATIVE)}
          activeOpacity={0.7}
        >
          <View style={styles.radioButton}>
            {selectedType === VOICE_TYPES.NATIVE && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Standart Ses</Text>
            <Text style={styles.optionSubtitle}>Ücretsiz • Offline</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedType === VOICE_TYPES.ELEVENLABS && styles.optionSelected,
          ]}
          onPress={() => onSelect(VOICE_TYPES.ELEVENLABS)}
          activeOpacity={0.7}
        >
          <View style={styles.radioButton}>
            {selectedType === VOICE_TYPES.ELEVENLABS && (
              <View style={styles.radioButtonInner} />
            )}
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>ElevenLabs</Text>
            <Text style={styles.optionSubtitle}>Premium • Profesyonel</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.MD,
  },
  label: {
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.TEXT_LIGHT,
    marginBottom: SPACING.MD,
  },
  optionsContainer: {
    gap: SPACING.MD,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    borderWidth: 2,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: BORDER_RADIUS.MD,
    backgroundColor: COLORS.BG_LIGHT,
  },
  optionSelected: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.BG_LIGHT_SECONDARY,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.MD,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.PRIMARY,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.TEXT_LIGHT,
  },
  optionSubtitle: {
    fontSize: FONTS.SIZE.SM,
    color: COLORS.TEXT_LIGHT_SECONDARY,
    marginTop: 2,
  },
});

export default VoiceSelector;

