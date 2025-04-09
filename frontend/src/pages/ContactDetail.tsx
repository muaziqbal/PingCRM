import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Contact, ContactFormData } from '../types/contact';
import { contactsApi } from '../api/contacts';
import { organizationsApi } from '../api/organizations';
import ContactForm from '../components/contacts/ContactForm';
import { Organization } from '../types/organization';

export const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [contactData, orgsData] = await Promise.all([
          contactsApi.get(Number(id)),
          organizationsApi.list(),
        ]);
        setContact(contactData);
        setOrganizations(orgsData);
        setError(null);
      } catch (err) {
        setError('Failed to load contact');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (data: ContactFormData) => {
    try {
      if (!contact) return;
      await contactsApi.update(contact.id, data);
      navigate('/contacts');
    } catch (err) {
      setError('Failed to update contact');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!contact) return;
    try {
      await contactsApi.delete(contact.id);
      navigate('/contacts');
    } catch (err) {
      setError('Failed to delete contact');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!contact) return <div>Contact not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Edit Contact</h1>
          <p className="mt-2 text-sm text-gray-700">
            Update contact information below.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-8">
        <ContactForm
          initialData={contact}
          onSubmit={handleSubmit}
          organizations={organizations}
        />
      </div>
    </div>
  );
};