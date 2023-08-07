import axios from 'axios';
// import { useAtom } from 'jotai';
// import { useQuery, QueryClient } from 'react-query';
// import { getAuthToken, removeAuthToken } from './token.utils';


const api = axios.create({
    baseURL: 'https://skill.zhasapp.com/',
    timeout: 150000000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // api.interceptors.request.use(
  //   (config) => {
  //     const token = getAuthToken();
  //     //@ts-ignore
  //     config.headers = {
  //       ...config.headers,
  //       Authorization: `Bearer ${token ? token : ''}`,
  //     };
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  // api.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (
  //       (error.response && error.response.status === 401) ||
  //       (error.response && error.response.status === 403) ||
  //       (error.response &&
  //         error.response.data.message === 'ZHASAPP_ERROR.NOT_AUTHORIZED')
  //     ) {
  //       removeAuthToken();
  //     }
  //     return Promise.reject(error);
  //   }
  // );

// AUTH

export async function login(
  email: string, 
  password: string
): Promise<any> {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 400) {
        throw new Error('Failed to log in. Invalid credentials or missing fields.');
      } else {
        throw new Error('Failed to log in. Please try again later.');
      }
    } catch (error) {
      throw new Error('Failed to log in. Please check your internet connection.');
    }
  }

  export async function register(
    accountType: string,
    email: string,
    country: string,
    fullname: string,
    password: string,
    timeZone?: string,
    additionalData?: string,
  ): Promise<void> {
    try {
      const response = await api.post('/register', null, {
        params: {
          accountType,
          email,
          country,
          fullname,
          password,
          timeZone,
          additionalData
        },
      });
  
      if (response.status !== 201) {
        throw new Error('Failed to register user. Please try again later.');
      }
    } catch (error) {
      const errorObj = error as { response?: { status: number } };
  
      if (errorObj.response?.status === 400) {
        throw new Error('Bad Request. Please check your registration data.');
      } else {
        throw new Error('Failed to register user. Please check your internet connection.');
      }
    }
  }
  
  export async function logout(
    id: string
  ): Promise<void> {
    try {
      const response = await api.post('/logout', {
        id,
      });
  
      if (response.status !== 200) {
        throw new Error('Failed to log out. Please try again later.');
      }
    } catch (error) {
      throw new Error('Failed to log out. Please check your internet connection.');
    }
  }
  