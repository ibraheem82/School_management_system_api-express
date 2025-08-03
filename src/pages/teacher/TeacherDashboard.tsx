import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FileText, Users, Clock, CheckCircle } from 'lucide-react';
import { examService } from '../../services/examService';
import { useAuth } from '../../contexts/AuthContext';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalExams: 0,
    publishedExams: 0,
    draftExams: 0,
    totalQuestions: 0,
  });
  const [recentExams, setRecentExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const exams = await examService.getExams();
      
      setStats({
        totalExams: exams.length,
        publishedExams: exams.filter(exam => exam.isPublished).length,
        draftExams: exams.filter(exam => !exam.isPublished).length,
        totalQuestions: exams.reduce((total, exam) => total + (exam.questions?.length || 0), 0),
      });
      
      setRecentExams(exams.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Exams',
      value: stats.totalExams,
      icon: FileText,
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Published Exams',
      value: stats.publishedExams,
      icon: CheckCircle,
      color: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Draft Exams',
      value: stats.draftExams,
      icon: Clock,
      color: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      title: 'Total Questions',
      value: stats.totalQuestions,
      icon: Users,
      color: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600">Manage your exams and track student progress</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} hover>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Exams and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Exams</h3>
          <div className="space-y-3">
            {recentExams.length > 0 ? (
              recentExams.map((exam: any) => (
                <div key={exam.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{exam.title}</p>
                    <p className="text-sm text-gray-500">
                      {exam.isPublished ? 'Published' : 'Draft'} • {exam.questions?.length || 0} questions
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    exam.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {exam.isPublished ? 'Published' : 'Draft'}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No exams created yet</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Create New Exam</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
              <Users className="w-5 h-5 text-green-600" />
              <span className="font-medium">Add Questions</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Review Results</span>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="font-medium">Update Profile</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;