"use client";

import { ReactNode } from "react";

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  className?: string;
  children: ReactNode;
}

export function ShineBorder({
  borderRadius = 24,
  borderWidth = 1,
  duration = 14,
  color = "#C9A87C",
  className = "",
  children,
}: ShineBorderProps) {
  return (
    <div
      className={`relative rounded-[--border-radius] ${className}`}
      style={{ "--border-radius": `${borderRadius}px` } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[--border-radius] motion-safe:animate-shine"
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": `${duration}s`,
            padding: `${borderWidth}px`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            backgroundImage: `radial-gradient(transparent, transparent, ${
              Array.isArray(color) ? color.join(",") : color
            }, transparent, transparent)`,
            backgroundSize: "300% 300%",
          } as React.CSSProperties
        }
      />
      {children}
    </div>
  );
}
