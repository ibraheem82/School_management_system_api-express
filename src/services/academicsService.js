import api from './api';

export const academicsService = {
  // Academic Years
  getAcademicYears: async () => {
    const response = await api.get('/academic-years');
    return response.data;
  },

  createAcademicYear: async (data) => {
    const response = await api.post('/academic-years', data);
    return response.data;
  },

  updateAcademicYear: async (id, data) => {
    const response = await api.put(`/academic-years/${id}`, data);
    return response.data;
  },

  deleteAcademicYear: async (id) => {
    await api.delete(`/academic-years/${id}`);
  },

  // Academic Terms
  getAcademicTerms: async () => {
    const response = await api.get('/academic-terms');
    return response.data;
  },

  createAcademicTerm: async (data) => {
    const response = await api.post('/academic-terms', data);
    return response.data;
  },

  // Class Levels
  getClassLevels: async () => {
    const response = await api.get('/class-levels');
    return response.data;
  },

  createClassLevel: async (data) => {
    const response = await api.post('/class-levels', data);
    return response.data;
  },

  // Year Groups
  getYearGroups: async () => {
    const response = await api.get('/year-groups');
    return response.data;
  },

  createYearGroup: async (data) => {
    const response = await api.post('/year-groups', data);
    return response.data;
  },

  // Programs
  getPrograms: async () => {
    const response = await api.get('/programs');
    return response.data;
  },

  createProgram: async (data) => {
    const response = await api.post('/programs', data);
    return response.data;
  },

  // Subjects
  getSubjects: async () => {
    const response = await api.get('/subjects');
    return response.data;
  },

  createSubject: async (data) => {
    const response = await api.post('/subjects', data);
    return response.data;
  },
};