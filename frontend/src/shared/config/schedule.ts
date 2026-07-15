import { addMinutes, setHours, startOfDay } from 'date-fns';

export const WORKING_DAY_START_HOUR = 9;
const WORKING_DAY_END_HOUR = 18;
export const BOOKING_TIME_INTERVAL_MINUTES = 30;

export const dayStartTime = setHours(startOfDay(new Date()), WORKING_DAY_START_HOUR);

export const BOOKING_TIME_SLOTS = Array.from(
  {
    length: ((WORKING_DAY_END_HOUR - WORKING_DAY_START_HOUR) * 60) / BOOKING_TIME_INTERVAL_MINUTES,
  },
  (_, slotIndex) => addMinutes(dayStartTime, slotIndex * BOOKING_TIME_INTERVAL_MINUTES)
);
