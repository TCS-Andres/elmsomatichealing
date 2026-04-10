"use client";

function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

const internalLinks = [
  { label: "Method", href: "#method" },
  { label: "Sessions", href: "#sessions" },
  { label: "Dr. Gonzalez", href: "#about" },
];

const externalLinks = [
  {
    label: "Podcast",
    href: "https://podcasts.apple.com/us/podcast/heal-thy-self-with-dr-g/id1455361893",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/doctor.gonzalez/",
  },
];

const linkClass =
  "text-[0.7rem] uppercase tracking-[0.1em] text-text-dim hover:text-text transition-colors duration-300";

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-12 py-12"
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <p className="font-serif text-lg tracking-[0.2em] text-accent">ELM</p>

        <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
          {internalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={linkClass}
            >
              {link.label}
            </a>
          ))}
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-[0.7rem] text-text-dim">
          &copy; 2026 ELM Health. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
