"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Trophy, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { updatePetBirthDate } from "./actions";
import { useSearchParams } from "next/navigation";

export default function TimeMissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);
  const [won, setWon] = useState(false);

  const searchParams = useSearchParams();
  const petName = searchParams.get("name") || "Tu mascota";

  const handleComplete = async () => {
    if (!date) return;
    setLoading(true);

    try {
      await updatePetBirthDate(id, date);

      // ¡Efectos visuales de victoria!
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#f59e0b", "#10b981"],
      });

      setWon(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-10 px-4">
      <Link
        href={`/pets/${id}`}
        className="flex items-center text-sm text-muted-foreground mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Volver al perfil
      </Link>

      <p className="text-xl font-bold">
        ¡{petName} se ha unido a la manada! 🐾
      </p>

      <AnimatePresence mode="wait">
        {!won ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="border-primary/20 shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Misión: Guardián del Tiempo
                </CardTitle>
                <p className="text-muted-foreground">
                  Registra su cumpleaños para desbloquear recordatorios de
                  salud.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center border rounded-lg p-2 bg-card">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </div>
                <Button
                  className="w-full h-12 text-lg font-bold transition-all hover:scale-[1.02]"
                  onClick={handleComplete}
                  disabled={loading}
                >
                  {loading ? "Guardando..." : "Completar Misión +20 pts"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-10"
          >
            <div className="relative mx-auto w-48 h-48">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-yellow-400/30 rounded-full blur-2xl"
              />
              <div className="relative bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 w-48 h-48 rounded-full flex items-center justify-center border-8 border-white shadow-2xl">
                <Trophy className="w-24 h-24 text-white drop-shadow-lg" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl font-black text-primary tracking-tight">
                ¡LOGRO DESBLOQUEADO!
              </h2>
              <p className="text-xl font-medium text-muted-foreground">
                Has obtenido el badge: <b>Guardián del Tiempo</b>
              </p>
            </div>

            <Button asChild variant="outline" className="mt-4">
              <Link href={`/pets/${id}`}>Ir a la siguiente misión</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
