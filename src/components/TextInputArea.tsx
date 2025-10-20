import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS } from '../styles/theme';

interface TextInputAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  onClear?: () => void;
  editable?: boolean;
}

const TextInputArea: React.FC<TextInputAreaProps> = ({
  value,
  onChangeText,
  placeholder = 'Metin girin veya konuşmaya başlayın...',
  maxLength = 1000,
  onClear,
  editable = true,
}) => {
  const characterCount = value.length;
  const isNearLimit = characterCount > maxLength * 0.8;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Metin Alanı</Text>
        <Text style={[
          styles.characterCount,
          isNearLimit && styles.characterCountWarning,
        ]}>
          {characterCount} / {maxLength}
        </Text>
      </View>
      
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.TEXT_LIGHT_SECONDARY}
        multiline
        maxLength={maxLength}
        editable={editable}
        textAlignVertical="top"
      />

      {value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClear}
          activeOpacity={0.7}
        >
          <Text style={styles.clearButtonText}>🗑️ Temizle</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.MD,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.SM,
  },
  label: {
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.TEXT_LIGHT,
  },
  characterCount: {
    fontSize: FONTS.SIZE.SM,
    color: COLORS.TEXT_LIGHT_SECONDARY,
  },
  characterCountWarning: {
    color: COLORS.WARNING,
    fontWeight: FONTS.WEIGHT.BOLD,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: BORDER_RADIUS.MD,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    fontSize: FONTS.SIZE.BASE,
    color: COLORS.TEXT_LIGHT,
    backgroundColor: COLORS.BG_LIGHT,
    minHeight: 120,
    maxHeight: 200,
  },
  clearButton: {
    marginTop: SPACING.SM,
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.MD,
    backgroundColor: COLORS.ERROR,
    borderRadius: BORDER_RADIUS.MD,
    alignSelf: 'flex-end',
  },
  clearButtonText: {
    color: COLORS.BG_LIGHT,
    fontSize: FONTS.SIZE.SM,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
  },
});

export default TextInputArea;

