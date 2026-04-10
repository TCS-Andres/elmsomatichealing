"use client";

import ScrollReveal from "./ScrollReveal";

const stages = [
  {
    num: "01",
    title: "Awareness",
    desc: "Reconnecting to the felt sense of your body — noticing what is present without judgment.",
  },
  {
    num: "02",
    title: "Tension",
    desc: "Locating where the body is bracing, guarding, or holding — the physical signature of repressed emotion.",
  },
  {
    num: "03",
    title: "Emotion",
    desc: "Allowing the grief, anger, fear, shame, or guilt beneath the tension to surface safely.",
  },
  {
    num: "04",
    title: "Acceptance",
    desc: "Meeting what arises with compassion — creating the safety your nervous system needs to let go.",
  },
  {
    num: "05",
    title: "Expression",
    desc: "Releasing through breath, voice, and movement — freeing what has been stored in the fascia and cells.",
  },
];

export default function Stages() {
  return (
    <section id="five-stages" className="py-28 px-6 md:px-12">
      <ScrollReveal>
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent mb-4">
            The Emotional Liberation Method
          </p>
          <h2
            className="font-serif font-light mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)" }}
          >
            Five stages of return
          </h2>
          <p className="text-text-muted text-[0.95rem]">
            ELM combines somatic experiencing, breathwork, and vocalization to
            move through the body&apos;s deepest emotional patterns.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {stages.map((stage, i) => (
            <ScrollReveal key={stage.num} delay={i * 0.1}>
              <div
                className="rounded-2xl p-8 text-center h-full transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04)";
                }}
              >
                <p className="font-serif text-[2.5rem] font-light text-accent opacity-40 mb-4">
                  {stage.num}
                </p>
                <p className="font-sans text-[0.75rem] uppercase tracking-[0.12em] font-medium mb-3">
                  {stage.title}
                </p>
                <p className="text-[0.82rem] text-text-muted leading-[1.6]">
                  {stage.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
