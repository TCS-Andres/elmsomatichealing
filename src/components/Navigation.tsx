"use client";

import { useState, useEffect } from "react";

const links = [
  { label: "Method", href: "#method" },
  { label: "Sessions", href: "#sessions" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  const linkClass =
    "text-[0.75rem] uppercase tracking-[0.15em] text-text-muted hover:text-text transition-colors duration-300";

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        padding: scrolled ? "0.6rem 2rem" : "1rem 2rem",
      }}
    >
      <div
        className="max-w-[1400px] mx-auto flex items-center justify-between px-6 transition-all duration-500 rounded-2xl"
        style={{
          padding: scrolled ? "0.6rem 1.5rem" : "0.8rem 1.5rem",
          background: scrolled
            ? "rgba(13,26,18,0.85)"
            : "rgba(13,26,18,0.5)",
          backdropFilter: "blur(40px) saturate(1.8)",
          WebkitBackdropFilter: "blur(40px) saturate(1.8)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <a
          href="#"
          onClick={(e) => handleClick(e, "#")}
          className="font-serif text-xl font-light tracking-[0.25em] text-accent"
        >
          ELM
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={linkClass}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#sessions"
            onClick={(e) => handleClick(e, "#sessions")}
            className="px-7 py-2.5 border border-accent text-accent text-[0.75rem] uppercase tracking-[0.2em] rounded-full hover:bg-accent hover:text-bg transition-all duration-300"
          >
            Book a Session
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer w-11 h-11"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-[22px] h-px bg-text" />
          <span className="block w-[22px] h-px bg-text" />
          <span className="block w-[22px] h-px bg-text" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col gap-4 p-6 mt-2 mx-8 rounded-2xl"
          style={{
            background: "rgba(13,26,18,0.92)",
            backdropFilter: "blur(40px) saturate(1.8)",
            WebkitBackdropFilter: "blur(40px) saturate(1.8)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={linkClass}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#sessions"
            onClick={(e) => handleClick(e, "#sessions")}
            className="w-full text-center py-3 border border-accent text-accent text-[0.75rem] uppercase tracking-[0.2em] rounded-full hover:bg-accent hover:text-bg transition-all duration-300"
          >
            Book a Session
          </a>
        </div>
      )}
    </nav>
  );
}
