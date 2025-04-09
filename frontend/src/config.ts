// Configuration for the application

// API base URL - use environment variable or fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Other configuration options
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

export const config = {
  apiBaseUrl: API_BASE_URL,
  defaultPageSize: DEFAULT_PAGE_SIZE,
  maxPageSize: MAX_PAGE_SIZE,
};

export default config;