export { api } from '@shared/api/axios/axios';

export { handleApiError } from '@shared/api/lib/handle-api-error';

export type { EntityDto } from '@shared/api/types/entity';
export type { PaginationParameters } from '@shared/api/types/request';
export type { Pagination, CollectionResponse, SingleResponse } from '@shared/api/types/response';
export type {
  StrapiPagination,
  StrapiQueryParameters,
  StrapiFilter,
} from '@shared/api/types/strapi';
