import React, {memo, useCallback} from 'react';
import {Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import {SCREEN_NAMES} from '@utils/constants';
import {ScreenProps} from '@utils/types/navigation';
import {BackgroundWrapper, Button, Input} from 'components';
import {LoginRequest, LoginForm} from '@utils/types/auth';
import {useAuth} from '@utils/contexts/auth';

//Libraries
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation} from '@tanstack/react-query';
import {login} from '@utils/helpers/auth';

const LoginSchema = (t: any) =>
  yup.object().shape({
    email: yup
      .string()
      .required(t('errorMessages.emailIsRequired'))
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        t('errorMessages.emailIsInvalid'),
      ),
    password: yup.string().required(t('errorMessages.passwordIsRequired')),
  });

const defaultValues = {
  email: '',
  password: '',
};

export default memo(({}: ScreenProps<SCREEN_NAMES.LOGIN>) => {
  const {t} = useTranslation();
  const {handleSetAuth, handleSetEmail} = useAuth();

  const methods = useForm<LoginForm>({
    resolver: yupResolver(LoginSchema(t)),
    defaultValues,
    mode: 'onBlur',
  });

  const mutationLogin = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (response, request) => {
      handleSetEmail(request.userName);
      handleSetAuth(response.data);
      methods.reset(defaultValues);
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });

  const onSubmit = useCallback(
    (formValues: LoginForm) => {
      Keyboard.dismiss();
      mutationLogin.mutate({
        userName: formValues.email,
        password: formValues.password,
      });
    },
    [mutationLogin],
  );

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <BackgroundWrapper>
        <FormProvider {...methods}>
          <View style={styles.inputsContainer}>
            <Input name="email" placeHolderText="labels.email" />
            <Input
              name="password"
              secureTextEntry={true}
              placeHolderText="labels.password"
            />
            <Button
              onPress={methods.handleSubmit(onSubmit)}
              text="buttons.login"
              disabled={!methods.formState.isValid}
            />
          </View>
        </FormProvider>
      </BackgroundWrapper>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  inputsContainer: {
    gap: 20,
  },
});
