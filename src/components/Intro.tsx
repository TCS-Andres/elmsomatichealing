"use client";

import ScrollReveal from "./ScrollReveal";

export default function Intro() {
  return (
    <section id="method" className="py-28 px-6 md:px-12">
      <ScrollReveal>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center">
          {/* Left Column */}
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent mb-6">
              The Philosophy
            </p>
            <h2
              className="font-serif font-light leading-[1.25] mb-8"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
            >
              We cannot think our way out of what the body is holding.
            </h2>
            <div className="space-y-6 text-text-muted text-[0.95rem]">
              <p>
                If you&apos;re here, it&apos;s likely because something in you
                knows there is more to healing than just managing symptoms. Maybe
                you feel anxious or disconnected from your body. Maybe
                you&apos;re carrying emotions you haven&apos;t had space or
                safety to feel.
              </p>
              <p>
                These sessions were born from years of sitting with patients
                whose nervous systems were stuck in survival mode — people who
                had done everything right and still did not feel free.
              </p>
              <p>
                This work is not about fixing you. You are not broken. You are
                whole — you have just forgotten.
              </p>
            </div>
          </div>

          {/* Right Column — Glass testimonial */}
          <div
            className="relative p-6 sm:p-8 md:p-12 rounded-3xl"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px) saturate(1.6)",
              WebkitBackdropFilter: "blur(24px) saturate(1.6)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <span className="absolute top-2 left-4 sm:top-4 sm:left-8 font-serif text-4xl sm:text-6xl text-accent opacity-20 select-none">
              &ldquo;
            </span>
            <blockquote className="font-serif text-[1.4rem] italic leading-[1.6] mt-6">
              After two years of infertility, I&apos;m so happy to send you this
              email. We&apos;re 12 weeks pregnant. I had my session with you in
              September and conceived our baby in November, naturally.
            </blockquote>
            <p className="font-sans text-[0.75rem] uppercase tracking-[0.15em] text-text-dim mt-6">
              — Mia
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
