export { api } from '@shared/api/axios/instance';

export { handleApiError } from '@shared/api/lib/handle-api-error';

export type { EntityDto } from '@shared/api/types/entity';
export type {
  CollectionResponse,
  SingleResponse,
  PaginatedResult,
  Pagination,
} from '@shared/api/types/response';
export type {
  StrapiPagination,
  StrapiQueryParameters,
  StrapiFilter,
} from '@shared/api/types/strapi';
