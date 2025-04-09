import axios from 'axios';
import { Organization, OrganizationFormData } from '../types/organization';
import config from '../config';

const API_URL = config.apiBaseUrl;

export const organizationsApi = {
  async get(id: string): Promise<Organization> {
    const response = await axios.get(`${API_URL}/organizations/${id}`);
    return response.data;
  },

  async create(data: OrganizationFormData): Promise<Organization> {
    const response = await axios.post(`${API_URL}/organizations/`, data);
    return response.data;
  },

  async update(id: string, data: OrganizationFormData): Promise<Organization> {
    const response = await axios.put(`${API_URL}/organizations/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/organizations/${id}`);
  },

  async list(search?: string): Promise<Organization[]> {
    const params = new URLSearchParams();
    if (search) params.append('search', search);

    const response = await axios.get(`${API_URL}/organizations/`, { params });
    return response.data;
  }
};