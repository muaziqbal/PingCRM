export interface Organization {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  postal_code?: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  organization_id?: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  postal_code?: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
  organization?: Organization;
}

export interface ContactWithOrganization extends Contact {
  organization?: Organization;
}

export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  previous_page_url: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}