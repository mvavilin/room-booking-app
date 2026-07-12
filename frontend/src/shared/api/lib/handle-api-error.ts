import { AxiosError } from 'axios';
import { MESSAGES } from '@shared/constants';

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    throw new Error(
      MESSAGES[error.response?.status ?? 0] ??
        error.response?.data?.error?.message ??
        error.message ??
        'Произошла ошибка'
    );
  }

  throw error;
}
