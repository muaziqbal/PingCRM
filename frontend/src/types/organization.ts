export interface Organization {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface OrganizationFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
}