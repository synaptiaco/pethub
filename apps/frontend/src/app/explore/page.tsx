"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Filter } from "lucide-react";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* Header de Búsqueda */}
      <div className="bg-white px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-sm">
        <h1 className="text-2xl font-black mb-4">Explorar Aliados</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar veterinarias o spas..."
            className="pl-10 bg-slate-100 border-none rounded-2xl h-12"
          />
        </div>

        {/* Categorías Rápidas */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2 no-scrollbar">
          {["🏥 Veterinarias", "🛁 Spas", "🦴 Tiendas", "🏨 Hoteles"].map(
            (cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="whitespace-nowrap px-4 py-2 rounded-xl bg-white border shadow-sm"
              >
                {cat}
              </Badge>
            )
          )}
        </div>
      </div>

      {/* Listado de Resultados */}
      <div className="px-6 mt-8 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-slate-500 underline flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Chía, Cundinamarca
          </p>
          <Filter className="w-4 h-4 text-primary" />
        </div>

        {/* Tarjeta de Veterinaria */}
        {[1, 2].map((i) => (
          <Card
            key={i}
            className="overflow-hidden rounded-3xl border-none shadow-md group active:scale-[0.98] transition-all"
          >
            <div className="relative h-40 w-full bg-slate-200">
              <img
                src={
                  i === 1
                    ? "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500"
                    : "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500"
                }
                className="w-full h-full object-cover"
                alt="Vet"
              />
              <Badge className="absolute top-3 left-3 bg-white/90 text-primary font-black backdrop-blur-md">
                ⭐ 4.8
              </Badge>
            </div>
            <div className="p-4 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-lg">Veterinaria ProChía</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Variante Chía-Cota
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] border-primary text-primary border-2"
                >
                  15% DTO
                </Badge>
              </div>
              <p className="mt-3 text-xs font-bold text-green-600 bg-green-50 p-2 rounded-lg">
                🎁 Beneficio: Limpieza dental gratuita por suscripción.
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
