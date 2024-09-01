import {useMutation} from '@tanstack/react-query';
import {SCREEN_NAMES} from '@utils/constants';
import {useAuth} from '@utils/contexts/auth';
import {logout} from '@utils/helpers/auth';
import {fonts, palette} from '@utils/styles';
import {ScreenProps} from '@utils/types/navigation';
import {BackgroundWrapper, Button} from 'components';
import React, {memo, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';

//Libraries
import {useTranslation} from 'react-i18next';

export default memo(({}: ScreenProps<SCREEN_NAMES.PROFILE>) => {
  const {t} = useTranslation();
  const {handleSetAuth, email} = useAuth();

  const mutationLogout = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      handleSetAuth(null);
    },
    onError: error => {
      console.error('Login failed:', error);
      // toast place
    },
  });

  const handleLogout = useCallback(async () => {
    mutationLogout.mutate();
  }, [mutationLogout]);

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.label}>{t('labels.email')}:</Text>
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <Button text="buttons.logout" onPress={handleLogout} />
    </BackgroundWrapper>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: palette.dark,
    fontFamily: fonts.Inter_SemiBold_600,
  },
  emailText: {
    flexShrink: 1,
    fontSize: 16,
    color: palette.primaryText,
    fontFamily: fonts.Inter_regular_400,
  },
});
