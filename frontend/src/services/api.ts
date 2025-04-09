import axios from 'axios';
import { Organization, Contact, PaginatedResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Organizations API
export const organizationsApi = {
  getAll: async (search?: string, trashed?: boolean) => {
    const response = await api.get<PaginatedResponse<Organization>>('/organizations', {
      params: { search, trashed },
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Organization>(`/organizations/${id}`);
    return response.data;
  },

  create: async (data: Omit<Organization, 'id' | 'created_at' | 'updated_at'>) => {
    const response = await api.post<Organization>('/organizations', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Organization>) => {
    const response = await api.put<Organization>(`/organizations/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/organizations/${id}`);
  },

  restore: async (id: number) => {
    await api.post(`/organizations/${id}/restore`);
  },
};

// Contacts API
export const contactsApi = {
  getAll: async (search?: string, organizationId?: number, trashed?: boolean) => {
    const response = await api.get<PaginatedResponse<Contact>>('/contacts', {
      params: { search, organization_id: organizationId, trashed },
    });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Contact>(`/contacts/${id}`);
    return response.data;
  },

  create: async (data: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) => {
    const response = await api.post<Contact>('/contacts', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Contact>) => {
    const response = await api.put<Contact>(`/contacts/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/contacts/${id}`);
  },

  restore: async (id: number) => {
    await api.post(`/contacts/${id}/restore`);
  },
};