import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Building2, 
  CalendarDays, 
  ClipboardCheck, 
  UserRoundCog, 
  School,
  UserPlus,
  RefreshCw
} from 'lucide-react';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user, loading: authLoading, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    subjects: 0,
    exams: 0,
    academicYears: 0,
    programs: 0,
  });

  const navigate = useNavigate();

  // Function to fetch dashboard stats - using user object data
  const fetchDashboardStats = async () => {
    try {
      setRefreshing(true);
      
      // Refresh user data from server to get updated counts
      if (refreshUser) {
        await refreshUser();
      }
      
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  // Update stats whenever user object changes
  useEffect(() => {
    if (user) {
      setStats({
        students: user.students?.length || 0,
        teachers: user.teachers?.length || 0,
        subjects: 0, // Not in user object
        exams: 0, // Not in user object
        academicYears: user.academicYears?.length || 0,
        programs: user.programs?.length || 0,
      });
    }
  }, [user]); // This will update stats whenever user data changes

  // Fetch stats when component mounts and user is available
  useEffect(() => {
    if (!authLoading && user) {
      fetchDashboardStats();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  // Function to refresh stats manually
  const handleRefresh = async () => {
    if (user && refreshUser) {
      setRefreshing(true);
      try {
        await refreshUser();
        toast.success('Dashboard updated!');
      } catch (error) {
        toast.error('Failed to refresh data');
      } finally {
        setRefreshing(false);
      }
    }
  };

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, text: 'New student registered: Jane Doe', time: '2 hours ago' },
    { id: 2, text: 'Teacher added a new subject: Physics', time: '5 hours ago' },
    { id: 3, text: 'Exam results published for Math', time: 'yesterday' },
    { id: 4, text: 'Academic year 2023-2024 created', time: '2 days ago' },
  ]);

  const chartData = [
    { name: 'Students', value: stats.students, fill: '#8884d8' },
    { name: 'Teachers', value: stats.teachers, fill: '#82ca9d' },
    { name: 'Subjects', value: stats.subjects, fill: '#ffc658' },
    { name: 'Exams', value: stats.exams, fill: '#ff7300' },
    { name: 'Academic Years', value: stats.academicYears, fill: '#a4de6c' },
    { name: 'Programs', value: stats.programs, fill: '#d0ed57' },
  ];

  const infoCards = [
    {
      title: 'Total Students',
      value: stats.students,
      icon: GraduationCap,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Teachers',
      value: stats.teachers,
      icon: Users,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Subjects',
      value: stats.subjects,
      icon: BookOpen,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Total Exams',
      value: stats.exams,
      icon: ClipboardCheck,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Academic Years',
      value: stats.academicYears,
      icon: CalendarDays,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Programs',
      value: stats.programs,
      icon: School,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <p>Unauthorized access. Please log in.</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            disabled={refreshing}
            className="flex items-center"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => navigate('/admin/add-teacher')} className="flex items-center">
            <UserPlus className="w-5 h-5 mr-2" />
            Add Teacher
          </Button>
          <Button onClick={() => navigate('/admin/add-student')} className="flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Add Student
          </Button>
        </div>
      </div>
      
      {user && (
        <Card className="mb-6 p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome, {user.name}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p><span className="font-medium">Email:</span> {user.email}</p>
            <p><span className="font-medium">Role:</span> {user.role}</p>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {infoCards.map((card, index) => (
          <Card key={index} className="p-6 flex items-center space-x-4">
            <div className={`p-3 rounded-full ${card.bgColor}`}>
              <card.icon className={`w-6 h-6 ${card.textColor}`} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{card.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibent text-gray-700 mb-4">Recent Activities</h2>
          <ul className="space-y-3">
            {recentActivities.map(activity => (
              <li key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-gray-800">{activity.text}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;