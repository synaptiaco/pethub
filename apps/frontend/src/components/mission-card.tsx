// apps/frontend/src/components/mission-card.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface MissionCardProps {
  title: string;
  points: number;
  href: string;
  description?: string;
}

export function MissionCard({
  title,
  points,
  href,
  description,
}: MissionCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors">
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Star className="text-primary w-6 h-6 fill-primary/20" />
            </div>
            <div>
              <h4 className="font-bold text-base">{title}</h4>
              <div className="flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full w-fit">
                <Trophy className="w-3 h-3" />+{points} pts
              </div>
            </div>
          </div>

          <Button asChild size="sm" variant="ghost" className="gap-2">
            <Link href={href}>
              Empezar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
