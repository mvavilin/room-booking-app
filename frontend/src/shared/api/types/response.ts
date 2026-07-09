interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface CollectionResponse<T> {
  data: T[];

  meta: {
    pagination: Pagination;
  };
}

export interface SingleResponse<T> {
  data: T;

  meta: Record<string, never>;
}
