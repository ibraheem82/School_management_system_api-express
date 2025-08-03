export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'teacher' | 'student';
  isActive: boolean;
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface AcademicTerm {
  id: string;
  name: string;
  academicYearId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface ClassLevel {
  id: string;
  name: string;
  description?: string;
}

export interface YearGroup {
  id: string;
  name: string;
  classLevelId: string;
  academicYearId: string;
}

export interface Program {
  id: string;
  name: string;
  description?: string;
  duration: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  programId: string;
}

export interface Exam {
  id: string;
  title: string;
  description?: string;
  subjectId: string;
  duration: number;
  totalMarks: number;
  isPublished: boolean;
  startDate: string;
  endDate: string;
  questions: Question[];
}

export interface Question {
  id: string;
  examId: string;
  question: string;
  type: 'multiple-choice' | 'essay' | 'true-false';
  options?: string[];
  correctAnswer?: string;
  marks: number;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  score: number;
  totalMarks: number;
  percentage: number;
  submittedAt: string;
  answers: any[];
}

export interface ApiError {
  message: string;
  status: number;
}