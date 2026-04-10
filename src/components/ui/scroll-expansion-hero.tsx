'use client';

import {
  useEffect,
  useRef,
  useCallback,
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

/**
 * Scroll-driven expansion: the section is 200vh tall. The first 100vh
 * is the sticky hero where the card expands as you scroll. Once you've
 * scrolled past the expansion zone, the hero unsticks and the rest of
 * the page scrolls normally. No scroll hijacking, no preventDefault,
 * no overflow:hidden — just native scrolling driving the animation.
 */
const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  scrollToExpand,
  children,
}: ScrollExpandMediaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const applyProgress = useCallback((p: number) => {
    const mobile = window.innerWidth < 768;
    const startW = mobile ? 220 : 300;
    const startH = mobile ? 300 : 400;
    const maxW = mobile ? window.innerWidth - 16 : Math.min(window.innerWidth - 40, 1550);
    const maxH = mobile ? window.innerHeight - 40 : Math.min(window.innerHeight - 40, 800);

    const w = startW + p * (maxW - startW);
    const h = startH + p * (maxH - startH);
    // Rounded corners shrink as card expands
    const radius = Math.max(0, 24 * (1 - p * 0.7));

    if (mediaRef.current) {
      mediaRef.current.style.width = `${w}px`;
      mediaRef.current.style.height = `${h}px`;
      mediaRef.current.style.borderRadius = `${radius}px`;
    }
    if (bgRef.current) {
      bgRef.current.style.opacity = `${1 - p}`;
    }
    if (hintRef.current) {
      hintRef.current.style.opacity = `${Math.max(0, 1 - p * 3)}`;
    }
  }, []);

  useEffect(() => {
    applyProgress(0);

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        // The container is 200vh. The first 100vh is the sticky zone.
        // scrolled = how far past the top of the container we've scrolled
        const scrolled = -rect.top;
        // expansionZone = the height of the scroll area that drives the animation
        const expansionZone = window.innerHeight;
        const progress = Math.min(Math.max(scrolled / expansionZone, 0), 1);

        applyProgress(progress);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [applyProgress]);

  return (
    <div ref={containerRef} className='relative' style={{ height: '200vh' }}>
      {/* Sticky hero fills the viewport and stays pinned while you scroll through the 200vh container */}
      <div className='sticky top-0 h-[100dvh] overflow-hidden'>
        <div className='relative w-full h-full flex flex-col items-center'>
          {/* Background image — fades out */}
          <div
            ref={bgRef}
            className='absolute inset-0 z-0'
            style={{ willChange: 'opacity' }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-full h-full'
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
            <div className='absolute inset-0 bg-[#0D1A12]/50' />
          </div>

          {/* Expanding media card */}
          <div
            ref={mediaRef}
            className='absolute top-1/2 left-1/2 z-[1] overflow-hidden'
            style={{
              width: '220px',
              height: '300px',
              borderRadius: '24px',
              maxWidth: 'calc(100vw - 16px)',
              maxHeight: '85vh',
              transform: 'translate(-50%, -50%)',
              willChange: 'width, height, border-radius',
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
          <div className='relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none'>
            <div className='max-w-[800px] text-center px-5 sm:px-6 md:px-12 pointer-events-auto'>
              {children}
            </div>

            {/* Scroll hint */}
            <div
              ref={hintRef}
              className='absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-3'
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
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
