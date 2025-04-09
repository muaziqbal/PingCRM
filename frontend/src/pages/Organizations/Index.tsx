import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { organizationsApi } from '../../services/api';
import { Organization, PaginatedResponse } from '../../types';
import Layout from '../../components/Layout';
import SearchInput from '../../components/SearchInput';
import Table, { TableRow, TableCell } from '../../components/Table';
import Pagination from '../../components/Pagination';
import LoadingSpinner from '../../components/LoadingSpinner';
import Button from '../../components/Button';

export default function OrganizationsIndex() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginatedResponse<Organization>['meta'] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrganizations();
  }, [search, currentPage]);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await organizationsApi.getAll(search, currentPage);
      setOrganizations(response.data);
      setPagination(response.meta);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Organizations
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link to="/organizations/create">
                <Button>Create Organization</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="mb-4">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search organizations..."
            />
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Table
                headers={['Name', 'Email', 'Phone', 'Location', 'Status']}
              >
                {organizations.map((org) => (
                  <TableRow
                    key={org.id}
                    onClick={() => window.location.href = `/organizations/${org.id}/edit`}
                  >
                    <TableCell>{org.name}</TableCell>
                    <TableCell>{org.email}</TableCell>
                    <TableCell>{org.phone}</TableCell>
                    <TableCell>
                      {org.city}, {org.region}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </Table>

              {pagination && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={pagination.last_page}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}