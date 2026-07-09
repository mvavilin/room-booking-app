import { AxiosError } from 'axios';

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    switch (status) {
      case 400: {
        throw new Error('Некорректные данные запроса');
      }

      case 401: {
        throw new Error('Необходимо авторизоваться');
      }

      case 403: {
        throw new Error('Недостаточно прав для выполнения операции');
      }

      case 404: {
        throw new Error('Комната не найдена');
      }

      case 409: {
        throw new Error('Такая комната уже существует');
      }

      case 422: {
        throw new Error('Ошибка валидации данных');
      }

      case 500: {
        throw new Error('Ошибка сервера, попробуйте позже');
      }

      default: {
        throw new Error(error.response?.data?.error?.message ?? error.message ?? 'Ошибка запроса');
      }
    }
  }

  throw error;
}
