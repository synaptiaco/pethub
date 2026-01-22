import { PetProgress } from "@/components/pet-progress";
import { MissionCard } from "@/components/mission-card";
import { getPetFromHono } from "@/lib/api";

export default async function PetDashboard({
  params,
}: {
  params: { id: string };
}) {
  // Simulamos obtener los datos de tu API de Hono
  const pet = await getPetFromHono(params.id);

  // Lógica para determinar qué misión sigue
  const missions = [
    {
      id: "time",
      label: "Guardián del Tiempo",
      isDone: !!pet.birthDate,
      points: 20,
    },
    {
      id: "photo",
      label: "Identidad Visual",
      isDone: !!pet.photoUrl,
      points: 30,
    },
  ];

  const nextMission = missions.find((m) => !m.isDone);

  // Calculamos el porcentaje basado en los campos llenos
  const steps = [pet.name, pet.birthDate, pet.photoUrl];
  const completedSteps = steps.filter(Boolean).length;
  const percentage = (completedSteps / steps.length) * 100;

  return (
    <div className="container py-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Perfil de {pet.name} 🐾</h1>
      </header>

      <PetProgress percentage={percentage} />

      {percentage < 100 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Misiones Pendientes</h2>
          <div className="grid gap-4">
            {!pet.birthDate && (
              <MissionCard
                title="Guardián del Tiempo"
                points={20}
                href={`/pets/${params.id}/mission/time`}
              />
            )}
            {/* Próximas misiones aquí */}
          </div>
        </section>
      )}
    </div>
  );
}
