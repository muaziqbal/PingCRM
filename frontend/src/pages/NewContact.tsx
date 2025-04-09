import React from 'react';
import { useNavigate } from 'react-router-dom';
import { contactsApi } from '../api/contacts';
import { ContactForm } from './Contacts/Form';
import { Card } from '../components/Card';

export const NewContact: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      await contactsApi.create(data);
      navigate('/contacts');
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">New Contact</h1>
      </div>

      <Card>
        <ContactForm onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};
