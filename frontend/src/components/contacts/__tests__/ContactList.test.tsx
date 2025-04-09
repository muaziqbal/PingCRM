import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactList } from '../ContactList';
import { contactsApi } from '../../../api/contacts';
import { organizationsApi } from '../../../api/organizations';

// Mock the API responses
const mockContacts = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    city: 'New York',
    organization_id: 1,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '0987654321',
    city: 'Los Angeles',
    organization_id: 1,
  },
];

const mockOrganizations = [
  { id: 1, name: 'Acme Corp' },
  { id: 2, name: 'Tech Solutions' },
];

describe('ContactList', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup mock implementations
    (contactsApi.list as jest.Mock).mockResolvedValue(mockContacts);
    (organizationsApi.list as jest.Mock).mockResolvedValue(mockOrganizations);
  });

  it('renders loading state initially', () => {
    render(<ContactList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders contacts after loading', async () => {
    render(<ContactList />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  it('filters contacts by search term', async () => {
    render(<ContactList />);

    // Wait for contacts to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Type in search box
    const searchInput = screen.getByPlaceholderText('Search contacts...');
    await userEvent.type(searchInput, 'John');

    // Verify filtered results
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('filters contacts by organization', async () => {
    render(<ContactList />);

    // Wait for contacts and organizations to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    });

    // Select organization from dropdown
    const orgSelect = screen.getByLabelText('Organization');
    await userEvent.selectOptions(orgSelect, '1');

    // Verify filtered results
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    // Mock API error
    (contactsApi.list as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<ContactList />);

    await waitFor(() => {
      expect(screen.getByText('Error loading contacts')).toBeInTheDocument();
    });
  });
});