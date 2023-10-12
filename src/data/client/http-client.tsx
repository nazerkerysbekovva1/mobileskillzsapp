import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
// import { useAtom } from 'jotai';
// import { useQuery, QueryClient } from 'react-query';

import { API_ENDPOINTS } from './endpoints';
import { Config } from '../../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { extract } from '../../component/Extract';



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
    const response = await fetch(`${Config.apiUrl}/api/development${API_ENDPOINTS.USERS_LOGIN}`, {
        method: "POST",
        headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': Config.secret
                  },
        body: JSON.stringify(data),
    })
    if(response.ok){
      console.log('Authentication Success')
  }
    return response
}

export async function userLogin(): Promise<boolean> {
    const value = await AsyncStorage.getItem('user_login');
    return value === '1';
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


async function getData (endpoint: string) : Promise<Response> {
    console.log(`${Config.apiUrl}/api/development${endpoint}`);

    const userAuthToken = await AsyncStorage.getItem('userAuthToken');
    const headers: {
      Accept: string;
      'Content-Type': string;
      'x-api-key': string;
      [key: string]: string; 
    } = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': Config.secret,
    };

    if (await userLogin()) {
      headers['Authorization'] = `Bearer ${userAuthToken}`;
    }

    return fetch(`${Config.apiUrl}/api/development${endpoint}`, {
        method: 'GET',
        headers : headers
    })
}
export const fetchData = async (endpoint: string) =>{
    const response = await getData(endpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseText = await response.text();
    const responseJSON = extract(responseText);
    return JSON.parse(responseJSON);
}

async function getWebinarsOfCategory (id: number) : Promise<Response> {
    console.log(`${Config.apiUrl}/api/development${API_ENDPOINTS.CATEGORIES}/${id}${API_ENDPOINTS.WEBINARS}`);

    const userAuthToken = await AsyncStorage.getItem('userAuthToken');
    const headers: {
      Accept: string;
      'Content-Type': string;
      'x-api-key': string;
      [key: string]: string; 
    } = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': Config.secret,
    };

    if (await userLogin()) {
      headers['Authorization'] = `Bearer ${userAuthToken}`;
    }  

    return fetch(`${Config.apiUrl}/api/development${API_ENDPOINTS.CATEGORIES}/${id}${API_ENDPOINTS.WEBINARS}`, {
        method: 'GET',
        headers : headers
    })
}
export const fetchWebinarsOfCategory = async (id: number) =>{
    const response = await getWebinarsOfCategory(id);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const responseJSON = extract(responseText);
    return JSON.parse(responseJSON);
}


export interface CourseData {
    image?: string;
    auth?: boolean;
    can?: {
      view: boolean;
    };
    can_view_error?: null | string;
    id: number;
    status?: string;
    label?: string;
    title?: string;
    type?: string;
    link?: string;
    access_days?: number;
    live_webinar_status?: null | string;
    auth_has_bought?: null | boolean;
    sales?: {
      count: number;
      amount: number;
    };
    is_favorite?: boolean;
    price_string?: string;
    best_ticket_string?: null | string;
    price?: number;
    tax?: number;
    tax_with_discount?: number;
    best_ticket_price?: number;
    discount_percent?: number;
    course_page_tax?: number;
    price_with_discount?: number;
    discount_amount?: number;
    active_special_offer?: null | string;
    duration?: number;
    teacher?: Teacher;
    students_count?: number;
    rate?: string | number;
    rate_type?: {
      content_quality: number;
      instructor_skills: number;
      purchase_worth: number;
      support_quality: number;
    };
    created_at?: number;
    start_date?: null | string;
    purchased_at?: null | string;
    reviews_count?: number;
    points?: null | string;
    progress?: null | string;
    progress_percent?: null | string;
    category?: string;
    capacity?: null | string;
    faqs?: FAQS[];
    comments?: Comment[];
    files_chapters?: Chapter[];
    session_chapters?: Chapter[];
  }

  export interface Teacher  {
    id: number;
    full_name: string;
    role_name: string;
    bio: string;
    offline: number;
    offline_message: null | string;
    verified: number;
    rate: string;
    avatar: string;
    meeting_status: string;
    user_group: null | string;
    address: null | string;
  };

  export interface Comment{
      id?: number;
      status?: string;
      comment_user_type?: string;
      create_at?: number;
      comment?: string;
      blog?: null;
      user?: {
        id?: number;
        full_name?: string;
        role_name?: string;
        bio?: null;
        offline?: number;
        offline_message?: null;
        verified?: number;
        rate?: string | number;
        avatar?: string;
        meeting_status?: string;
        user_group?: null;
        address?: string;
      };
  }
  export interface CourseQuery{
    rate: string;
    created_at: number,
  }

  export interface FAQS{
    id?: number;
    title?: string;
    answer?: string;
    order?: number;
    created_at?: number;
    ubdated_at?: number | null
  }

  export interface File {
    id: number;
    title: string;
    auth_has_read: boolean | null;
    status: string;
    order: number | null;
    downloadable: number;
    accessibility: string;
    description: string;
    storage: string;
    download_link: string;
    auth_has_access: boolean | null;
    user_has_access: boolean;
    file: string;
    volume: string;
    file_type: string;
    is_video: boolean;
    interactive_type: string | null;
    interactive_file_name: string | null;
    interactive_file_path: string | null;
    created_at: number;
    updated_at: number;
  }

