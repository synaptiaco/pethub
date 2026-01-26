// apps/frontend/src/components/emergency/panic-radar.tsx
import { motion } from "framer-motion";

export function PanicRadar() {
  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-red-500 rounded-full"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="bg-red-600 text-white p-4 rounded-full z-10 shadow-xl">
        <span className="font-bold text-xs uppercase">Buscando</span>
      </div>
    </div>
  );
}
