export interface StrapiPagination {
  withCount?: boolean;
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
}

export interface StrapiQueryParameters {
  sort?: string | string[];
  fields?: string[];
  populate?: string | string[] | '*';
  locale?: string;
  filters?: Record<string, unknown>;
  pagination?: StrapiPagination;
}

export interface StrapiFilter<T> {
  $eq?: T;
  $eqi?: T;

  $ne?: T;
  $nei?: T;

  $lt?: T;
  $lte?: T;

  $gt?: T;
  $gte?: T;

  $in?: T[];
  $notIn?: T[];

  $contains?: T;
  $containsi?: T;

  $notContains?: T;
  $notContainsi?: T;

  $startsWith?: T;
  $startsWithi?: T;

  $endsWith?: T;
  $endsWithi?: T;

  $between?: [T, T];

  $null?: boolean;
  $notNull?: boolean;
}
