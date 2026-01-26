import { BottomMenu } from "@/components/navigation/bottom-menu";
import "./globals.css"; // Donde pusiste @import "tailwindcss";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Aquí obtendríamos el rol real desde la sesión de Google
  const userRole = "CLIENT";

  return (
    <html lang="es">
      <body className="antialiased pb-24">
        {" "}
        <Providers>{children}</Providers>
        <BottomMenu role={userRole} />
      </body>
    </html>
  );
}
