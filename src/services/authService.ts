import api from './api';
import { AuthResponse } from '../types';

export const authService = {
  login: async (email: string, password: string, role: 'admin' | 'teacher' | 'student'): Promise<AuthResponse> => {
    const endpoints = {
      admin: '/staff/adminRouter/login',
      teacher: '/staff/teachers/login',
      student: '/staff/student/login',
    };

    const response = await api.post(endpoints[role], { email, password });
    return response.data;
  },
};