import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactList from '../components/contacts/ContactList';
import { organizationsApi } from '../api/organizations';
import { Organization } from '../types/organization';

const Contacts: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<number | undefined>();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await organizationsApi.list();
        setOrganizations(data);
      } catch (error) {
        console.error('Failed to fetch organizations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Contacts</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all contacts in your account including their name, email, and
            organization.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/contacts/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add contact
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-64">
            <select
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(Number(e.target.value) || undefined)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Organizations</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ContactList search={search} organizationId={selectedOrg} />
      </div>
    </div>
  );
};

export default Contacts;