import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { db } from './db';
import { pets } from './db/schema';
import { PetSchema } from '@pethub/shared'; // shared zod schema
import { cors } from 'hono/cors';

const app = new Hono();

// enable CORS for all routes
app.use('/api/*', cors());

// Test rápido para descartar problemas de red
app.get('/', (c) => c.text('API Local Funcionando 🐾'));

// endpoint to create a new pet
app.post('/api/pets', zValidator('json', PetSchema), async (c) => {
  // data validated by zod
  const validatedData = c.req.valid('json');

  try {
    const newPet = await db.insert(pets).values({
      name: validatedData.name,
      species: validatedData.species,      
      //birthDate: new Date(validatedData.birthDate), 
      ownerId: "00000000-0000-0000-0000-000000000000"      
    }).returning();

    return c.json({
      success: true,
      data: newPet[0]
    }, 201);
  } catch (error) {
    return c.json({ success: false, error: 'Error creating pet' }, 500);
  }
});

serve({ fetch: app.fetch, port: 5000 });