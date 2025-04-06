export enum FilterEnum {
  CONSUMERS = "consumers",
  DISTRIBUTORS = "distributors"
}
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
  query: string | null;
  type: FilterEnum
  year: string;
}