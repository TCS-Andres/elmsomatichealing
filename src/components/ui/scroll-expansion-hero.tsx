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
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  const [showContent, setShowContent] = useState(false);

  // Direct DOM updates — no React re-render needed
  const applyProgress = useCallback((p: number) => {
    const mobile = isMobileRef.current;
    const w = 300 + p * (mobile ? 650 : 1250);
    const h = 400 + p * (mobile ? 200 : 400);

    if (mediaRef.current) {
      mediaRef.current.style.width = `${w}px`;
      mediaRef.current.style.height = `${h}px`;
    }
    if (bgRef.current) {
      bgRef.current.style.opacity = `${1 - p}`;
    }
    if (overlayRef.current) {
      overlayRef.current.style.opacity = `${0.7 - p * 0.4}`;
    }
    if (hintRef.current) {
      hintRef.current.style.opacity = `${1 - p * 3}`;
    }
    if (heroTextRef.current) {
      // Text fades in during the last 40% of progress
      const textProgress = Math.max(0, (p - 0.6) / 0.4);
      heroTextRef.current.style.opacity = `${textProgress}`;
      heroTextRef.current.style.transform = `translateY(${20 - textProgress * 20}px)`;
    }
  }, []);

  const updateProgress = useCallback((newP: number) => {
    const clamped = Math.min(Math.max(newP, 0), 1);
    progressRef.current = clamped;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      applyProgress(clamped);

      if (clamped >= 1 && !expandedRef.current) {
        expandedRef.current = true;
        setShowContent(true);
      } else if (clamped < 1 && expandedRef.current) {
        expandedRef.current = false;
        setShowContent(false);
      }
    });
  }, [applyProgress]);

  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Apply initial state
    applyProgress(0);

    const handleWheel = (e: globalThis.WheelEvent) => {
      if (expandedRef.current) {
        if (e.deltaY < 0 && window.scrollY <= 5) {
          expandedRef.current = false;
          setShowContent(false);
          updateProgress(0.99);
          e.preventDefault();
        }
        return;
      }

      e.preventDefault();
      const delta = e.deltaY * 0.0012;
      updateProgress(progressRef.current + delta);
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartRef.current) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartRef.current - touchY;

      if (expandedRef.current) {
        if (deltaY < -20 && window.scrollY <= 5) {
          expandedRef.current = false;
          setShowContent(false);
          updateProgress(0.99);
          e.preventDefault();
        }
        return;
      }

      e.preventDefault();
      const factor = deltaY < 0 ? 0.008 : 0.005;
      updateProgress(progressRef.current + deltaY * factor);
      touchStartRef.current = touchY;
    };

    const handleTouchEnd = () => {
      touchStartRef.current = 0;
    };

    const handleScroll = () => {
      if (!expandedRef.current) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
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
  }, [applyProgress, updateProgress]);

  return (
    <div className='overflow-x-hidden'>
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          {/* Background image */}
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
            <div className='absolute inset-0 bg-[#0D1A12]/40' />
          </div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              {/* Expanding media card */}
              <div
                ref={mediaRef}
                className='absolute z-10 top-1/2 left-1/2 rounded-3xl overflow-hidden'
                style={{
                  width: '300px',
                  height: '400px',
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  transform: 'translate(-50%, -50%)',
                  willChange: 'width, height',
                  boxShadow: '0 8px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
                }}
              >
                {mediaType === 'video' ? (
                  <div className='relative w-full h-full'>
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
                  </div>
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt='Hero media'
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover'
                      priority
                    />
                  </div>
                )}

                {/* Dark overlay */}
                <div
                  ref={overlayRef}
                  className='absolute inset-0 bg-[#0D1A12]/60'
                  style={{ opacity: 0.7, willChange: 'opacity' }}
                />

                {/* Hero text overlaid on the media */}
                <div
                  ref={heroTextRef}
                  className='absolute inset-0 z-20 flex items-center justify-center px-6 md:px-12'
                  style={{ opacity: 0, willChange: 'opacity, transform' }}
                >
                  <div className='max-w-[720px] text-center'>
                    <p className='text-[0.7rem] uppercase tracking-[0.35em] text-accent mb-6'>
                      Somatic Healing with Dr. Christian Gonzalez
                    </p>
                    <h1
                      className='font-serif font-light leading-[1.15] mb-6 text-text'
                      style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                    >
                      Your body remembers what your mind has buried.{' '}
                      <em className='text-accent'>This is where we begin.</em>
                    </h1>
                    <p className='text-[0.95rem] md:text-[1.05rem] text-text-muted max-w-[520px] mx-auto mb-10'>
                      The Emotional Liberation Method is a body-based practice to access,
                      express, and release the repressed emotions your nervous system has
                      been holding — so you can finally heal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scroll hint */}
              <div
                ref={hintRef}
                className='absolute bottom-12 z-20 flex flex-col items-center gap-3'
                style={{ willChange: 'opacity' }}
              >
                {scrollToExpand && (
                  <p className='text-accent text-[0.7rem] uppercase tracking-[0.3em] font-medium'>
                    {scrollToExpand}
                  </p>
                )}
                <div className='w-px h-8 bg-accent/30 animate-pulse' />
              </div>
            </div>

            {/* Content that appears after full expansion */}
            <div
              className='flex flex-col w-full transition-opacity duration-700'
              style={{ opacity: showContent ? 1 : 0, pointerEvents: showContent ? 'auto' : 'none' }}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