export  interface Session {
    id: number;
    title: string;
    auth_has_read: boolean | null;
    user_has_access: boolean;
    is_finished: boolean;
    is_started: boolean;
    status: string;
    order: number | null;
    moderator_secret: string;
    date: number;
    duration: number;
    link: string;
    join_link: string | null;
    can_join: boolean;
    session_api: string;
    zoom_start_link: string | null;
    api_secret: string;
    description: string;
    created_at: number;
    updated_at: number;
    agora_settings: any | null; 
  }
  
export interface Chapter {   //file_chapters and session_chapters
    id: number;
    title: string;
    topics_count: number;
    duration: string;
    status: string;
    order: number | null;
    type: string | null;
    created_at: number;
    textLessons: any[];
    sessions: Session[]; 
    files: File[];
    quizzes: any[]; 
  }

async function getCourse (id: number) : Promise<Response> {
    console.log(`${Config.apiUrl}/api/development${API_ENDPOINTS.COURSES}/${id}`)

    const userAuthToken = await AsyncStorage.getItem('userAuthToken');
    const headers: {
      Accept: string;
      'Content-Type': string;
      'x-api-key': string;
      [key: string]: string; 
    } = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': Config.secret,
    };

    if (await userLogin()) {
      headers['Authorization'] = `Bearer ${userAuthToken}`;
    }  

    return fetch(`${Config.apiUrl}/api/development${API_ENDPOINTS.COURSES}/${id}`, {
        method: 'GET',
        headers : headers
    })
}
export const fetchCourse = async (id: number) =>{
    const response = await getCourse(id);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const responseJSON = extract(responseText);
    return JSON.parse(responseJSON);
}

async function getUserData(endpoint: string) : Promise<Response> {
  const userAuthToken = await AsyncStorage.getItem('userAuthToken');

  console.log(`${Config.apiUrl}/api/development${endpoint}`)
  return fetch(`${Config.apiUrl}/api/development${endpoint}`, {
      method: 'GET',
      headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': Config.secret,
          'Authorization': `Bearer ${userAuthToken}`,
      },
  })
}
export const fetchUserData = async (endpoint: string) =>{
  const response = await getUserData(endpoint);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseText = await response.text();
  const responseJSON = extract(responseText);
  return JSON.parse(responseJSON);
}


export interface UserData {
  id: number;
  full_name: string;
  role_name: string;
  bio: string | null;
  offline: number;
  offline_message: string | null;
  verified: number;
  rate: number;
  avatar: string;
  meeting_status: string;
  user_group: string | null;
  address: string | null;
  status: string;
  email: string;
  mobile: string;
  language: string | null;
  newsletter: boolean;
  public_message: number;
  active_subscription: string | null;
  headline: string | null;
  courses_count: number;
  reviews_count: number;
  appointments_count: number;
  students_count: number;
  followers_count: number;
  following_count: number;
  badges: Badge[];
  students: [];
  followers: [];
  following: [];
  auth_user_is_follower: boolean;
  referral: string | null;
  education: any[]; 
  experience: any[]; 
  occupations: any[]; 
  about: string | null;
  webinars: [];
  meeting: any; 
  organization_teachers: any[]; 
  country_id: number | null;
  province_id: number | null;
  city_id: number | null;
  district_id: number | null;
  account_type: string | null;
  iban: string | null;
  account_id: string | null;
  identity_scan: string | null;
  certificate: string | null;
}

export interface Badge {
  id?: number;
  title?: string;
  type?: string;
  condition?: string;
  image?: string;
  locale?: string;
  description?: string;
  created_at?: number;
}

