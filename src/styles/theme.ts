export const COLORS = {
  PRIMARY: '#6366F1',
  PRIMARY_DARK: '#4F46E5',
  SECONDARY: '#EC4899',
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#3B82F6',
  
  // Backgrounds
  BG_LIGHT: '#FFFFFF',
  BG_DARK: '#1F2937',
  BG_LIGHT_SECONDARY: '#F3F4F6',
  BG_DARK_SECONDARY: '#374151',
  
  // Text
  TEXT_LIGHT: '#1F2937',
  TEXT_DARK: '#F9FAFB',
  TEXT_LIGHT_SECONDARY: '#6B7280',
  TEXT_DARK_SECONDARY: '#D1D5DB',
  
  // Borders
  BORDER_LIGHT: '#E5E7EB',
  BORDER_DARK: '#4B5563',
  
  // Shadows
  SHADOW: '#000000',
};

export const FONTS = {
  FAMILY: {
    REGULAR: 'System',
    BOLD: 'System',
    SEMI_BOLD: 'System',
  },
  SIZE: {
    XS: 12,
    SM: 14,
    BASE: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    XXXL: 32,
  },
  WEIGHT: {
    LIGHT: '300' as any,
    NORMAL: '400' as any,
    SEMI_BOLD: '600' as any,
    BOLD: '700' as any,
  },
};

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 20,
  XXL: 24,
  XXXL: 32,
};

export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  FULL: 9999,
};

export const SHADOWS = {
  LIGHT: {
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  MEDIUM: {
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5.46,
    elevation: 8,
  },
  HEAVY: {
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 7.49,
    elevation: 12,
  },
};

export const LIGHT_THEME = {
  colors: {
    primary: COLORS.PRIMARY,
    background: COLORS.BG_LIGHT,
    surface: COLORS.BG_LIGHT_SECONDARY,
    text: COLORS.TEXT_LIGHT,
    textSecondary: COLORS.TEXT_LIGHT_SECONDARY,
    border: COLORS.BORDER_LIGHT,
    error: COLORS.ERROR,
    success: COLORS.SUCCESS,
    warning: COLORS.WARNING,
  },
};

export const DARK_THEME = {
  colors: {
    primary: COLORS.PRIMARY,
    background: COLORS.BG_DARK,
    surface: COLORS.BG_DARK_SECONDARY,
    text: COLORS.TEXT_DARK,
    textSecondary: COLORS.TEXT_DARK_SECONDARY,
    border: COLORS.BORDER_DARK,
    error: COLORS.ERROR,
    success: COLORS.SUCCESS,
    warning: COLORS.WARNING,
  },
};

