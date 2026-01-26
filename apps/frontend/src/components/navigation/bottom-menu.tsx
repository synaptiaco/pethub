// apps/frontend/src/components/navigation/bottom-menu.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MENUS } from "@/config/navigation";
import { AlertCircle, QrCode } from "lucide-react"; // Para el Botón de Pánico

export function BottomMenu({ role = "CLIENT" }: { role: keyof typeof MENUS }) {
  const pathname = usePathname();
  const currentMenu = MENUS[role];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-secondary pb-safe">
      <div className="flex justify-around items-end h-16 px-2 relative">
        {/* Renderizado Dinámico de Items */}
        {currentMenu.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          // Caso especial: Botón central destacado (Pánico o QR)
          if (item.center || (role === "CLIENT" && index === 2)) {
            // Ajuste para el cliente: desplazamos para insertar el botón de pánico central
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center w-full py-2 group"
            >
              <div
                className={cn(
                  "p-1 rounded-xl transition-all",
                  isActive
                    ? "text-primary scale-110"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              >
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* BOTÓN CENTRAL FLOTANTE (CLIENTE: PÁNICO / COMERCIO: QR) */}
        {role === "CLIENT" && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <button className="bg-red-600 text-white p-4 rounded-full shadow-lg shadow-red-200 border-4 border-white active:scale-95 transition-transform">
              <AlertCircle className="w-7 h-7" />
            </button>
          </div>
        )}

        {role === "MERCHANT" && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <Link
              href="/merchant/verify"
              className="bg-primary text-white p-4 rounded-full shadow-lg shadow-primary/30 border-4 border-white flex items-center justify-center active:scale-95 transition-transform"
            >
              <QrCode className="w-7 h-7" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
