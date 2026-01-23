import { DonutProgress } from "@/components/ui/donut-progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Camera, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { MissionCard } from "@/components/mission-card";
import { getPetFromHono } from "@/lib/api";

export default async function PetDashboard(props: {
  params: Promise<{ id: string }>; // Definimos params como una Promesa
}) {
  // 1. Esperamos a que los params se resuelvan
  const resolvedParams = await props.params;
  const petId = resolvedParams.id;
  const pet = await getPetFromHono(petId);

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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pb-20">
      {/* Header con Dona */}
      <section className="pt-12 pb-8 px-6 flex flex-col items-center bg-white rounded-b-[3rem] shadow-sm border-b">
        <DonutProgress percentage={percentage} />
        <h1 className="mt-6 text-2xl font-black text-center">
          ¡Potencia el perfil de{" "}
          <span className="text-primary">{pet.name}</span>!
        </h1>
        <p className="text-muted-foreground text-sm text-center mt-2 max-w-[250px]">
          Completa las misiones para convertirte en un **Dueño Pro**.
        </p>
      </section>

      {/* Misiones Listado */}
      <div className="px-6 mt-8 space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" /> Misiones Disponibles
        </h2>

        {/* Misión: Tiempo */}
        <Link href={`/pets/${petId}/mission/time`}>
          <Card className="p-4 flex items-center justify-between hover:border-primary transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Guardián del Tiempo</p>
                <p className="text-xs text-muted-foreground">
                  +20 puntos • Badge Oro
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Card>
        </Link>

        {/* Misión: Foto */}
        <Link href={`/pets/${petId}/mission/photo`}>
          <Card className="p-4 flex items-center justify-between opacity-80 hover:opacity-100 transition-all border-dashed">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Identidad Visual</p>
                <p className="text-xs text-muted-foreground">
                  +40 puntos • Badge Cámara
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Card>
        </Link>
      </div>

      <div className="grid gap-4">
        {!pet.birthDate && (
          <MissionCard
            title="Guardián del Tiempo"
            points={20}
            href={`/pets/${petId}/mission/time`}
          />
        )}
        {/* Próximas misiones aquí */}
      </div>
    </div>
  );
}
