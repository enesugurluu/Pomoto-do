"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  spotlightClassName,
  revealColors = [
    [59, 130, 246] as [number, number, number],
    [139, 92, 246] as [number, number, number],
  ],
  dotSize = 3,
  showCanvas = true,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
  spotlightClassName?: string;
  revealColors?: [number, number, number][];
  dotSize?: number;
  showCanvas?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div
      className={cn(
        "group/spotlight relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-8 shadow-lg shadow-primary/10 backdrop-blur",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 opacity-0 transition duration-300 group-hover/spotlight:opacity-100",
          spotlightClassName,
        )}
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {showCanvas && isHovering && (
          <CanvasRevealEffect
            animationSpeed={1.2}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={revealColors}
            dotSize={dotSize}
            className="opacity-90"
          />
        )}
      </motion.div>
      {children}
    </div>
  );
};
