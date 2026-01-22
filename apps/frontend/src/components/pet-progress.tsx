// apps/frontend/src/components/pet-progress.tsx
"use client"

import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface PetProgressProps {
  percentage: number
}

export function PetProgress({ percentage }: PetProgressProps) {
  return (
    <div className="bg-card p-6 rounded-2xl border shadow-sm space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="font-bold text-lg">Nivel de Perfil</h3>
          <p className="text-sm text-muted-foreground">
            {percentage === 100 ? "¡Perfil Legendario! ✨" : "Sigue completando misiones"}
          </p>
        </div>
        <span className="text-2xl font-black text-primary">{percentage}%</span>
      </div>
      
      <div className="relative">
        <Progress value={percentage} className="h-3" />
        {/* Pequeño destello animado si el progreso cambia */}
        <motion.div 
          className="absolute top-0 left-0 h-3 bg-white/30 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  )
}