import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPetFromHono } from "@/lib/api";

export default async function VetConsultPage(props: {
  params: Promise<{ id: string }>; // Definimos params como una Promesa
}) {
  const resolvedParams = await props.params;
  const petId = resolvedParams.id;
  const pet = await getPetFromHono(petId);

  function calculateAge(birthDate: string | undefined): React.ReactNode {
    if (!birthDate) return "Edad desconocida";
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return "Edad desconocida";
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
      years--;
      months += 12;
    }
    if (years > 0) {
      return `${years} año${years > 1 ? "s" : ""}${
        months > 0 ? `, ${months} mes${months > 1 ? "es" : ""}` : ""
      }`;
    }
    if (months > 0) {
      return `${months} mes${months > 1 ? "es" : ""}`;
    }
    return "Menos de 1 mes";
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl">
          {pet.photoUrl ? (
            <img src={pet.photoUrl} className="rounded-full" />
          ) : (
            "🐾"
          )}
        </div>
        <div>
          <h1 className="text-xl font-black">{pet.name}</h1>
          <p className="text-sm text-muted-foreground">
            {pet.species} • {calculateAge(pet.birthDate)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 bg-blue-50/50 border-blue-100">
          <p className="text-[10px] uppercase font-bold text-blue-600">
            Última Vacuna
          </p>
          <p className="text-sm font-bold">Pendiente</p>
        </Card>
        <Card className="p-3 bg-green-50/50 border-green-100">
          <p className="text-[10px] uppercase font-bold text-green-600">Peso</p>
          <p className="text-sm font-bold">No registrado</p>
        </Card>
      </div>

      {/* Botón de acción rápida para el veterinario */}
      <Button className="w-full bg-slate-900 text-white">
        Iniciar Registro de Consulta
      </Button>
    </div>
  );
}
