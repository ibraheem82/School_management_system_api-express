import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import CreateTeacher from './pages/admin/CreateTeacher';
import CreateStudent from './pages/admin/CreateStudent';
import { useAuth } from './contexts/AuthContext';

// Component to handle role-based redirects
const RoleBasedRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect based on user role
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'teacher':
      return <Navigate to="/teacher" replace />;
    case 'student':
      return <Navigate to="/student" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

// Unauthorized page component
const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
        <Navigate to="/login" replace />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Unauthorized Route */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/add-teacher" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateTeacher />
              </ProtectedRoute>
            } />
            <Route path="/admin/add-student" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateStudent />
              </ProtectedRoute>
            } />

            {/* Teacher Routes */}
            <Route path="/teacher" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            } />

            {/* Student Routes */}
            <Route path="/student" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />

            {/* Unauthorized Route */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Role-based redirect for root and any authenticated users */}
            <Route path="/" element={<RoleBasedRedirect />} />
            
            {/* Catch all other routes */}
            <Route path="*" element={<RoleBasedRedirect />} />
          </Routes>
        </Layout>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#363636', color: '#fff' },
            success: { style: { background: '#10B981' } },
            error: { style: { background: '#EF4444' } },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;