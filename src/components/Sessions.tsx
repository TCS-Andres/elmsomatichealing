"use client";

import ScrollReveal from "./ScrollReveal";

const sessions = [
  {
    tag: "Virtual · Group",
    title: "ELM Group Immersion",
    price: "$150",
    features: [
      "75-minute guided Emotional Liberation Method session",
      "Safely explore and begin to integrate repressed trauma held in the body",
      "Learn body-based tools to restore your nervous system",
      "Join from anywhere in complete privacy",
      "Leave with daily at-home practices",
    ],
    cta: "Book Group Session",
    link: "https://calendly.com/drchristiangonzalez/elm-group-immersion-virtual",
    featured: false,
  },
  {
    tag: "1-on-1 · 90 Minutes",
    title: "Emotional Release Session",
    price: "$600",
    features: [
      "Powerful 90-minute somatic session to access deeper emotional patterns",
      "Gently unwind cycles of anxiety, shutdown, people-pleasing, and numbness",
      "Explore what your body holds — grief, anger, fear, shame, or guilt",
      "Identify protection patterns and how your nervous system guards you",
      "Foundational practices for ongoing nervous system healing",
    ],
    cta: "Book Session",
    link: "https://calendly.com/drchristiangonzalez/reconnect",
    featured: false,
  },
  {
    tag: "Recommended · Deep Transformation",
    title: "Release + Integration Plan",
    price: "$1,200",
    features: [
      "Two-part experience: psychosomatic intake + somatic session",
      "Uncover your unique psychosomatic archetype",
      "Work with core protection patterns through guided ELM",
      "Personalized Nervous System Expansion Protocol",
      "Targeted somatic and psychological tools for long-term resilience",
    ],
    cta: "Book Deep Session",
    link: "https://calendly.com/drchristiangonzalez/reconnectrewire",
    featured: true,
  },
  {
    tag: "Comprehensive · Mind + Body",
    title: "Release + Integration + Medical Reset",
    price: "$1,800",
    features: [
      "Full mind-body healing: emotional release, somatic therapy, and functional medicine",
      "90-min full body intake, 75-min ELM session, 45-min lab review",
      "Targeted lab recommendations for gut health, hormones, inflammation, and detox",
      "Identify both emotional and biological root causes of fatigue, anxiety, and burnout",
      "Personalized Doctor's Nervous System Protocol for full-system vitality",
    ],
    cta: "Book Full Reset",
    link: "https://calendly.com/drchristiangonzalez/reconnectrewirerestoration",
    featured: false,
  },
];

export default function Sessions() {
  return (
    <section id="sessions" className="py-28 px-6 md:px-12">
      <ScrollReveal>
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent mb-4">
            Work Together
          </p>
          <h2
            className="font-serif font-light mb-4"
            style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)" }}
          >
            Choose your path
          </h2>
          <p className="text-text-muted text-[0.95rem]">
            From a single guided session to a full mind-body medical reset. Each
            path meets you exactly where you are.
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {sessions.map((session, i) => (
          <ScrollReveal key={session.title} delay={i * 0.1}>
            <div
              className="group relative flex flex-col p-10 md:p-12 h-full rounded-3xl transition-all duration-400 hover:-translate-y-1"
              style={{
                border: session.featured
                  ? "1px solid rgba(201,168,124,0.25)"
                  : "1px solid rgba(255,255,255,0.10)",
                background: session.featured
                  ? "rgba(201,168,124,0.06)"
                  : "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px) saturate(1.6)",
                WebkitBackdropFilter: "blur(20px) saturate(1.6)",
                boxShadow:
                  "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-accent mb-3">
                {session.tag}
              </p>
              <h3 className="font-serif text-[1.6rem] font-normal mb-2">
                {session.title}
              </h3>
              <p className="font-serif text-[2rem] font-light text-accent mb-6">
                {session.price}
              </p>

              <ul className="flex-1 mb-8">
                {session.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-[0.85rem] text-text-muted py-2.5 pl-4 relative"
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <span className="absolute left-0 text-accent">—</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={session.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3.5 text-[0.72rem] uppercase tracking-[0.18em] rounded-full transition-all duration-300 ${
                  session.featured
                    ? "bg-accent border border-accent text-bg hover:bg-transparent hover:text-accent"
                    : "border border-glass-border text-text hover:border-accent hover:text-accent"
                }`}
              >
                {session.cta}
              </a>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
