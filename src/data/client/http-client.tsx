import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
// import { useAtom } from 'jotai';
// import { useQuery, QueryClient } from 'react-query';
// import { getAuthToken, removeAuthToken } from './token.utils';

import { API_ENDPOINTS } from './endpoints';
import { Config } from '../../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, useMutation } from 'react-query';



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
    // console.log(`${Config.apiUrl}${API_ENDPOINTS.USERS_REGISTER}`);
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
export async function login({ username, password }: LoginData) : Promise<Response> {
    const data = {
        username,
        password,
    };
    // console.log(`${Config.apiUrl}${API_ENDPOINTS.USERS_LOGIN}`);
    const response = await fetch(`${Config.apiUrl}${API_ENDPOINTS.USERS_LOGIN}`, {
        method: "POST",
        headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
        body: JSON.stringify(data),
    })
    if(response.ok){
        const responseData = await response.json();
        await AsyncStorage.setItem('user_login','1');
        await AsyncStorage.setItem('user', JSON.stringify(responseData.user));
    }
    return response
}

export async function userLogin(): Promise<boolean> {
    const value = await AsyncStorage.getItem('user_login');
    return value === '1';
}
  
  export async function userData(): Promise<any[]> {
    const value = await AsyncStorage.getItem('user');
    if (!value || value === '') {
      return [];
    }
    return JSON.parse(value);
}


export const logout = async() => {
    const userAuthToken = await AsyncStorage.getItem('userAuthToken');
    // console.log(`${Config.apiUrl}${API_ENDPOINTS.USERS_LOGOUT}`);
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
    // console.log(`${Config.apiUrl}${API_ENDPOINTS.USERS_FORGOT_PASSWORD}`);
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


function getData (endpoint: string) : Promise<Response> {
    // console.log(`${Config.apiUrl}/api/development${endpoint}`);
    return fetch(`${Config.apiUrl}/api/development${endpoint}`, {
        method: 'GET',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': Config.secret
        },
    })
}
export const fetchData = async (endpoint: string) =>{
    const response = await getData(endpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}

function getWebinarsOfCategory (id: number) : Promise<Response> {
    console.log(`${Config.apiUrl}/api/development${API_ENDPOINTS.CATEGORIES}/${id}${API_ENDPOINTS.WEBINARS}`);
    return fetch(`${Config.apiUrl}/api/development${API_ENDPOINTS.CATEGORIES}/${id}${API_ENDPOINTS.WEBINARS}`, {
        method: 'GET',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': Config.secret
        },
    })
}
export const fetchWebinarsOfCategory = async (id: number) =>{
    const response = await getWebinarsOfCategory(id);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
}

export interface Course {
    rate: string,
    created_at: number,
}