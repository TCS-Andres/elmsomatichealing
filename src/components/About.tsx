"use client";

import ScrollReveal from "./ScrollReveal";

const credentials = [
  {
    label: "Education",
    value:
      "Doctorate of Naturopathic Medicine (N.D.) — University of Bridgeport, 2014",
  },
  {
    label: "Residency",
    value: "Cancer Treatment Centers of America — Philadelphia, PA",
  },
  {
    label: "Specializations",
    value:
      "Integrative Oncology · Somatic Healing · Nervous System Regulation · Environmental Medicine",
  },
  {
    label: "Founded",
    value:
      "ELM — Emotional Liberation Method · Integrative Psychology Institute",
  },
  {
    label: "Podcast",
    value: "Heal Thy Self with Dr. G — ~1M downloads per episode",
  },
  { label: "Based In", value: "Los Angeles, California" },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6 md:px-12">
      <ScrollReveal>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20">
          {/* Left — Credentials */}
          <div
            className="md:sticky md:top-32 md:self-start rounded-3xl p-8 md:p-10"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px) saturate(1.6)",
              WebkitBackdropFilter: "blur(20px) saturate(1.6)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {credentials.map((cred, i) => (
              <div
                key={cred.label}
                className="py-5"
                style={{
                  borderBottom:
                    i < credentials.length - 1
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                }}
              >
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-accent mb-1.5">
                  {cred.label}
                </p>
                <p className="text-[0.9rem] text-text-muted">{cred.value}</p>
              </div>
            ))}
          </div>

          {/* Right — Bio */}
          <div>
            <h2
              className="font-serif font-light leading-[1.25] mb-8"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)" }}
            >
              Dr. Christian Gonzalez
            </h2>
            <div className="space-y-6 text-text-muted text-[0.95rem]">
              <p>
                For most of his career, Dr. Gonzalez searched for why people
                suffer — from acute to the most chronic and deadly diseases. With
                over a decade of experience, he has helped thousands address
                conditions such as cancer, anxiety, depression, and addiction
                through the intersection of unresolved trauma, the nervous
                system, fascia, and cellular health.
              </p>
              <p>
                It wasn&apos;t until he began implementing somatic healing
                modalities that he witnessed the deepest and most lasting
                transformations. The Emotional Liberation Method was born from
                this realization — that we cannot think our way out of what the
                body is holding, and that repressed emotions are the primary
                blocks to physical and mental health.
              </p>
              <p>
                Today, Dr. Gonzalez is known for distilling complex concepts like
                the cell danger response and the physiology of trauma into
                actionable tools that empower people to heal themselves. Through
                ELM, his podcast, and the Integrative Psychology Institute —
                which is working toward becoming an accredited master&apos;s
                program in somatic psychology — he is advancing the field of
                body-based healing.
              </p>
              <p>
                His mission is singular: help people remember that they are
                whole.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
