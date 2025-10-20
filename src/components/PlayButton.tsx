import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, FONTS, BORDER_RADIUS, SHADOWS } from '../styles/theme';

interface PlayButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  label?: string;
  icon?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  onPress,
  isLoading = false,
  isDisabled = false,
  label = '🔊 Metni Oku',
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDisabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={isLoading || isDisabled}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={COLORS.BG_LIGHT} />
          <Text style={styles.buttonText}>Hazırlanıyor...</Text>
        </View>
      ) : (
        <Text style={styles.buttonText}>{icon || label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.SUCCESS,
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.LG,
    borderRadius: BORDER_RADIUS.MD,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.LIGHT,
  },
  buttonDisabled: {
    backgroundColor: COLORS.TEXT_LIGHT_SECONDARY,
    opacity: 0.6,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SM,
  },
  buttonText: {
    color: COLORS.BG_LIGHT,
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
  },
});

export default PlayButton;

