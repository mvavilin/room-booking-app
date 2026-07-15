import { endOfWeek, startOfWeek } from 'date-fns';

export const WEEK_START = startOfWeek(new Date(), { weekStartsOn: 1 });
export const WEEK_END = endOfWeek(new Date(), { weekStartsOn: 1 });
