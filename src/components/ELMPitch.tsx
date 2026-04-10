"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function ELMPitch() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-10">
        <ScrollReveal>
          <p className="text-xs sm:text-[0.75rem] uppercase tracking-[0.3em] text-accent mb-8 sm:mb-10 text-center">
            The Method
          </p>
          <h2
            className="font-serif font-light leading-[1.15] text-center mb-10 sm:mb-14"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Emotional Liberation Method
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6 sm:mb-8">
          {/* Left — Image */}
          <ScrollReveal>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative">
              <Image
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop"
                alt="Sunlit meditation and healing"
                width={1200}
                height={900}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A12]/30 via-transparent to-transparent" />
            </div>
          </ScrollReveal>

          {/* Right — Copy */}
          <ScrollReveal delay={0.15}>
            <div
              className="rounded-3xl p-6 sm:p-8 md:p-10 space-y-5 h-full flex flex-col justify-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px) saturate(1.6)",
                WebkitBackdropFilter: "blur(20px) saturate(1.6)",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <p className="text-text text-[0.95rem] sm:text-[1rem] leading-[1.8] font-normal">
                ELM is not therapy. It is not mindset work. It is a return to the body.
              </p>
              <p className="text-text-muted text-[0.9rem] sm:text-[0.95rem] leading-[1.8]">
                The Emotional Liberation Method is a somatic healing practice
                developed by Dr. Christian Gonzalez that works directly with the
                nervous system, fascia, and the body&apos;s stored emotional
                patterns. It combines breathwork, vocalization, and guided somatic
                release to access what talk therapy and conventional medicine
                cannot reach.
              </p>
              <p className="text-text-muted text-[0.9rem] sm:text-[0.95rem] leading-[1.8]">
                Most of us carry repressed grief, anger, fear, shame, or guilt in
                our bodies — often without knowing it. These emotions lodge in the
                tissues, tighten the fascia, and keep the nervous system locked in
                survival mode.
              </p>
              <p className="text-text-muted text-[0.9rem] sm:text-[0.95rem] leading-[1.8]">
                ELM creates the safety and structure for these emotions to finally
                surface, be felt, and be released — not through analysis, but
                through the body itself.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                label: "Breathwork",
                desc: "Activating the body's natural release mechanisms",
                img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
              },
              {
                label: "Vocalization",
                desc: "Giving voice to what has been silenced",
                img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop",
              },
              {
                label: "Somatic Release",
                desc: "Freeing what is held in the fascia and cells",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl overflow-hidden relative group"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="aspect-[3/2] relative">
                  <Image
                    src={item.img}
                    alt={item.label}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A12]/80 via-[#0D1A12]/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-[0.85rem] text-text leading-[1.5]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
