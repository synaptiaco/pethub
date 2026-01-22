# 🐾 PetHub Universe - MVP
Monorepo para la gestión digital de mascotas.

## 🚀 Stack Tecnológico
- **Frontend:** Next.js 15 (React 19) + Tailwind v4 + Shadcn UI.
- **Backend:** Hono (Node.js) + Drizzle ORM.
- **Infraestructura:** Docker (PostgreSQL + pgAdmin).
- **Compartido:** Monorepo con Workspaces y Zod para validación E2E.

## 🛠️ Instalación
1. `npm install`
2. `docker-compose up -d`
3. `cd apps/backend && npx drizzle-kit push`
4. `npm run dev`