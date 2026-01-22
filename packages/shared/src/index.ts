import { z } from 'zod';

export const PetSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  species: z.enum(['Dog', 'Cat', 'Bird', 'Other']),
  birthDate: z.string().optional(),
  photoUrl: z.string().url("Debe ser una URL válida").optional(), // <-- Nueva propiedad
});

export type Pet = z.infer<typeof PetSchema>;