import { AxiosError } from 'axios';

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    const messages: Record<number, string> = {
      400: '400 Некорректный запрос',
      401: '401 Вы не авторизованы',
      403: '403 Недостаточно прав',
      404: '404 Ресурс не найден',
      409: '409 Конфликт данных',
      422: '422 Ошибка валидации',
      500: '500 Внутренняя ошибка сервера',
    };

    throw new Error(
      messages[status ?? 0] ?? error.response?.data?.error?.message ?? 'Произошла ошибка'
    );
  }

  throw error;
}
