import {Dimensions} from 'react-native';

export const {width: windowWidth, height: windowHeight} =
  Dimensions.get('window');

export const palette = {
  gradient1: '#2575FC',
  gradient2: '#6A11CB',
  primary: '#286EE6',
  primaryText: '#151D36',
  disabledButton: '#EBEFF9',
  blue: '#6B8AB9',
  white: '#FFFFFF',
  border: '#D0D5DD',
  darkGrey: '#78828B',
  red: '#FF0000',
  dark: '#000000',
  languageSwitchBorder: 'rgba(255, 255, 255, 0.54)',
};

export const fonts = {
  Inter_regular_400: 'Inter-Regular',
  Inter_SemiBold_600: 'Inter-SemiBold',
  Inter_Medium_500: 'Inter-Medium',
};
