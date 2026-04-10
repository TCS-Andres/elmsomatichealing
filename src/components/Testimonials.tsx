"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Daniela",
    quote:
      "Your capacity to hold space and empower people to heal is unmatched.",
  },
  {
    id: 2,
    name: "Ryan",
    quote:
      "After my session, I felt like a tennis ball was removed from my stomach. Zero gut issues since. You are an incredible facilitator.",
  },
  {
    id: 3,
    name: "Cass",
    quote:
      "I did a mix of talk therapy and IFS for years. This was more powerful than anything I've experienced through either of those. I cried and I raged all from my womb.",
  },
  {
    id: 4,
    name: "Rebecca",
    quote:
      "I lost 10 pounds after the first month. It was stuck on me as protection and came off easily after dealing with my emotions.",
  },
  {
    id: 5,
    name: "Kane",
    quote:
      "Thank you for the session. It was better than any somatic work, therapy, or hypnotherapy I received in the past.",
  },
  {
    id: 6,
    name: "Jesse",
    quote: "This is truly the missing link to health.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-20"
      >
        {/* Left: heading + navigation */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent mb-6">
            Experiences
          </p>
          <h2
            className="font-serif font-light leading-[1.25] mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)" }}
          >
            In Their Words
          </h2>
          <p className="text-text-muted text-[0.95rem] mb-10 max-w-[440px]">
            Real experiences from people who came in feeling stuck — and left
            feeling free. This work speaks for itself.
          </p>

          {/* Pagination dots */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === index ? "2.5rem" : "0.625rem",
                  height: "0.625rem",
                  background:
                    activeIndex === index
                      ? "#C9A87C"
                      : "rgba(255,255,255,0.15)",
                }}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Right: testimonial cards */}
        <motion.div
          variants={itemVariants}
          className="relative min-h-[260px] sm:min-h-[300px] md:min-h-[360px]"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                x: activeIndex === index ? 0 : 100,
                scale: activeIndex === index ? 1 : 0.9,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                zIndex: activeIndex === index ? 10 : 0,
                pointerEvents: activeIndex === index ? "auto" : "none",
              }}
            >
              <div
                className="rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 h-full flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backdropFilter: "blur(24px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {/* Quote mark */}
                <span className="font-serif text-4xl sm:text-5xl text-accent opacity-25 leading-none mb-3 sm:mb-4 select-none">
                  &ldquo;
                </span>

                <blockquote className="font-serif text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] italic leading-[1.7] text-text flex-1 mb-6 sm:mb-8">
                  {testimonial.quote}
                </blockquote>

                {/* Divider */}
                <div
                  className="mb-5"
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.06)",
                  }}
                />

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-bg text-[0.7rem] font-medium uppercase tracking-wider shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #C9A87C, #7A9A82)",
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <p className="text-[0.8rem] uppercase tracking-[0.12em] text-text-muted">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Decorative corner elements */}
          <div
            className="absolute -bottom-4 -left-4 h-20 w-20 rounded-2xl"
            style={{ background: "rgba(201,168,124,0.04)" }}
          />
          <div
            className="absolute -top-4 -right-4 h-20 w-20 rounded-2xl"
            style={{ background: "rgba(122,154,130,0.04)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
