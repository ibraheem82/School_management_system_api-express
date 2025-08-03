import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { FileText, Clock, CheckCircle, Award } from 'lucide-react';
import { examService } from '../../services/examService';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    availableExams: 0,
    completedExams: 0,
    averageScore: 0,
    totalResults: 0,
  });
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [exams, results] = await Promise.all([
        examService.getExams(),
        examService.getExamResults(user?.id),
      ]);
      
      const publishedExams = exams.filter(exam => exam.isPublished);
      const completedExamIds = results.map((result: any) => result.examId);
      const availableExams = publishedExams.filter(exam => !completedExamIds.includes(exam.id));
      
      const averageScore = results.length > 0 
        ? results.reduce((sum: number, result: any) => sum + result.percentage, 0) / results.length
        : 0;

      setStats({
        availableExams: availableExams.length,
        completedExams: results.length,
        averageScore: Math.round(averageScore),
        totalResults: results.length,
      });
      
      setUpcomingExams(availableExams.slice(0, 5));
      setRecentResults(results.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Available Exams',
      value: stats.availableExams,
      icon: FileText,
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Completed Exams',
      value: stats.completedExams,
      icon: CheckCircle,
      color: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore}%`,
      icon: Award,
      color: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Total Results',
      value: stats.totalResults,
      icon: Clock,
      color: 'bg-orange-50',
      textColor: 'text-orange-600',
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
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600">Track your academic progress and upcoming exams</p>
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

      {/* Upcoming Exams and Recent Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Exams</h3>
          <div className="space-y-3">
            {upcomingExams.length > 0 ? (
              upcomingExams.map((exam: any) => (
                <div key={exam.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">{exam.title}</p>
                    <p className="text-sm text-gray-500">
                      {exam.duration} minutes • {exam.totalMarks} marks
                    </p>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Take Exam
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming exams</p>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h3>
          <div className="space-y-3">
            {recentResults.length > 0 ? (
              recentResults.map((result: any) => (
                <div key={result.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-900">Exam Result</p>
                    <p className="text-sm text-gray-500">
                      Score: {result.score}/{result.totalMarks}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    result.percentage >= 80
                      ? 'bg-green-100 text-green-800'
                      : result.percentage >= 60
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.percentage}%
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No results yet</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;