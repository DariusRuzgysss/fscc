import {fonts, palette} from '@utils/styles';
import React, {memo} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  TextStyle,
  View,
} from 'react-native';

//Libraries
import {useTranslation} from 'react-i18next';

type Props = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  textStyle?: TextStyle;
};

export default memo(
  ({style, onPress, loading, disabled = false, textStyle, text}: Props) => {
    const {t} = useTranslation();
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={StyleSheet.flatten([
          styles.styles,
          (loading || disabled) && styles.disabled,
          style,
        ])}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              {color: disabled ? palette.blue : palette.white},
              textStyle,
            ]}>
            {t(text)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  styles: {
    width: '100%',
    height: 48,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.primary,
  },
  textContainer: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: palette.disabledButton,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.Inter_Medium_500,
  },
});
