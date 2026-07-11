import { addMinutes, format, setHours, startOfDay } from 'date-fns';

export const START_HOUR = 9;
export const END_HOUR = 18;
export const STEP = 30;

const start = setHours(startOfDay(new Date()), START_HOUR);

export const TIME_OPTIONS = Array.from(
  {
    length: ((END_HOUR - START_HOUR) * 60) / STEP,
  },
  (_, index) => format(addMinutes(start, index * STEP), 'HH:mm')
);
