"use client";

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
    <section className="py-32 px-6 md:px-12 text-center relative overflow-hidden">
      {/* Accent glow */}
      <div
        className="absolute inset-0 pointer-events-none animate-pulse"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(196,168,130,0.15) 0%, transparent 70%)",
          animationDuration: "4s",
        }}
      />

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
          className="relative z-10 inline-block py-4 px-14 bg-accent text-bg text-[0.75rem] uppercase tracking-[0.2em] font-medium hover:bg-text transition-all duration-400"
        >
          Book Your Session
        </a>
      </ScrollReveal>
    </section>
  );
}
