import {LoginRequest} from '@utils/types/auth';
import axios from 'axios';
import {AUTH_API} from '@env';

const Headers = {
  'Content-Type': 'application/json',
  'FSCC-PLATFORM': 'android',
  'FSCC-PLATFORM-VERSION': '14.0',
};

axios.defaults.headers.common = {...axios.defaults.headers.common, ...Headers};

export const login = async (data: LoginRequest) => {
  return await axios.post(`${AUTH_API}/auth`, data);
};

export const logout = async () => {
  return await axios.post(`${AUTH_API}/logout`);
};
