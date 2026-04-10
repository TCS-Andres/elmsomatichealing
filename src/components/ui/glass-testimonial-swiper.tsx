'use client';

import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';

export interface Testimonial {
  id: string | number;
  name: string;
  quote: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  visibleBehind?: number;
}

export const TestimonialStack = ({ testimonials, visibleBehind = 2 }: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  if (!testimonials?.length) return null;

  return (
    <div className="testimonial-stack-wrapper relative pb-14">
      <div className="testimonial-stack relative" style={{ height: '320px' }}>
        {testimonials.map((testimonial, index) => {
          const displayOrder = (index - activeIndex + totalCards) % totalCards;

          const style: CSSProperties = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transition: isDragging && displayOrder === 0 ? 'none' : 'all 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
            cursor: displayOrder === 0 ? 'grab' : 'default',
            userSelect: 'none',
          };

          if (displayOrder === 0) {
            style.transform = `translateX(${dragOffset}px)`;
            style.opacity = 1;
            style.zIndex = totalCards;
          } else if (displayOrder <= visibleBehind) {
            const scale = 1 - 0.05 * displayOrder;
            const translateY = -1.5 * displayOrder;
            style.transform = `scale(${scale}) translateY(${translateY}rem)`;
            style.opacity = 1 - 0.25 * displayOrder;
            style.zIndex = totalCards - displayOrder;
          } else {
            style.transform = 'scale(0.85) translateY(-4rem)';
            style.opacity = 0;
            style.zIndex = 0;
            style.pointerEvents = 'none';
          }

          return (
            <div
              ref={el => { cardRefs.current[index] = el; }}
              key={testimonial.id}
              className="rounded-3xl overflow-hidden"
              style={{
                ...style,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(24px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
              onMouseDown={(e) => handleDragStart(e, index)}
              onTouchStart={(e) => handleDragStart(e, index)}
            >
              <div className="p-8 md:p-10 flex flex-col h-full">
                {/* Decorative quote mark */}
                <span className="font-serif text-5xl text-accent opacity-25 leading-none mb-2 select-none">
                  &ldquo;
                </span>

                <blockquote className="font-serif text-[1.15rem] md:text-[1.3rem] italic leading-[1.7] text-text flex-1 mb-6">
                  {testimonial.quote}
                </blockquote>

                <div
                  className="pt-5 flex items-center gap-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {/* Avatar circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-bg text-[0.7rem] font-medium uppercase tracking-wider shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C9A87C, #7A9A82)' }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <p className="text-[0.8rem] uppercase tracking-[0.12em] text-text-muted">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination dots */}
      <div className="flex gap-2 justify-center mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to testimonial ${index + 1}`}
            onClick={() => navigate(index)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: activeIndex === index ? '#C9A87C' : 'rgba(255,255,255,0.15)',
              transform: activeIndex === index ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  );
};
