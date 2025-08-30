import api from './api';

export const examService = {
  // Exams
  getExams: async () => {
    const response = await api.get('/exams');
    return response.data;
  },

  getExam: async (id) => {
    const response = await api.get(`/exams/${id}`);
    return response.data;
  },

  createExam: async (data) => {
    const response = await api.post('/exams', data);
    return response.data;
  },

  updateExam: async (id, data) => {
    const response = await api.put(`/exams/${id}`, data);
    return response.data;
  },

  deleteExam: async (id) => {
    await api.delete(`/exams/${id}`);
  },

  publishExam: async (id) => {
    const response = await api.patch(`/exams/${id}/publish`);
    return response.data;
  },

  unpublishExam: async (id) => {
    const response = await api.patch(`/exams/${id}/unpublish`);
    return response.data;
  },

  // Questions
  getQuestions: async (examId) => {
    const response = await api.get(`/exams/${examId}/questions`);
    return response.data;
  },

  createQuestion: async (examId, data) => {
    const response = await api.post(`/exams/${examId}/questions`, data);
    return response.data;
  },

  updateQuestion: async (examId, questionId, data) => {
    const response = await api.put(`/exams/${examId}/questions/${questionId}`, data);
    return response.data;
  },

  deleteQuestion: async (examId, questionId) => {
    await api.delete(`/exams/${examId}/questions/${questionId}`);
  },

  // Student Exam Operations
  writeExam: async (examId, answers) => {
    const response = await api.post(`/staff/student/exam/${examId}/write`, { answers });
    return response.data;
  },

  getExamResults: async (studentId) => {
    const url = studentId ? `/exam-results?studentId=${studentId}` : '/exam-results';
    const response = await api.get(url);
    return response.data;
  },
};