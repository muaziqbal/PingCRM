import axios from 'axios';
import { Contact, ContactFormData } from '../types/contact';
import config from '../config';

const API_URL = config.apiBaseUrl;

console.log('Using API URL:', API_URL);

export const contactsApi = {
  get: async (id: number): Promise<Contact> => {
    try {
      console.log(`Fetching contact with ID: ${id}`);
      const response = await axios.get(`${API_URL}/contacts/${id}`);
      console.log('Contact data received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  },

  list: async (search?: string, organizationId?: number): Promise<Contact[]> => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (organizationId) params.append('organization_id', organizationId.toString());

      console.log('Fetching contacts with params:', params.toString());
      const response = await axios.get(`${API_URL}/contacts/`, { params });
      console.log('Contacts list received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts list:', error);
      throw error;
    }
  },

  create: async (data: ContactFormData): Promise<Contact> => {
    try {
      console.log('Creating contact with data:', data);
      const response = await axios.post(`${API_URL}/contacts/`, data);
      console.log('Contact created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  update: async (id: number, data: ContactFormData): Promise<Contact> => {
    try {
      console.log(`Updating contact ${id} with data:`, data);
      const response = await axios.put(`${API_URL}/contacts/${id}`, data);
      console.log('Contact updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      console.log(`Deleting contact with ID: ${id}`);
      await axios.delete(`${API_URL}/contacts/${id}`);
      console.log('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
};