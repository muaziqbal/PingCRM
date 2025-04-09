import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrganizationList from '../components/organizations/OrganizationList';

const Organizations: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Organizations</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all organizations including their name, email, and location.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/organizations/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add organization
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search organizations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <OrganizationList search={search} />
      </div>
    </div>
  );
};

export default Organizations;