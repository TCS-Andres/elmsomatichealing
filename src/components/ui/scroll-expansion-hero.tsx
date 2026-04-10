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

  const [showContent, setShowContent] = useState(false);

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
    if (hintRef.current) {
      hintRef.current.style.opacity = `${1 - p * 3}`;
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

          {/* Expanding media card — sits BEHIND the text (z-[1]) */}
          <div
            ref={mediaRef}
            className='absolute top-1/2 left-1/2 z-[1] rounded-3xl overflow-hidden'
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

            {/* Dark overlay on the image so it doesn't compete with text */}
            <div className='absolute inset-0 bg-[#0D1A12]/40' />
          </div>

          {/* Hero text — sits ABOVE the card (z-10), never moves */}
          <div className='relative z-10 flex flex-col items-center justify-center w-full h-[100dvh] pointer-events-none'>
            <div className='max-w-[800px] text-center px-6 md:px-12 pointer-events-auto'>
              {children}
            </div>

            {/* Scroll hint */}
            <div
              ref={hintRef}
              className='absolute bottom-12 flex flex-col items-center gap-3'
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
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
