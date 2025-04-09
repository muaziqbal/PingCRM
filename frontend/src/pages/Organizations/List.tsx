import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { organizationsApi } from '../../api/organizations';
import { Organization } from '../../types/organization';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Table } from '../../components/Table';

export const OrganizationsList: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadOrganizations();
  }, [search]);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const data = await organizationsApi.list();
      setOrganizations(data);
    } catch (error) {
      console.error('Error loading organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this organization?')) {
      try {
        await organizationsApi.delete(id);
        await loadOrganizations();
      } catch (error) {
        console.error('Error deleting organization:', error);
      }
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      cell: (row: Organization) => (
        <Link to={`/organizations/${row.id}/edit`} className="text-blue-600 hover:text-blue-800">
          {row.name}
        </Link>
      ),
    },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'City', accessor: 'city' },
    {
      header: 'Actions',
      cell: (row: Organization) => (
        <div className="flex space-x-2">
          <Link to={`/organizations/${row.id}/edit`}>
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
        <h1 className="text-2xl font-bold">Organizations</h1>
        <Link to="/organizations/create">
          <Button>Create Organization</Button>
        </Link>
      </div>

      <Card>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search organizations..."
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
            data={organizations}
            emptyMessage="No organizations found"
          />
        )}
      </Card>
    </div>
  );
};