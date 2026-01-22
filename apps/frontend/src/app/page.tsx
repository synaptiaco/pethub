import { PetForm } from "@/components/pet-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PawPrint, Stethoscope, ShoppingBag } from "lucide-react";
import { Toaster } from "sonner";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-50/50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header con estilo de Hub */}
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 flex items-center gap-3">
            <PawPrint className="text-indigo-600 w-10 h-10" />
            PetHub Universe
          </h1>
          <p className="text-zinc-500 text-lg">
            Gestiona el universo de tu mascota desde un solo lugar.
          </p>
        </header>

        <Toaster />

        {/* Sistema de Tabs Vanguardista */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex gap-2">
              <PawPrint className="w-4 h-4" /> Perfil Digital
            </TabsTrigger>
            <TabsTrigger value="vets" className="flex gap-2">
              <Stethoscope className="w-4 h-4" /> Veterinarios
            </TabsTrigger>
            <TabsTrigger value="market" className="flex gap-2">
              <ShoppingBag className="w-4 h-4" /> Mercado
            </TabsTrigger>
          </TabsList>

          {/* Contenido: Perfil Digital (Donde vive nuestro Form) */}
          <TabsContent value="profile">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg border-zinc-200">
                <CardHeader>
                  <CardTitle>Registrar Nueva Mascota</CardTitle>
                  <CardDescription>
                    Crea el pasaporte digital para que especialistas puedan
                    acceder a su historial.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PetForm />
                </CardContent>
              </Card>

              {/* Espacio para la lista de mascotas (Próximo paso) */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Mis Mascotas</h3>
                <div className="p-8 border-2 border-dashed border-zinc-200 rounded-xl flex flex-col items-center justify-center text-zinc-400">
                  <PawPrint className="w-12 h-12 mb-2 opacity-20" />
                  <p>Aún no tienes mascotas registradas.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vets">
            <Card>
              <CardHeader>
                <CardTitle>Directorio de Especialistas</CardTitle>
                <CardDescription>
                  Próximamente: Busca veterinarias en Chía y Bogotá.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="market">
            <Card>
              <CardHeader>
                <CardTitle>Pet Store</CardTitle>
                <CardDescription>
                  Próximamente: Ropa, juguetes y medicamentos autorizados.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
