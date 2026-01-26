// apps/frontend/src/config/navigation.ts
import { 
  Home, Map, PawPrint, User, // Cliente
  MessageSquare, History, Calendar, Briefcase, // Veterinario
  BarChart3, QrCode, Store, LifeBuoy, // Comercio
  Activity, CheckCircle, ShieldAlert, Settings, // Admin
  LucideProps
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const MENUS:{
  [key in "ADMIN" |"CLIENT" | "VET" | "MERCHANT"]: {
    label: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    href: string;
    center?: boolean;
  }[];
} = {
  CLIENT: [
    { label: "Home", icon: Home, href: "/" },
    { label: "Explorar", icon: Map, href: "/explore" },
    { label: "Mascotas", icon: PawPrint, href: "/pets" },
    { label: "Perfil", icon: User, href: "/profile" },
  ],
  VET: [
    { label: "Consultas", icon: MessageSquare, href: "/vet/consults" },
    { label: "Historiales", icon: History, href: "/vet/history" },
    { label: "Agenda", icon: Calendar, href: "/vet/schedule" },
    { label: "Cuenta", icon: Briefcase, href: "/vet/account" },
  ],
  MERCHANT: [
    { label: "Dashboard", icon: BarChart3, href: "/merchant/stats" },
    { label: "Validar", icon: QrCode, href: "/merchant/verify", center: true },
    { label: "Local", icon: Store, href: "/merchant/profile" },
    { label: "Soporte", icon: LifeBuoy, href: "/merchant/support" },
  ],
  ADMIN: [
    { label: "KPIs", icon: Activity, href: "/admin/metrics" },
    { label: "Aprobaciones", icon: CheckCircle, href: "/admin/approvals" },
    { label: "Reportes", icon: ShieldAlert, href: "/admin/reports" },
    { label: "Ajustes", icon: Settings, href: "/admin/settings" },
  ]
};