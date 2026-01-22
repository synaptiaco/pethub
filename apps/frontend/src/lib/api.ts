import { Pet } from "@pethub/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function getPetFromHono(id: string): Promise<Pet> {
  const response = await fetch(`${API_URL}/pets/${id}`, {
    // Esto asegura que Next.js obtenga datos frescos cuando sea necesario
    next: { revalidate: 0 }, 
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la mascota de la API de Hono");
  }

  const result = await response.json();
  return result.data; // Hono devuelve { success: true, data: { ... } }
}