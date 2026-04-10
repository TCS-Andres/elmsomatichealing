"use client";

import Image from "next/image";
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
    <section id="about" className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Top: Photo + Bio side by side */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-8 md:gap-16 items-start mb-10 md:mb-16">
            {/* Photo */}
            <div className="rounded-3xl overflow-hidden aspect-square sm:aspect-[3/4] relative">
              <Image
                src="/hero-bg.jpeg"
                alt="Dr. Christian Gonzalez"
                width={1200}
                height={1500}
                quality={90}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A12]/50 via-transparent to-transparent" />
            </div>

            {/* Bio */}
            <div className="flex flex-col justify-center">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent mb-6">
                About
              </p>
              <h2
                className="font-serif font-light leading-[1.25] mb-8"
                style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)" }}
              >
                Dr. Christian Gonzalez
              </h2>
              <div className="space-y-4 sm:space-y-5 text-text-muted text-[0.9rem] sm:text-[0.95rem]">
                <p>
                  For most of his career, Dr. Gonzalez searched for why people
                  suffer — from acute to the most chronic and deadly diseases.
                  With over a decade of experience, he has helped thousands
                  address conditions such as cancer, anxiety, depression, and
                  addiction through the intersection of unresolved trauma, the
                  nervous system, fascia, and cellular health.
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
                  Today, Dr. Gonzalez is known for distilling complex concepts
                  like the cell danger response and the physiology of trauma into
                  actionable tools that empower people to heal themselves.
                  Through ELM, his podcast, and the Integrative Psychology
                  Institute — which is working toward becoming an accredited
                  master&apos;s program in somatic psychology — he is advancing
                  the field of body-based healing.
                </p>
                <p className="text-text font-normal">
                  His mission is singular: help people remember that they are
                  whole.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom: Credentials grid — full width */}
        <ScrollReveal delay={0.15}>
          <div
            className="rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px) saturate(1.6)",
              WebkitBackdropFilter: "blur(20px) saturate(1.6)",
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-0">
              {credentials.map((cred, i) => (
                <div
                  key={cred.label}
                  className="py-5"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-accent mb-1.5">
                    {cred.label}
                  </p>
                  <p className="text-[0.9rem] text-text-muted">{cred.value}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
