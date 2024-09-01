import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

//Libraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from '@utils/types/auth';

type AuthContextType = {
  auth: Auth | null;
  language: string;
  email: string;
  handleSetAuth: (auth: Auth | null) => Promise<void>;
  handleSetLanguage: (language: string) => Promise<void>;
  handleSetEmail: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [language, setLanguage] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const loadStorageData = async () => {
      const storedAuth = await AsyncStorage.getItem('auth');
      const storedLanguage = await AsyncStorage.getItem('language');
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedAuth) {
        setAuth(JSON.parse(storedAuth)); // cause API returns accessToken as unknown type and impossible to get it from object
      }
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    loadStorageData();
  }, []);

  const handleSetAuth = useCallback(async (authObject: Auth | null) => {
    setAuth(authObject);
    if (authObject === null) {
      await AsyncStorage.removeItem('auth');
    } else {
      await AsyncStorage.setItem('auth', JSON.stringify(authObject)); // cause API returns accessToken as unknown type and impossible to get it from object
    }
  }, []);

  const handleSetLanguage = useCallback(async (lang: string) => {
    setLanguage(lang);
    await AsyncStorage.setItem('language', lang);
  }, []);

  const handleSetEmail = useCallback(async (emailVal: string) => {
    setEmail(emailVal);
    await AsyncStorage.setItem('email', emailVal);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        language,
        email,
        handleSetAuth,
        handleSetLanguage,
        handleSetEmail,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