async function getUserProfile(id: number) : Promise<Response> {
  console.log(`${Config.apiUrl}/api/development${API_ENDPOINTS.USERS}/${id}${API_ENDPOINTS.PROFILE}`)

  const userAuthToken = await AsyncStorage.getItem('userAuthToken');
  const headers: {
    Accept: string;
    'Content-Type': string;
    'x-api-key': string;
    [key: string]: string; 
  } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-api-key': Config.secret,
  };

  if (await userLogin()) {
    headers['Authorization'] = `Bearer ${userAuthToken}`;
  } 

  return fetch(`${Config.apiUrl}/api/development${API_ENDPOINTS.USERS}/${id}${API_ENDPOINTS.PROFILE}`, {
      method: 'GET',
        headers : headers
  })
}
export const fetchUserProfile = async (id: number) =>{
  const response = await getUserProfile(id);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseText = await response.text();
  const responseJSON = extract(responseText);
  return JSON.parse(responseJSON);
}

export async function toggleFavorites (id: number) : Promise<Response> {
  const userAuthToken = await AsyncStorage.getItem('userAuthToken');

  console.log(`${Config.apiUrl}/api/development${API_ENDPOINTS.FAVORITES}${API_ENDPOINTS.FAVORITES_TOGGLE}/${id}`)
  const response = await fetch(`${Config.apiUrl}/api/development${API_ENDPOINTS.FAVORITES}${API_ENDPOINTS.FAVORITES_TOGGLE}/${id}`, {
      method: 'POST',
      headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': Config.secret,
          'Authorization': `Bearer ${userAuthToken}`,
      },
  })
  if(response.ok){
    console.log('toggle "favorite" Success')
  }
    return response
}

export async function toggleFollow ({ id, status }: { id: number; status: boolean }) : Promise<Response> {
  const data = {
    status,
  }
  const userAuthToken = await AsyncStorage.getItem('userAuthToken');

  console.log(`${Config.apiUrl}/api/development${API_ENDPOINTS.PANEL}${API_ENDPOINTS.USERS}/${id}${API_ENDPOINTS.FOLLOW}`)
  const response = await fetch(`${Config.apiUrl}/api/development${API_ENDPOINTS.PANEL}${API_ENDPOINTS.USERS}/${id}${API_ENDPOINTS.FOLLOW}`, {
      method: 'POST',
      headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': Config.secret,
          'Authorization': `Bearer ${userAuthToken}`,
      },
      body: JSON.stringify(data)
  })
  if(response.ok){
    console.log('toggle "follow" Success')
  }
    return response
}

export async function EnrollOnCourse (id: number) : Promise<Response> {

  const userAuthToken = await AsyncStorage.getItem('userAuthToken');

  console.log(`${Config.apiUrl}/api/development${API_ENDPOINTS.PANEL}${API_ENDPOINTS.WEBINARS}/${id}${API_ENDPOINTS.FREE}`)
  const response = await fetch(`${Config.apiUrl}/api/development${API_ENDPOINTS.PANEL}${API_ENDPOINTS.WEBINARS}/${id}${API_ENDPOINTS.FREE}`, {
      method: 'POST',
      headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': Config.secret,
          'Authorization': `Bearer ${userAuthToken}`,
      },
  })
  if(response.ok){
    console.log('Enroll on course is Success')
  }
    return response
}


// item_id = course id, item_name = course type (webinar, course, blog, ..)
export async function postComment ({ item_id, item_name, comment }: { 
    item_id: number; 
    item_name: string;
    comment: string;

  }) : Promise<Response> {
  const data = {
    item_id,
    item_name,
    comment,
  }
  const userAuthToken = await AsyncStorage.getItem('userAuthToken');

  console.log(`${Config.apiUrl}/api/development${API_ENDPOINTS.PANEL}${API_ENDPOINTS.COMMENTS}`)
  const response = await fetch(`${Config.apiUrl}/api/development${API_ENDPOINTS.PANEL}${API_ENDPOINTS.COMMENTS}`, {
      method: 'POST',
      headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': Config.secret,
          'Authorization': `Bearer ${userAuthToken}`,
      },
      body: JSON.stringify(data)
  })
  if(response.ok){
    console.log('Comment sent successfully')
  }
    return response
}

export async function deleteComment (id: number) : Promise<Response> {
  const userAuthToken = await AsyncStorage.getItem('userAuthToken');

  console.log(`${Config.apiUrl}/api/development${API_ENDPOINTS.PANEL}${API_ENDPOINTS.COMMENTS}/${id}`)
  const response = await fetch(`${Config.apiUrl}/api/development${API_ENDPOINTS.PANEL}${API_ENDPOINTS.COMMENTS}/${id}`, {
      method: 'DELETE',
      headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': Config.secret,
          'Authorization': `Bearer ${userAuthToken}`,
      },
  })
  if(response.ok){
    console.log('Deleted comment id: ', id)
  }
    return response
}