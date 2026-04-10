'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'gold' | 'sage' | 'warm' | 'cream';
  featured?: boolean;
}

const glowColorMap = {
  gold: { base: 35, spread: 30, saturation: 55, lightness: 60 },
  sage: { base: 140, spread: 40, saturation: 25, lightness: 50 },
  warm: { base: 25, spread: 20, saturation: 50, lightness: 55 },
  cream: { base: 38, spread: 25, saturation: 40, lightness: 65 },
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'gold',
  featured = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', e.clientX.toFixed(2));
        cardRef.current.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', e.clientY.toFixed(2));
        cardRef.current.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread, saturation, lightness } = glowColorMap[glowColor];

  return (
    <div
      ref={cardRef}
      data-glow
      className={`relative rounded-3xl ${className}`}
      style={{
        '--base': base,
        '--spread': spread,
        '--saturation': saturation,
        '--lightness': lightness,
        '--radius': '24',
        '--border': '1',
        '--size': '250',
        '--outer': '1',
        '--border-size': 'calc(var(--border, 1) * 1px)',
        '--spotlight-size': 'calc(var(--size, 250) * 1px)',
        '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
        backgroundImage: `radial-gradient(
          var(--spotlight-size) var(--spotlight-size) at
          calc(var(--x, 0) * 1px)
          calc(var(--y, 0) * 1px),
          hsl(var(--hue, 35) calc(var(--saturation, 55) * 1%) calc(var(--lightness, 60) * 1%) / 0.08), transparent
        )`,
        backgroundColor: featured ? 'rgba(201,168,124,0.06)' : 'rgba(255,255,255,0.04)',
        backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
        backgroundPosition: '50% 50%',
        backgroundAttachment: 'fixed',
        border: featured
          ? '1px solid rgba(201,168,124,0.25)'
          : '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(20px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
        touchAction: 'none',
      } as React.CSSProperties}
    >
      {/* Outer glow layer */}
      <div
        data-glow
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'filter',
          opacity: 'var(--outer, 1)' as unknown as number,
          borderRadius: 'calc(var(--radius) * 1px)',
          borderWidth: 'calc(var(--border-size) * 20)',
          filter: 'blur(calc(var(--border-size) * 10))',
          background: 'none',
          pointerEvents: 'none',
          border: 'none',
        }}
      />
      {children}
    </div>
  );
};

export { GlowCard };
