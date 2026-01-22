import { z } from 'zod';

export const PetSchema = z.object({
  name: z.string().min(2),
  species: z.enum(['Dog', 'Cat', 'Bird', 'Other']),
  birthDate: z.string(),
});

export type Pet = z.infer<typeof PetSchema>;