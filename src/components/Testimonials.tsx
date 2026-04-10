"use client";

import ScrollReveal from "./ScrollReveal";
import { TestimonialStack } from "./ui/glass-testimonial-swiper";

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

      <ScrollReveal>
        <div className="max-w-[680px] mx-auto">
          <TestimonialStack testimonials={testimonials} visibleBehind={3} />
        </div>
      </ScrollReveal>
    </section>
  );
}
