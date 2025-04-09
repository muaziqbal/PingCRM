import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OrganizationForm } from '../../components/organizations/OrganizationForm';
import { OrganizationFormData } from '../../types/organization';
import { organizationsApi } from '../../api/organizations';

export const OrganizationFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (data: OrganizationFormData) => {
    try {
      await organizationsApi.create(data);
      navigate('/organizations');
    } catch (err) {
      console.error('Failed to create organization:', err);
      setError('Failed to create organization. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">New Organization</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create a new organization by filling out the form below.
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <OrganizationForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default OrganizationFormPage;