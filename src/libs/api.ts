import axios from 'axios';
import { Profile } from '../data-types/user';

axios.interceptors.request.use(
  (config) => {
    const prefix = window.blocklet ? window.blocklet.prefix : '/';
    config.baseURL = prefix || '';
    config.timeout = 200000;

    return config;
  },
  (error) => Promise.reject(error)
);

export const getProfile = async () => {
  const result = await axios.get('/api/profile');
  return result.data;
};

export const modifyProfile = async (profile: Profile) => {
  const result = await axios.post('/api/profile', profile);
  return result.data
};

export default axios;
