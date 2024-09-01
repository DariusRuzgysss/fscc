import {palette} from '@utils/styles';
import {Eye, EyeOff} from 'assets';
import React, {memo, useCallback, useMemo, useState} from 'react';

//Libraries
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {TextInput, Text} from 'react-native-paper';

type Props = {
  name: string;
  placeHolderText?: string;
  secureTextEntry?: boolean;
};

export default memo(({name, placeHolderText, secureTextEntry}: Props) => {
  const {t} = useTranslation();
  const title = useMemo(
    () => placeHolderText && t(placeHolderText),
    [placeHolderText, t],
  );
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const [passwordVisible, setPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible(prev => !prev);
  }, []);

  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={title}
            label={title}
            secureTextEntry={passwordVisible}
            mode="outlined"
            style={styles.input}
            placeholderTextColor={palette.darkGrey}
            theme={{
              colors: {
                primary: palette.border,
                placeholder: palette.darkGrey,
                text: palette.primary,
                background: palette.white,
              },
              roundness: 6,
            }}
            right={
              secureTextEntry && (
                <TextInput.Icon
                  icon={passwordVisible ? Eye : EyeOff}
                  onPress={togglePasswordVisibility}
                />
              )
            }
          />
        )}
        name={name}
      />
      {errors[name]?.message && (
        <View style={styles.errorView}>
          <Text style={styles.error}>{errors[name]?.message as string}</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    height: 48,
  },
  errorView: {
    marginTop: 5,
    width: '100%',
  },
  error: {
    color: palette.red,
  },
});
