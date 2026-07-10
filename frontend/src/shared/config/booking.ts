import { addMinutes, format, startOfDay, setHours } from 'date-fns';

const START_HOUR = 9;
const END_HOUR = 18;
const STEP = 30;

const start = setHours(startOfDay(new Date()), START_HOUR);

export const BOOKING_SLOTS = Array.from(
  {
    length: ((END_HOUR - START_HOUR) * 60) / STEP,
  },
  (_, index) => format(addMinutes(start, index * STEP), 'HH:mm')
);
