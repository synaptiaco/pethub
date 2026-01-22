"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PetSchema, type Pet } from "@pethub/shared";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { PawPrintIcon } from "lucide-react";

export function PetForm() {
  const form = useForm<Pet>({
    resolver: zodResolver(PetSchema),
    defaultValues: { name: "", species: "Dog", birthDate: "" },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (newPet: Pet) => {
      const res = await fetch("http://localhost:5000/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPet),
      });
      if (!res.ok) throw new Error("Error al registrar mascota");
      return res.json();
    },
    onSuccess: (response) => {
      form.reset();

      const pet = response.data;

      toast.success(`¡${pet.name} se ha unido a la manada!`, {
        description: "Su perfil está al 20%. ¡Sigue así! 🐾",
        icon: <PawPrintIcon className="text-pastel-blue" />,
      });

      // Usamos el ID generado por la DB
      router.push(`/pets/${pet.id}/mission/time?name=${pet.name}`);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Mascota</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Haku" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Add more fields like Species or BirthDate */}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Registrando..." : "Crear Perfil Digital"}
        </Button>
      </form>
    </Form>
  );
}
