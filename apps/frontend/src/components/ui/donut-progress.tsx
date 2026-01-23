"use client";

import { motion } from "framer-motion";

interface DonutProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export function DonutProgress({
  percentage,
  size = 160,
  strokeWidth = 12,
}: DonutProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        {/* Círculo de Fondo (Track) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
        />
        {/* Círculo de Progreso (Indicator) */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
        {/* Definición del Gradiente Colorido */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" /> {/* Indigo */}
            <stop offset="100%" stopColor="#ec4899" /> {/* Rosa */}
          </linearGradient>
        </defs>
      </svg>

      {/* Texto Central */}
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl font-black text-foreground"
        >
          {Math.round(percentage)}%
        </motion.span>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
          Completado
        </span>
      </div>
    </div>
  );
}
