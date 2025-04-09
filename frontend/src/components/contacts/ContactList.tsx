import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Contact } from '../../types/contact';
import { contactsApi } from '../../api/contacts';

interface ContactListProps {
  organizationId?: number;
  search?: string;
}

const ContactList: React.FC<ContactListProps> = ({ organizationId, search }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        console.log('Fetching contacts with:', { search, organizationId });
        const data = await contactsApi.list(search, organizationId);
        console.log('Received contacts:', data);
        setContacts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to load contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [organizationId, search]);

  if (loading) {
    console.log('ContactList is loading...');
    return <div className="text-center py-4">Loading contacts...</div>;
  }

  if (error) {
    console.log('ContactList error:', error);
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (contacts.length === 0) {
    console.log('No contacts found');
    return (
      <div className="text-center py-4 text-gray-500">
        No contacts found. Try adjusting your search or filters.
      </div>
    );
  }

  console.log('Rendering contact list with', contacts.length, 'contacts');
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Link
              to={`/contacts/${contact.id}`}
              className="block hover:bg-gray-50"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {contact.name}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {contact.city || 'No city'}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {contact.phone || 'No phone'}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {contact.email || 'No email'}
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

export default ContactList;