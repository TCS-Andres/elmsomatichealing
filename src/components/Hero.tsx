"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

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
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1280&auto=format&fit=crop"
      bgImageSrc="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1920&auto=format&fit=crop"
      scrollToExpand="Scroll to begin"
    >
      {/* CTA appears after full expansion */}
      <div className="flex justify-center py-8">
        <a
          href="#sessions"
          onClick={(e) => handleClick(e, "#sessions")}
          className="inline-block py-4 px-12 border border-accent text-accent text-[0.75rem] uppercase tracking-[0.2em] rounded-full hover:bg-accent hover:text-bg transition-all duration-400"
        >
          Explore Sessions
        </a>
      </div>
    </ScrollExpandMedia>
  );
}
