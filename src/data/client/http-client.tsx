import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
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
  //       (error.response && error.response.status === 403) 
  //     ) {
  //       removeAuthToken();
  //     }
  //     return Promise.reject(error);
  //   }
  // );

// AUTH

// export async function login(
//   email: string, 
//   password: string
// ): Promise<any> {
//     try {
//       const response = await api.post('/login', {
//         email,
//         password,
//       });
  
//       if (response.status === 200) {
//         return response.data;
//       } else if (response.status === 400) {
//         throw new Error('Failed to log in. Invalid credentials or missing fields.');
//       } else {
//         throw new Error('Failed to log in. Please try again later.');
//       }
//     } catch (error) {
//       throw new Error('NNN Failed to log in. Please check your internet connection.');
//     }
//   }

        
      export const login = (email: string, password: string) => {

          const [error, setError] = useState({errorEmail:'', errorPassword: ''}),
                [success, setSuccess] = useState('');

          if (!email || !password) {
            Alert.alert('Please enter all the required fields');
          } else {
            api
              .post('/login', { email, password })
              .then(response => {
                if (response.data.status) {
                  setError({
                    errorEmail: '', 
                    errorPassword: '',
                  });
                  setSuccess('Login successful');
                } else {
                  console.log(response.data.messages);
                  const errorEmailMsg = response.data.messages.email
                    ? response.data.messages.email[0]
                    : '';
                  const errorPassMsg = response.data.messages.password
                    ? response.data.messages.password[0]
                    : '';
      
                  setError({
                    errorEmail: errorEmailMsg,
                    errorPassword: errorPassMsg,
                  });
                }
              })
              .catch(e => console.log(e.message));
          }
        };

  // export async function register(
  //   email: string,
  //   password: string,
  //   accountType?: string,
  //   country?: string,
  //   fullname?: string,
  //   timeZone?: string,
  //   additionalData?: string,
  // ): Promise<void> {
  //   try {
  //     const response = await api.post('/register', null, {
  //       params: {
  //         accountType,
  //         email,
  //         country,
  //         fullname,
  //         password,
  //         timeZone,
  //         additionalData
  //       },
  //     });
  
  //     if (response.status !== 201) {
  //       throw new Error('Failed to register user. Please try again later.');
  //     }
  //   } catch (error) {
  //     const errorObj = error as { response?: { status: number } };
  
  //     if (errorObj.response?.status === 400) {
  //       throw new Error('Bad Request. Please check your registration data.');
  //     } else {
  //       throw new Error('NNN Failed to register user. Please check your internet connection.');
  //     }
  //   }
  // }

  export const register = (email: string, password: string, confirmPassword: string) => {

    const [error, setError] = useState({errorEmail:'', errorPassword: ''}),
          [success, setSuccess] = useState('');

    if (!email || !password && password == confirmPassword) {
      Alert.alert('Please enter all the required fields');
    } else {
      api
        .post('/register', { email, password })
        .then(response => {
          if (response.data.status) {
            setError({
              errorEmail: '', 
              errorPassword: '',
            });
            setSuccess('Registration successful');
          } else {
            console.log(response.data.messages);
            const errorEmailMsg = response.data.messages.email
              ? response.data.messages.email[0]
              : '';
            const errorPassMsg = response.data.messages.password
              ? response.data.messages.password[0]
              : '';

            setError({
              errorEmail: errorEmailMsg,
              errorPassword: errorPassMsg,
            });
          }
        })
        .catch(e => console.log(e.message));
    }

    // return error, success;
  };
  
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
  