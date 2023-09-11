import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
// import { useAtom } from 'jotai';
// import { useQuery, QueryClient } from 'react-query';
// import { getAuthToken, removeAuthToken } from './token.utils';

import { API_ENDPOINTS } from './endpoints';
import { Config } from '../../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const handleForgotPassword = async () => {
//   const requestData = {
//     username: email, 
//     // Add other fields if needed
//   };

//   if (email === '') {
//     Alert.alert('Missing Email', 'Please enter your email address.');
//     return;
//   }

//   try {
//     const response = await fetch(Config.apiUrl+API_ENDPOINTS.USERS_FORGOT_PASSWORD, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         // 'X-CSRF-TOKEN': csrfToken, // Replace with your CSRF token
//       },
//       body: JSON.stringify(requestData),
//     });

//     if (response.ok) {
//       console.log('Password reset request sent successfully.');
//     } else {
//       console.error('Failed to send password reset request.');
//     }
//   } catch (error) {
//     console.error('Failed to connect to the server');
//   }
// };


// const handleGoogleSignIn = async () => {

//   try {
//     const response = await fetch(Config.apiUrl+API_ENDPOINTS.USERS_GOOGLE, {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         // 'X-CSRF-TOKEN': csrfToken, // Replace with your CSRF token
//       },
//       body: JSON.stringify(requestData),
//     });

//     if (response.ok) {
//       navigation.navigate('App');
//     } else {
//       console.error('Failed to register with Google');
//     }
//   } catch (error) {
//     console.error('Failed to connect to the server');
//   }
// };

interface RegistrationData {
    email: string;
    full_name: string;
    password: string;
    password_confirmation: string;
  }
export function register({ email, full_name, password, password_confirmation }: RegistrationData) : Promise<Response> {
    const data = {
        email,
        full_name,
        password,
        password_confirmation
    };
    console.log(`${Config.apiUrl}${API_ENDPOINTS.USERS_REGISTER}`);
    return fetch(`${Config.apiUrl}${API_ENDPOINTS.USERS_REGISTER}`, {
        method: "POST",
        headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
        body: JSON.stringify(data)
    })
}

interface LoginData {
    username: string;
    password: string;
  }
export function login({ username, password }: LoginData) : Promise<Response> {
    const data = {
        username,
        password,
    };
    console.log(`${Config.apiUrl}${API_ENDPOINTS.USERS_LOGIN}`);
    return fetch(`${Config.apiUrl}${API_ENDPOINTS.USERS_LOGIN}`, {
        method: "POST",
        headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                          // 'X-CSRF-TOKEN': csrfToken, // Replace with your CSRF token
                  },
        body: JSON.stringify(data),
    })
}


export const logout = async() => {
    const userAuthToken = await AsyncStorage.getItem('userAuthToken');
    console.log(`${Config.apiUrl}${API_ENDPOINTS.USERS_LOGOUT}`);
    return fetch(`${Config.apiUrl}${API_ENDPOINTS.USERS_LOGOUT}`, {
        method: "GET",
        headers : {
                    'Authorization': `Bearer ${userAuthToken}`,
                  },
    })
}

 
interface EmailOrPhoneData {
    username: string;
  }
export function forgotPassword({username}: EmailOrPhoneData) : Promise<Response> {
    const data = { username }
    console.log(`${Config.apiUrl}${API_ENDPOINTS.USERS_FORGOT_PASSWORD}`);
    return fetch(`${Config.apiUrl}${API_ENDPOINTS.USERS_FORGOT_PASSWORD}`, {
        method: "POST",
        headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                          // 'X-CSRF-TOKEN': csrfToken, // Replace with your CSRF token
                  },
        body: JSON.stringify(data),
    })
}

// export const register = async () => {
//     const registrationData = {
//       full_name,
//       email,
//       password,
//       password_confirmation,
//     };
//       if (full_name === '' || email === '' || password === '' || password_confirmation === '') {
//           Alert.alert('Missing Fields', 'Please fill in all the required fields.');
//           return;
//       }
//       if (password !== password_confirmation) {
//           Alert.alert('Passwords Mismatch', 'The passwords you entered do not match.');
//           return;
//       }
      
//       console.log('Email:', email);
//       console.log('Password:', password);

//       try {
//         const response = await fetch(Config.apiUrl+API_ENDPOINTS.USERS_REGISTER, {
//           method  : 'POST',
//           headers : {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',
//               // 'X-CSRF-TOKEN': csrfToken, // Replace with your CSRF token
//           },
//           body: JSON.stringify(registrationData),
//       });
//       if (response.ok) {
//         // const data = await response.json();
//         navigation.navigate('Login');
//         // return data;
//       } else {
//         // Handle other status codes or errors
//         throw new Error('Failed to log in');
//       }
//     } catch (error) {
//       // Handle network errors or exceptions
//       throw new Error('Failed to connect to the server');
//     }
//   }


// const handleLogin = async () => {
//     const requestData = {
//       username,
//       password,
//     };

//       if (username === '' || password === '') {
//           Alert.alert('Missing Fields', 'Please fill in all the required fields.');
//           return;
//       }

//       console.log('Username:', username);
//       console.log('Password:', password);

//       try {
//         const response = await fetch(Config.apiUrl+API_ENDPOINTS.USERS_LOGIN, {
//           method  : 'POST',
//           headers : {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',
//               // 'X-CSRF-TOKEN': csrfToken, // Replace with your CSRF token
//           },
//           body: JSON.stringify(requestData),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         await AsyncStorage.setItem('user_login','1');
//         await AsyncStorage.setItem('user',JSON.stringify(data.user));
//         navigation.navigate('App');
//         // return data;
//       } else {
//         // Handle other status codes or errors
//         throw new Error('Failed to log in');
//       }
//     } catch (error) {
//       // Handle network errors or exceptions
//       throw new Error('Failed to connect to the server');
//     }
//   }