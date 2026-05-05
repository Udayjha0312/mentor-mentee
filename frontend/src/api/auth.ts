import api from './api';
import { AuthResponse } from '../types';

export const signup = async (payload: { name: string; email: string; password: string; organizationName: string }) => {
  const response = await api.post<{ success: boolean; data: AuthResponse }>('/auth/signup', payload);
  return response.data.data;
};

export const login = async (payload: { email: string; password: string }) => {
  const response = await api.post<{ success: boolean; data: AuthResponse }>('/auth/login', payload);
  return response.data.data;
};

export const demoLogin = async () => {
  const response = await api.post<{ success: boolean; data: AuthResponse }>('/auth/demo-login');
  return response.data.data;
};

export const fetchMe = async () => {
  const response = await api.get<{ success: boolean; data: any }>('/auth/me');
  return response.data.data;
};
