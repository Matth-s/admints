export interface Booking {
  id: string;
  idMaterial: string;
  materialName: string;
  total: number;
  pricePerDay: number;
  providedMaterialsBooking: providedMaterialsBooking[] | [];
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  unavailableDates: string[] | [];
  bookingDates: string[] | [];
  coachingPriceHour: number;
  coachingTime: number;
}

export interface providedMaterialsBooking {
  id: string;
  materialName: string;
  price: number;
  quantity: number;
  total: number;
}
