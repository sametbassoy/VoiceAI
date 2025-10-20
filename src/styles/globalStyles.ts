import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from './theme';

export const globalStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_LIGHT,
  },
  containerDark: {
    flex: 1,
    backgroundColor: COLORS.BG_DARK,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.LG,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Text
  heading1: {
    fontSize: FONTS.SIZE.XXXL,
    fontWeight: FONTS.WEIGHT.BOLD,
    color: COLORS.TEXT_LIGHT,
  },
  heading2: {
    fontSize: FONTS.SIZE.XXL,
    fontWeight: FONTS.WEIGHT.BOLD,
    color: COLORS.TEXT_LIGHT,
  },
  heading3: {
    fontSize: FONTS.SIZE.XL,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.TEXT_LIGHT,
  },
  body: {
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.NORMAL,
    color: COLORS.TEXT_LIGHT,
  },
  bodySmall: {
    fontSize: FONTS.SIZE.SM,
    fontWeight: FONTS.WEIGHT.NORMAL,
    color: COLORS.TEXT_LIGHT_SECONDARY,
  },
  
  // Buttons
  button: {
    paddingHorizontal: SPACING.LG,
    paddingVertical: SPACING.MD,
    borderRadius: BORDER_RADIUS.MD,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.LIGHT,
  },
  buttonPrimary: {
    backgroundColor: COLORS.PRIMARY,
  },
  buttonSecondary: {
    backgroundColor: COLORS.SECONDARY,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: FONTS.SIZE.BASE,
    fontWeight: FONTS.WEIGHT.SEMI_BOLD,
    color: COLORS.BG_LIGHT,
  },
  
  // Input
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: BORDER_RADIUS.MD,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    fontSize: FONTS.SIZE.BASE,
    color: COLORS.TEXT_LIGHT,
    backgroundColor: COLORS.BG_LIGHT,
  },
  inputFocused: {
    borderColor: COLORS.PRIMARY,
  },
  
  // Cards
  card: {
    backgroundColor: COLORS.BG_LIGHT_SECONDARY,
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.LG,
    marginVertical: SPACING.MD,
    ...SHADOWS.LIGHT,
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.BORDER_LIGHT,
    marginVertical: SPACING.MD,
  },
  
  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Flex
  flex1: {
    flex: 1,
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

