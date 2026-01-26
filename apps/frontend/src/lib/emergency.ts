"use client";

import { toast } from "sonner"; // O tu librería de notificaciones

export const triggerPanic = async (petId: string) => {
  // 1. Feedback visual inmediato (UX de urgencia)
  toast.loading("Obteniendo ubicación y contactando veterinarios...", { id: "panic" });

  try {
    // 2. Obtener ubicación GPS (Promisificada para limpieza)
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
      });
    });

    const { latitude, longitude } = position.coords;

    // 3. Llamada al Backend de Hono
    const response = await fetch("http://localhost:3000/api/emergency/panic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        petId,
        location: { lat: latitude, lng: longitude },
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error("Fallo en la conexión");

    const data = await response.json();

    // 4. Éxito: Notificar al usuario
    toast.success(`Alerta enviada. ${data.vetsNotified} veterinarios en línea notificados.`, { id: "panic" });
    
    // Aquí podrías redirigir automáticamente a la sala de chat de tele-consulta
    // router.push(`/chat/emergency/${data.chatId}`);

  } catch (error) {
    console.error("Panic Error:", error);
    toast.error("No se pudo enviar la alerta. Llama directamente a emergencias.", { id: "panic" });
  }
};