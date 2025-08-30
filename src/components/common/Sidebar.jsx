import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  BookOpen,
  Calendar,
  Settings,
  FileText,
  User,
  GraduationCap,
  BarChart3,
  School,
  ClipboardList,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  console.log(user)
  const d = useLocation();

  const adminMenuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: BarChart3 },
    { label: 'Academic Years', path: '/admin/academic-years', icon: Calendar },
    { label: 'Academic Terms', path: '/admin/academic-terms', icon: Calendar },
    { label: 'Class Levels', path: '/admin/class-levels', icon: School },
    { label: 'Year Groups', path: '/admin/year-groups', icon: Users },
    { label: 'Programs', path: '/admin/programs', icon: BookOpen },
    { label: 'Subjects', path: '/admin/subjects', icon: BookOpen },
    { label: 'Exams', path: '/admin/exams', icon: FileText },
    { label: 'Admins', path: '/admin/admins', icon: Users },
    { label: 'Teachers', path: '/admin/teachers', icon: User },
    { label: 'Students', path: '/admin/students', icon: GraduationCap },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const teacherMenuItems = [
    { label: 'Dashboard', path: '/teacher', icon: BarChart3 },
    { label: 'My Exams', path: '/teacher/exams', icon: FileText },
    { label: 'Questions', path: '/teacher/questions', icon: ClipboardList },
    { label: 'Profile', path: '/teacher/profile', icon: User },
  ];

  const studentMenuItems = [
    { label: 'Dashboard', path: '/student', icon: BarChart3 },
    { label: 'My Exams', path: '/student/exams', icon: FileText },
    { label: 'Results', path: '/student/results', icon: BarChart3 },
    { label: 'Profile', path: '/student/profile', icon: User },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return adminMenuItems;
      case 'teacher':
        return teacherMenuItems;
      case 'student':
        return studentMenuItems;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <School className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">EduSys</h1>
            <p className="text-sm text-gray-500 capitalize">{user?.role} Portal</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = d.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 mb-1 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;