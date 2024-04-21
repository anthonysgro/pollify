"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function MotionContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      className={cn(className)}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false }}
      initial={{ y: 50, opacity: 0 }}
      transition={{
        type: "spring",
        damping: 14,
      }}
    >
      {children}
    </motion.div>
  );
}

export { MotionContent };
