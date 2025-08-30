import api from './api';

export const authService = {
  login: async (email, password, role) => {
    const endpoints = {
      admin: '/admins/login',
      teacher: '/teachers/login',
      student: '/students/login',
    };

    const response = await api.post(endpoints[role], { email, password });
    return response.data;
  },
};