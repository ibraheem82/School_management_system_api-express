import api from './api';
import { Exam, Question, ExamResult } from '../types';

export const examService = {
  // Exams
  getExams: async (): Promise<Exam[]> => {
    const response = await api.get('/exams');
    return response.data;
  },

  getExam: async (id: string): Promise<Exam> => {
    const response = await api.get(`/exams/${id}`);
    return response.data;
  },

  createExam: async (data: Partial<Exam>): Promise<Exam> => {
    const response = await api.post('/exams', data);
    return response.data;
  },

  updateExam: async (id: string, data: Partial<Exam>): Promise<Exam> => {
    const response = await api.put(`/exams/${id}`, data);
    return response.data;
  },

  deleteExam: async (id: string): Promise<void> => {
    await api.delete(`/exams/${id}`);
  },

  publishExam: async (id: string): Promise<Exam> => {
    const response = await api.patch(`/exams/${id}/publish`);
    return response.data;
  },

  unpublishExam: async (id: string): Promise<Exam> => {
    const response = await api.patch(`/exams/${id}/unpublish`);
    return response.data;
  },

  // Questions
  getQuestions: async (examId: string): Promise<Question[]> => {
    const response = await api.get(`/exams/${examId}/questions`);
    return response.data;
  },

  createQuestion: async (examId: string, data: Partial<Question>): Promise<Question> => {
    const response = await api.post(`/exams/${examId}/questions`, data);
    return response.data;
  },

  updateQuestion: async (examId: string, questionId: string, data: Partial<Question>): Promise<Question> => {
    const response = await api.put(`/exams/${examId}/questions/${questionId}`, data);
    return response.data;
  },

  deleteQuestion: async (examId: string, questionId: string): Promise<void> => {
    await api.delete(`/exams/${examId}/questions/${questionId}`);
  },

  // Student Exam Operations
  writeExam: async (examId: string, answers: any[]): Promise<ExamResult> => {
    const response = await api.post(`/staff/student/exam/${examId}/write`, { answers });
    return response.data;
  },

  getExamResults: async (studentId?: string): Promise<ExamResult[]> => {
    const url = studentId ? `/exam-results?studentId=${studentId}` : '/exam-results';
    const response = await api.get(url);
    return response.data;
  },
};