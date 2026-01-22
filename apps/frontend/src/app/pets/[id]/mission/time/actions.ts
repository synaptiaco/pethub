"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePetBirthDate(petId: string, birthDate: Date) {
  // Conectamos con tu backend de Hono
  const response = await fetch(`http://localhost:3000/api/pets/${petId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      birthDate: birthDate.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la fecha");
  }

  // Refrescamos el cache de la página del perfil
  revalidatePath(`/pets/${petId}`);
}