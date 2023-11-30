import { z } from 'zod';

const phoneNumberRegex = /^0[1-9][0-9]{8}$/;

const providedMaterialsBooking = z.object({
  id: z.string(),
  materialName: z.string(),
  price: z.number(),
  quantity: z.number().min(1).default(1),
  total: z.number(),
});

const materialProvided = z.object({
  id: z.string(),
  materialName: z.coerce.string().trim().min(1, 'Champs requis'),
  price: z.coerce.number().min(1, 'Champs invalide'),
});

const arrayPicutre = z.object({
  id: z.string(),
  src: z.string(),
});

export const FormBookingSchema = z.object({
  id: z.string(),
  idMaterial: z.string(),
  materialName: z.string(),
  total: z.number(),
  pricePerDay: z.number(),
  providedMaterialsBooking: z
    .array(providedMaterialsBooking)
    .default([]),
  firstName: z.string().trim().min(1, 'Champs requis'),
  lastName: z.string().trim().min(1, 'Champs requis'),
  phone: z
    .string()
    .trim()
    .min(1, 'Champs requis')
    .refine((value) => phoneNumberRegex.test(value), {
      message: 'Mauvais format',
    }),
  //email: z.string().email(),
  city: z.string().trim().min(1, 'Champs requis'),
  street: z.string().trim().min(1, 'Champs requis'),
  unavailableDates: z.array(z.string()).default([]),
  bookingDates: z
    .array(z.string())
    .min(1, 'Veuillez choisir une date de location')
    .default([]),
  coachingPriceHour: z.number(),
  coachingTime: z.coerce
    .number()
    .min(0, 'Veuillez entrer une valeur comprise entre 0 et 8')
    .max(8, 'Veuillez entrer une valeur comprise entre 0 et 8')
    .default(1),
  isCompleted: z.boolean().default(false),
  downPayment: z.number(),
  timestamp: z.number(),
});

export const FormMaterialSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, 'Champs requis'),
  downPayment: z.coerce.number().min(1, 'Champs invalide'),
  unavailableDates: z.array(z.string()).default([]),
  providedMaterials: z.array(materialProvided).default([]),
  presentationPicture: z.string(),
  arrayPicture: z.array(arrayPicutre).default([]),
  description: z.string().trim().min(1, 'Champs requis'),
  visible: z.boolean().default(true),
  pricePerDay: z.coerce.number().min(1, 'Champs invalide'),
  coachingPriceHour: z.coerce.number().min(1, 'Champs invalide'),
});
