import {useAuth} from '@utils/contexts/auth';
import React, {memo, useCallback, useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronDown, LithuanianFlag, EnglandFlag} from 'assets';
import {palette} from '@utils/styles';

// Libraries
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';

export default memo(() => {
  const {i18n} = useTranslation();
  const {handleSetLanguage, language} = useAuth();
  const rotation = useSharedValue(0);

  const styleChevronRotation = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  const onSwitch = useCallback(() => {
    const lang = language === 'lt' ? 'en' : 'lt';
    i18n.changeLanguage(lang);
    handleSetLanguage(lang);
    rotation.value = withTiming(language === 'lt' ? 90 : 0, {duration: 600});
  }, [language, rotation, handleSetLanguage, i18n]);

  const flagImage = useMemo(() => {
    if (language === 'lt') {
      return LithuanianFlag;
    }
    return EnglandFlag;
  }, [language]);

  return (
    <TouchableOpacity style={styles.container} onPress={onSwitch}>
      <View style={styles.languageContainer}>
        <Image source={flagImage} style={styles.languageImage} />
        <Text style={styles.languageText}>{language.toUpperCase()}</Text>
      </View>
      <Animated.Image source={ChevronDown} style={styleChevronRotation} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderWidth: 1,
    borderColor: palette.languageSwitchBorder,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  languageImage: {
    width: 20,
    height: 20,
  },
  languageText: {
    color: palette.white,
  },
});
