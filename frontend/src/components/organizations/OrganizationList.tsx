import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Organization } from '../../types/organization';
import { organizationsApi } from '../../api/organizations';

interface OrganizationListProps {
  search?: string;
}

const OrganizationList: React.FC<OrganizationListProps> = ({ search }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        console.log('Fetching organizations with:', { search });
        const data = await organizationsApi.list(search);
        console.log('Received organizations:', data);
        setOrganizations(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching organizations:', err);
        setError('Failed to load organizations');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [search]);

  if (loading) {
    console.log('OrganizationList is loading...');
    return <div className="text-center py-4">Loading organizations...</div>;
  }

  if (error) {
    console.log('OrganizationList error:', error);
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (organizations.length === 0) {
    console.log('No organizations found');
    return (
      <div className="text-center py-4 text-gray-500">
        No organizations found. Try adjusting your search.
      </div>
    );
  }

  console.log('Rendering organization list with', organizations.length, 'organizations');
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {organizations.map((organization) => (
          <li key={organization.id}>
            <Link
              to={`/organizations/${organization.id}`}
              className="block hover:bg-gray-50"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {organization.name}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {organization.city || 'No city'}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {organization.phone || 'No phone'}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {organization.email || 'No email'}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationList;