import api from './api';
import { User } from '../types';

export const userService = {
  // Staff Management
  getAdmins: async (): Promise<User[]> => {
    const response = await api.get('/staff/admins');
    return response.data;
  },

  getTeachers: async (): Promise<User[]> => {
    const response = await api.get('/staff/teachers');
    return response.data;
  },

  getStudents: async (): Promise<User[]> => {
    const response = await api.get('/staff/students');
    return response.data;
  },

  createAdmin: async (data: Partial<User>): Promise<User> => {
    const response = await api.post('/staff/admins', data);
    return response.data;
  },

  createTeacher: async (data: Partial<User>): Promise<User> => {
    const response = await api.post('/staff/teachers', data);
    return response.data;
  },

  createStudent: async (data: Partial<User>): Promise<User> => {
    const response = await api.post('/staff/students', data);
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  suspendUser: async (id: string): Promise<User> => {
    const response = await api.patch(`/users/${id}/suspend`);
    return response.data;
  },

  withdrawStudent: async (id: string): Promise<User> => {
    const response = await api.patch(`/students/${id}/withdraw`);
    return response.data;
  },

  // Profile Management
  getProfile: async (): Promise<User> => {
    const response = await api.get('/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.put('/profile', data);
    return response.data;
  },
};