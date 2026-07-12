import type { RoomDto } from '@entities/room';
import type { BookingDto, CreateBookingDto, UpdateBookingDto } from '@entities/booking';

export type BookingDialogMode = 'create' | 'edit';

interface CheckBookingConflictParameters {
  roomDocumentId: string;
  start: Date;
  finish: Date;
  bookingDocumentId?: string;
}

export interface BookingConflictResult {
  isConflict: boolean;
  nextAvailableTime: Date | undefined;
}

export interface BookingStore {
  bookingsByRoomDocumentId: Record<string, BookingDto[]>;
  weekBookingsByRoomDocumentId: Record<string, BookingDto[]>;
  weekBookingsByRoomDocumentIdLoading: boolean;
  weekBookingsByRoomDocumentIdError: boolean;

  isOpenBookingDialog: boolean;
  bookingDialogMode: BookingDialogMode;
  activeBooking: BookingDto | undefined;
  startTime: Date;

  loadRoomBookings(room: RoomDto): Promise<void>;
  createBooking(data: CreateBookingDto): Promise<void>;
  updateBooking(documentId: string, data: UpdateBookingDto): Promise<void>;
  checkBookingConflict(parameters: CheckBookingConflictParameters): Promise<BookingConflictResult>;
  deleteBooking(documentId: string, room: RoomDto): Promise<void>;
  loadRoomWeekBookings(room: RoomDto): Promise<void>;

  openBookingDialog(bookingDialogMode: BookingDialogMode, booking?: BookingDto): void;
  closeBookingDialog(): void;

  setStartTime: (date: Date) => void;
  clearStartTime: () => void;
}
