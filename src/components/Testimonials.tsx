"use client";

import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Your capacity to hold space and empower people to heal is unmatched.",
    author: "Daniela",
  },
  {
    quote:
      "After my session, I felt like a tennis ball was removed from my stomach. Zero gut issues since. You are an incredible facilitator.",
    author: "Ryan",
  },
  {
    quote:
      "I did a mix of talk therapy and IFS for years. This was more powerful than anything I've experienced through either of those. I cried and I raged all from my womb.",
    author: "Cass",
  },
  {
    quote:
      "I lost 10 pounds after the first month. It was stuck on me as protection and came off easily after dealing with my emotions.",
    author: "Rebecca",
  },
  {
    quote:
      "Thank you for the session. It was better than any somatic work, therapy, or hypnotherapy I received in the past.",
    author: "Kane",
  },
  {
    quote: "This is truly the missing link to health.",
    author: "Jesse",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 px-6 md:px-12">
      <ScrollReveal>
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent mb-4">
            Experiences
          </p>
          <h2
            className="font-serif font-light"
            style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)" }}
          >
            In their words
          </h2>
        </div>
      </ScrollReveal>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.author} delay={i * 0.08}>
            <div
              className="flex flex-col p-10 h-full transition-all duration-300 hover:-translate-y-1"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(196,168,130,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <blockquote className="font-serif text-[1.05rem] italic leading-[1.7] flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p className="text-[0.7rem] uppercase tracking-[0.15em] text-text-dim">
                — {t.author}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
