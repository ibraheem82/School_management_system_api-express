import api from './api';

export const userService = {
  // Admin Management
  getAdminProfile: async () => {
    const response = await api.get('/admins/profile');
    return response.data;
  },

  getAdmins: async () => {
    const response = await api.get('/admins');
    return response.data;
  },

  // Teacher Management
  getTeachers: async () => {
    const response = await api.get('/teachers/admin'); // Corrected endpoint
    return response.data;
  },

  // Student Management
  getStudents: async () => {
    const response = await api.get('/students/admin'); // Corrected endpoint
    return response.data;
  },

  createAdmin: async (data) => {
    const response = await api.post('/admins/register', data); // Corrected endpoint for admin registration
    return response.data;
  },

  createTeacher: async (data) => {
    const response = await api.post('/teachers/admin/register', data); // Corrected endpoint for teacher registration
    return response.data;
  },

  createStudent: async (data) => {
    const response = await api.post('/students/admin/register', data); // Corrected endpoint for student registration
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  suspendUser: async (id) => {
    const response = await api.patch(`/users/${id}/suspend`);
    return response.data;
  },

  withdrawStudent: async (id) => {
    const response = await api.patch(`/students/${id}/withdraw`);
    return response.data;
  },

  // Profile Management (General - might need to be role-specific in future)
  getProfile: async () => {
    // This general getProfile might not be used if specific role profiles are preferred
    const response = await api.get('/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    // This general updateProfile might not be used if specific role profiles are preferred
    const response = await api.put('/profile', data);
    return response.data;
  },
};