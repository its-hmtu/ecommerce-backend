export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string[] | string | null;
  meta?: IPaginationMeta;
}

export interface IPaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}
