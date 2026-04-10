'use client';

import {
  useEffect,
  useRef,
  useCallback,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) => {
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchStartRef = useRef(0);
  const isMobileRef = useRef(false);
  const rafRef = useRef<number>(0);

  const mediaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [, setTick] = useState(0);

  const applyProgress = useCallback((p: number) => {
    const mobile = isMobileRef.current;
    const startW = mobile ? 240 : 300;
    const startH = mobile ? 320 : 400;
    const maxW = mobile ? Math.min(window.innerWidth - 16, 800) : 1550;
    const maxH = mobile ? Math.min(window.innerHeight - 40, 700) : 800;

    const w = startW + p * (maxW - startW);
    const h = startH + p * (maxH - startH);

    if (mediaRef.current) {
      mediaRef.current.style.width = `${w}px`;
      mediaRef.current.style.height = `${h}px`;
    }
    if (bgRef.current) {
      bgRef.current.style.opacity = `${1 - p}`;
    }
    if (hintRef.current) {
      hintRef.current.style.opacity = `${Math.max(0, 1 - p * 4)}`;
    }
  }, []);

  const updateProgress = useCallback((newP: number) => {
    const clamped = Math.min(Math.max(newP, 0), 1);
    progressRef.current = clamped;

    // CRITICAL: Update expanded state SYNCHRONOUSLY so the very next
    // event handler sees the correct value — not inside rAF
    if (clamped >= 1 && !expandedRef.current) {
      expandedRef.current = true;
      setTick(t => t + 1); // trigger re-render to show content
    } else if (clamped < 1 && expandedRef.current) {
      expandedRef.current = false;
      setTick(t => t + 1);
    }

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      applyProgress(clamped);
    });
  }, [applyProgress]);

  const snapIfNeeded = useCallback(() => {
    const p = progressRef.current;
    if (p > 0.8 && p < 1) {
      const animate = () => {
        const current = progressRef.current;
        if (current >= 1) return;
        updateProgress(Math.min(current + 0.04, 1));
        requestAnimationFrame(animate);
      };
      animate();
    } else if (p < 0.2 && p > 0) {
      const animate = () => {
        const current = progressRef.current;
        if (current <= 0) return;
        updateProgress(Math.max(current - 0.04, 0));
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [updateProgress]);

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    applyProgress(0);

    const handleWheel = (e: globalThis.WheelEvent) => {
      // Once expanded, let the page scroll normally
      if (expandedRef.current) {
        // Only intercept: scrolling up while at the very top → collapse
        if (e.deltaY < 0 && window.scrollY <= 5) {
          updateProgress(0.95);
          e.preventDefault();
        }
        return;
      }

      // Not expanded yet — drive the animation
      e.preventDefault();
      const delta = e.deltaY * 0.0015;
      updateProgress(progressRef.current + delta);
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      // ALWAYS record touch start position — even when expanded
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartRef.current - touchY;

      if (expandedRef.current) {
        // Expanded — swipe down at top of page collapses
        if (deltaY < -30 && window.scrollY <= 5) {
          updateProgress(0.95);
          touchStartRef.current = touchY;
          e.preventDefault();
        }
        // Otherwise: do nothing, let browser scroll the page
        return;
      }

      // Not expanded — drive the animation
      e.preventDefault();
      const sensitivity = 0.005;
      updateProgress(progressRef.current + deltaY * sensitivity);
      touchStartRef.current = touchY;
    };

    const handleTouchEnd = () => {
      touchStartRef.current = 0;
      if (!expandedRef.current) {
        snapIfNeeded();
      }
    };

    const handleScroll = () => {
      // Only lock scroll position while animation is in progress
      if (!expandedRef.current && progressRef.current > 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, [applyProgress, updateProgress, snapIfNeeded]);

  const isExpanded = expandedRef.current;

  return (
    <div className='overflow-x-hidden'>
      <section
        className='relative flex flex-col items-center justify-start min-h-[100dvh]'
      >
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          {/* Background image — fades out as card expands */}
          <div
            ref={bgRef}
            className='absolute inset-0 z-0 h-full'
            style={{ willChange: 'opacity' }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-screen h-screen'
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
            <div className='absolute inset-0 bg-[#0D1A12]/50' />
          </div>

          {/* Expanding media card */}
          <div
            ref={mediaRef}
            className='absolute top-1/2 left-1/2 z-[1] rounded-3xl overflow-hidden'
            style={{
              width: '240px',
              height: '320px',
              maxWidth: 'calc(100vw - 16px)',
              maxHeight: '85vh',
              transform: 'translate(-50%, -50%)',
              willChange: 'width, height',
              boxShadow: '0 8px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {mediaType === 'video' ? (
              <video
                src={mediaSrc}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload='auto'
                className='w-full h-full object-cover'
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
              />
            ) : (
              <Image
                src={mediaSrc}
                alt='Hero media'
                width={1280}
                height={720}
                className='w-full h-full object-cover'
                priority
              />
            )}
            <div className='absolute inset-0 bg-[#0D1A12]/40' />
          </div>

          {/* Hero text */}
          <div className='relative z-10 flex flex-col items-center justify-center w-full h-[100dvh] pointer-events-none'>
            <div className='max-w-[800px] text-center px-5 sm:px-6 md:px-12 pointer-events-auto'>
              {children}
            </div>

            {/* Scroll hint — hidden once expanded */}
            <div
              ref={hintRef}
              className='absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-3'
              style={{
                willChange: 'opacity',
                display: isExpanded ? 'none' : 'flex',
              }}
            >
              {scrollToExpand && (
                <p className='text-accent text-xs uppercase tracking-[0.3em] font-medium'>
                  {scrollToExpand}
                </p>
              )}
              <div className='w-px h-8 bg-accent/30 animate-pulse' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
