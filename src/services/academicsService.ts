import api from './api';
import { AcademicYear, AcademicTerm, ClassLevel, YearGroup, Program, Subject } from '../types';

export const academicsService = {
  // Academic Years
  getAcademicYears: async (): Promise<AcademicYear[]> => {
    const response = await api.get('/academics/academicYear');
    return response.data;
  },

  createAcademicYear: async (data: Partial<AcademicYear>): Promise<AcademicYear> => {
    const response = await api.post('/academics/academicYear', data);
    return response.data;
  },

  updateAcademicYear: async (id: string, data: Partial<AcademicYear>): Promise<AcademicYear> => {
    const response = await api.put(`/academics/academicYear/${id}`, data);
    return response.data;
  },

  deleteAcademicYear: async (id: string): Promise<void> => {
    await api.delete(`/academics/academicYear/${id}`);
  },

  // Academic Terms
  getAcademicTerms: async (): Promise<AcademicTerm[]> => {
    const response = await api.get('/academics/academicTerm');
    return response.data;
  },

  createAcademicTerm: async (data: Partial<AcademicTerm>): Promise<AcademicTerm> => {
    const response = await api.post('/academics/academicTerm', data);
    return response.data;
  },

  // Class Levels
  getClassLevels: async (): Promise<ClassLevel[]> => {
    const response = await api.get('/academics/classLevel');
    return response.data;
  },

  createClassLevel: async (data: Partial<ClassLevel>): Promise<ClassLevel> => {
    const response = await api.post('/academics/classLevel', data);
    return response.data;
  },

  // Year Groups
  getYearGroups: async (): Promise<YearGroup[]> => {
    const response = await api.get('/academics/yearGroup');
    return response.data;
  },

  createYearGroup: async (data: Partial<YearGroup>): Promise<YearGroup> => {
    const response = await api.post('/academics/yearGroup', data);
    return response.data;
  },

  // Programs
  getPrograms: async (): Promise<Program[]> => {
    const response = await api.get('/academics/program');
    return response.data;
  },

  createProgram: async (data: Partial<Program>): Promise<Program> => {
    const response = await api.post('/academics/program', data);
    return response.data;
  },

  // Subjects
  getSubjects: async (): Promise<Subject[]> => {
    const response = await api.get('/academics/subject');
    return response.data;
  },

  createSubject: async (data: Partial<Subject>): Promise<Subject> => {
    const response = await api.post('/academics/subject', data);
    return response.data;
  },
};