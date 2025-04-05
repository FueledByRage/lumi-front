export interface Page<T> {
  content: T[];
  page: string;
  pageSize: string;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface FetchCustomersRequest{
  page: number;
  pageSize: number;
  year: string;
}