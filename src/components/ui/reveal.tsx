"use client";

import { motion, type HTMLMotionProps } from "motion/react";

export function Reveal({ children, delay = 0, className = "" }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({ children, className = "" }: HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.25, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
