"use client";

import ScrollReveal from "./ScrollReveal";
import { BlurredStagger } from "./ui/blurred-stagger-text";

export default function ELMPitch() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 relative overflow-hidden">
      {/* Subtle accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(122,154,130,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[900px] mx-auto relative z-10">
        <ScrollReveal>
          <p className="text-xs sm:text-[0.75rem] uppercase tracking-[0.3em] text-accent mb-8 sm:mb-10 text-center">
            The Method
          </p>
        </ScrollReveal>

        <div className="mb-8 sm:mb-10">
          <BlurredStagger
            as="h2"
            className="font-serif font-light leading-[1.25] text-center"
            text="ELM is not therapy. It is not mindset work. It is a return to the body."
          />
        </div>

        <ScrollReveal delay={0.3}>
          <div
            className="rounded-3xl p-6 sm:p-8 md:p-12 space-y-6"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px) saturate(1.6)",
              WebkitBackdropFilter: "blur(20px) saturate(1.6)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
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
              our bodies — often without knowing it. These emotions don&apos;t
              disappear. They lodge in the tissues, tighten the fascia, and keep
              the nervous system locked in survival mode. The result is anxiety,
              chronic pain, disconnection, fatigue, and disease.
            </p>
            <p className="text-text-muted text-[0.9rem] sm:text-[0.95rem] leading-[1.8]">
              ELM creates the safety and structure for these emotions to finally
              surface, be felt, and be released — not through analysis, but
              through the body itself. It is the missing link between emotional
              healing and physical health.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-8">
            {[
              { label: "Breathwork", desc: "Activating the body's natural release mechanisms" },
              { label: "Vocalization", desc: "Giving voice to what has been silenced" },
              { label: "Somatic Release", desc: "Freeing what is held in the fascia and cells" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-5 sm:p-6 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
                  {item.label}
                </p>
                <p className="text-[0.85rem] text-text-muted leading-[1.6]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
