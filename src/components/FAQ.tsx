"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  {
    q: "Which session should I choose if I'm just starting out?",
    a: "If you're feeling anxious, emotionally stuck, or disconnected from your body and want a safe place to begin, the ELM Group Immersion is the best first step. It offers a 75-minute guided Emotional Liberation Method session focused on emotional awareness, nervous system safety, and unlocking repressed feelings — no prior experience needed.",
  },
  {
    q: "What is the difference between the Emotional Release Session and the Release + Integration Plan?",
    a: "The Emotional Release Session is a standalone 90-minute healing experience. The Release + Integration Plan is a deeper, two-part transformation that adds a psychosomatic intake, identification of your psychosomatic archetype, and a personalized Nervous System Expansion Protocol — ideal for long-term shifts in how your body holds and processes emotion.",
  },
  {
    q: "Do I need to complete labs for the Medical Reset option?",
    a: "Lab testing is highly recommended but not mandatory. During the full-body intake, specific functional labs may be suggested based on your symptoms and history. These help identify underlying physical imbalances — like inflammation, gut dysfunction, or hormonal disruption — contributing to emotional dysregulation. Lab fees are separate and paid directly to the lab.",
  },
  {
    q: "What kind of support will I get after the session?",
    a: "Each session includes foundational or personalized at-home practices designed to help you continue reconnecting with your nervous system. The Integration Plan and Medical Reset options include full protocols tailored to your patterns, with tools you can use long after the session ends.",
  },
  {
    q: "How many sessions does it usually take to feel a shift?",
    a: "Most people begin feeling transformation within 1 to 3 sessions. However, we are layered beings — some carry more repression than others and may feel less safe in their bodies initially. Lasting change depends on integrating the practices into daily life to keep the nervous system stabilized in greater safety.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 px-6 md:px-12">
      <ScrollReveal>
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent mb-4">
            Questions
          </p>
          <h2
            className="font-serif font-light"
            style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)" }}
          >
            Before you begin
          </h2>
        </div>
      </ScrollReveal>

      <div
        className="max-w-[800px] mx-auto rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px) saturate(1.4)",
          WebkitBackdropFilter: "blur(16px) saturate(1.4)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {faqs.map((faq, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <div
              className="px-8 md:px-10"
              style={{
                borderBottom:
                  i < faqs.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full bg-transparent border-none py-7 flex justify-between items-center gap-8 cursor-pointer text-left"
              >
                <span className="font-sans text-base font-normal text-text">
                  {faq.q}
                </span>
                <span className="font-serif text-[1.4rem] text-accent transition-transform duration-300 shrink-0">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 text-[0.9rem] text-text-muted leading-[1.8]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
