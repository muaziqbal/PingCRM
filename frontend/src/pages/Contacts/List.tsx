import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contactsApi } from '../../api/contacts';
import { Contact } from '../../types/contact';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';

export const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadContacts();
  }, [search]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactsApi.list();
      setContacts(data);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactsApi.delete(id);
        await loadContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      cell: (row: Contact) => (
        <Link to={`/contacts/${row.id}/edit`} className="text-blue-600 hover:text-blue-800">
          {row.name}
        </Link>
      ),
    },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'City', accessor: 'city' },
    {
      header: 'Organization',
      cell: (row: Contact) => (
        <Link
          to={`/organizations/${row.organization_id}/edit`}
          className="text-blue-600 hover:text-blue-800"
        >
          {row.organization?.name}
        </Link>
      ),
    },
    {
      header: 'Actions',
      cell: (row: Contact) => (
        <div className="flex space-x-2">
          <Link to={`/contacts/${row.id}/edit`}>
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row.id!)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Link to="/contacts/create">
          <Button>Create Contact</Button>
        </Link>
      </div>

      <Card>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full px-4 py-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <Table
            columns={columns}
            data={contacts}
            emptyMessage="No contacts found"
          />
        )}
      </Card>
    </div>
  );
};