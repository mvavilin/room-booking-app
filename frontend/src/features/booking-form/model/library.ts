import { parse, subSeconds, format } from 'date-fns';

export const formatTimeForForm = (date: Date): string => format(date, 'HH:mm');

export const parseFormDateTime = (time: string, date: Date): Date => parse(time, 'HH:mm', date);

export const parseFinishTime = (time: string, date: Date): Date =>
  subSeconds(parseFormDateTime(time, date), 1);
