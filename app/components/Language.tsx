import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ChevronDown} from 'assets';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';
import {useAuth} from '@utils/contexts/localStorage';

export default memo(() => {
  const {accessToken, language, setLanguage} = useAuth();
  return (
    <View style={styles.container}>
      <Text>Language</Text>
      <Image source={ChevronDown} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
});
