import { Organization } from './organization';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  organization_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  organization_id: string;
}