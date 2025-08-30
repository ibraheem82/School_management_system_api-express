import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { academicsService } from '../../services/academicsService';
import { CalendarPlus } from 'lucide-react';

const CreateAcademicYear = () => {
  const [formData, setFormData] = useState({
    name: '',
    fromYear: '',
    toYear: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, fromYear, toYear } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await academicsService.createAcademicYear(formData);
      toast.success('Academic Year created successfully!');
      navigate('/admin'); // Redirect to admin dashboard after creation
    } catch (error) {
      toast.error(error.message || 'Failed to create academic year.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <CalendarPlus className="w-8 h-8 mr-2" />
        Create Academic Year
      </h1>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 2023-2024"
              required
            />
          </div>
          
          <div>
            <label htmlFor="fromYear" className="block text-sm font-medium text-gray-700 mb-1">
              From Year
            </label>
            <input
              type="number"
              name="fromYear"
              id="fromYear"
              value={fromYear}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 2023"
              required
            />
          </div>

          <div>
            <label htmlFor="toYear" className="block text-sm font-medium text-gray-700 mb-1">
              To Year
            </label>
            <input
              type="number"
              name="toYear"
              id="toYear"
              value={toYear}
              onChange={onChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 2024"
              required
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
            size="lg"
          >
            Create Academic Year
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateAcademicYear;
