import { providedMaterialsBooking } from './booking-schema';

export interface Message {
  id: string;
  idMaterial: string;
  materialName: string;
  total: number;
  pricePerDay: number;
  providedMaterialsBooking: providedMaterialsBooking[] | [];
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  street: string;
  unavailableDates: string[] | [];
  bookingDates: string[] | [];
  coachingPriceHour: number;
  coachingTime: number;
  isCompleted: boolean;
  downPayment: number;
  timestamp: number;
  isRead: boolean;
}
