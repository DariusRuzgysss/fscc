import React, {memo} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Logo, OMS_Logo, Rounded_Ornament, Rounded_Arrow_Big} from 'assets';
import {palette} from '@utils/styles';

//Libraries
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import LanguageSwitch from './LanguageSwitch';

type Props = {
  children: React.ReactNode;
};

export default memo(({children}: Props) => {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[palette.gradient1, palette.gradient2]}
      style={styles.container}>
      <View style={styles.imagesContainer}>
        <Image source={Rounded_Arrow_Big} style={{top: top - 10}} />
        <Image source={Rounded_Ornament} style={{top: top + 58}} />
      </View>
      <View style={[styles.languageSwitch, {top: top + 37, right: 24}]}>
        <LanguageSwitch />
      </View>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.content,
            {marginTop: top + 200, paddingBottom: bottom + 24},
          ]}>
          <View style={[styles.ellipse]} />
          <Image source={OMS_Logo} style={[styles.omsLogo]} />
          <View style={styles.childrenView}>{children}</View>
          <Image source={Logo} style={styles.logo} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  content: {
    position: 'relative',
    paddingHorizontal: 24,
    paddingTop: 100,
    flex: 1,
  },
  childrenView: {
    flex: 1,
    paddingTop: 72,
  },
  omsLogo: {
    alignSelf: 'center',
  },
  ellipse: {
    width: 815,
    height: 815,
    borderRadius: 407.5,
    backgroundColor: palette.white,
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
  },
  languageSwitch: {
    position: 'absolute',
  },
  logo: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
