import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '../ContactForm';

const mockOrganizations = [
  { id: 1, name: 'Acme Corp' },
  { id: 2, name: 'Tech Solutions' },
];

describe('ContactForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(
      <ContactForm
        organizations={mockOrganizations}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('Organization')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(
      <ContactForm
        organizations={mockOrganizations}
        onSubmit={mockOnSubmit}
      />
    );

    // Fill in form fields
    await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.type(screen.getByLabelText('Phone'), '1234567890');
    await userEvent.type(screen.getByLabelText('City'), 'New York');
    await userEvent.selectOptions(screen.getByLabelText('Organization'), '1');

    // Submit form
    await userEvent.click(screen.getByText('Save Contact'));

    // Verify form submission
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        city: 'New York',
        organization_id: 1,
      });
    });
  });

  it('shows validation errors for required fields', async () => {
    render(
      <ContactForm
        organizations={mockOrganizations}
        onSubmit={mockOnSubmit}
      />
    );

    // Submit form without filling required fields
    await userEvent.click(screen.getByText('Save Contact'));

    // Verify validation errors
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Organization is required')).toBeInTheDocument();
  });

  it('pre-fills form with initial data', () => {
    const initialData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      city: 'New York',
      organization_id: 1,
    };

    render(
      <ContactForm
        initialData={initialData}
        organizations={mockOrganizations}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Email')).toHaveValue('john@example.com');
    expect(screen.getByLabelText('Phone')).toHaveValue('1234567890');
    expect(screen.getByLabelText('City')).toHaveValue('New York');
    expect(screen.getByLabelText('Organization')).toHaveValue('1');
  });
});