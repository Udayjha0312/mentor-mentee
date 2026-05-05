import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('mentor-mentee-token'),
  user: localStorage.getItem('mentor-mentee-user') ? JSON.parse(localStorage.getItem('mentor-mentee-user')!) : null,
  setAuth: (token, user) => {
    localStorage.setItem('mentor-mentee-token', token);
    localStorage.setItem('mentor-mentee-user', JSON.stringify(user));
    set({ token, user });
  },
  clearAuth: () => {
    localStorage.removeItem('mentor-mentee-token');
    localStorage.removeItem('mentor-mentee-user');
    set({ token: null, user: null });
  }
}));
