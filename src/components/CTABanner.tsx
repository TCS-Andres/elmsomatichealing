"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export default function CTABanner() {
  return (
    <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-12 text-center relative overflow-hidden">
      {/* Background image with warm tones */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop"
          alt="Warm golden light"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0D1A12]/75" />
      </div>

      <ScrollReveal>
        <h2
          className="font-serif font-light mb-4 relative z-10"
          style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
        >
          You are whole. You have just forgotten.
        </h2>
        <p className="text-text-muted text-[0.95rem] mb-10 relative z-10">
          Begin the return to yourself.
        </p>
        <a
          href="#sessions"
          onClick={(e) => handleClick(e, "#sessions")}
          className="relative z-10 inline-block py-3 px-6 sm:py-4 sm:px-8 md:px-14 bg-accent text-bg text-xs sm:text-[0.75rem] uppercase tracking-[0.2em] font-medium rounded-full hover:bg-text transition-all duration-400"
        >
          Book Your Session
        </a>
      </ScrollReveal>
    </section>
  );
}
