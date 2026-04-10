"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" as const } },
};

function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center relative pt-32 pb-24 px-6 md:pt-32 md:pb-24 md:px-12">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[800px]"
      >
        <motion.p
          variants={item}
          className="text-[0.7rem] uppercase tracking-[0.35em] text-accent mb-8"
        >
          Somatic Healing with Dr. Christian Gonzalez
        </motion.p>

        <motion.h1
          variants={item}
          className="font-serif font-light leading-[1.15] mb-8"
          style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)" }}
        >
          Your body remembers what your mind has buried.{" "}
          <em className="text-accent">This is where we begin.</em>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-[1.05rem] text-text-muted max-w-[560px] mx-auto mb-12"
        >
          The Emotional Liberation Method is a body-based practice to access,
          express, and release the repressed emotions your nervous system has
          been holding — so you can finally heal.
        </motion.p>

        <motion.div variants={item}>
          <a
            href="#sessions"
            onClick={(e) => handleClick(e, "#sessions")}
            className="inline-block py-4 px-12 border border-accent text-accent text-[0.75rem] uppercase tracking-[0.2em] rounded-full hover:bg-accent hover:text-bg transition-all duration-400"
          >
            Explore Sessions
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-[10%] right-[10%] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />
    </section>
  );
}
