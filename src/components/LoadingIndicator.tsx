import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { COLORS, SPACING, FONTS } from '../styles/theme';

interface LoadingIndicatorProps {
  visible: boolean;
  message?: string;
  size?: 'small' | 'large';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  visible,
  message = 'Yükleniyor...',
  size = 'large',
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size={size} color={COLORS.PRIMARY} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: COLORS.BG_LIGHT,
    borderRadius: 12,
    padding: SPACING.XL,
    alignItems: 'center',
    minWidth: 150,
  },
  message: {
    marginTop: SPACING.MD,
    fontSize: FONTS.SIZE.BASE,
    color: COLORS.TEXT_LIGHT,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
  },
});

export default LoadingIndicator;

