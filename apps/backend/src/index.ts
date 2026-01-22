import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { db } from './db';
import { pets } from './db/schema';
import { PetSchema } from '@pethub/shared'; // shared zod schema
import { cors } from 'hono/cors';
import { eq } from 'drizzle-orm';

const app = new Hono();

// enable CORS for all routes
app.use('/api/*', cors());

// Test rápido para descartar problemas de red
app.get('/', (c) => c.text('API Local Funcionando 🐾'));

// endpoint to get a pet
app.get('/api/pets/:id', async (c) => {
  const id = c.req.param('id');

  try {
    const pet = await db.select()
      .from(pets)
      .where(eq(pets.id, id))
      .limit(1);

    if (pet.length === 0) {
      return c.json({ success: false, error: 'Mascota no encontrada' }, 404);
    }

    return c.json({ success: true, data: pet[0] });
  } catch (error) {
    return c.json({ success: false, error: 'Error de servidor' }, 500);
  }
});

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

app.patch('/api/pets/:id', zValidator('json', PetSchema.partial()), async (c) => {
  const id = c.req.param('id');
  const updates = c.req.valid('json');

  try {
    const updatedPet = await db.update(pets)
      .set({
        ...updates,
        birthDate: updates.birthDate ? new Date(updates.birthDate) : undefined,
      })
      .where(eq(pets.id, id))
      .returning();

    return c.json({ success: true, data: updatedPet[0] });
  } catch (error) {
    return c.json({ success: false, error: 'No se pudo actualizar' }, 500);
  }
});

serve({ fetch: app.fetch, port: 5000 });