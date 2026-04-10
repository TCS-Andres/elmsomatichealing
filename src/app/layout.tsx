import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ELM — Emotional Liberation Method | Dr. Christian Gonzalez",
  description:
    "The Emotional Liberation Method by Dr. Christian Gonzalez. Somatic healing sessions combining breathwork, vocalization, and body-based tools to release repressed trauma and restore your nervous system.",
  keywords:
    "somatic healing, emotional release therapy, nervous system regulation, Dr. Christian Gonzalez, ELM, trauma healing, breathwork, naturopathic doctor Los Angeles",
  openGraph: {
    title: "ELM — Emotional Liberation Method | Dr. Christian Gonzalez",
    description:
      "The Emotional Liberation Method by Dr. Christian Gonzalez. Somatic healing sessions combining breathwork, vocalization, and body-based tools to release repressed trauma and restore your nervous system.",
    url: "https://elmsomatichealing.com",
    siteName: "ELM Somatic Healing",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELM — Emotional Liberation Method | Dr. Christian Gonzalez",
    description:
      "Somatic healing sessions combining breathwork, vocalization, and body-based tools to release repressed trauma and restore your nervous system.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://elmsomatichealing.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      name: "ELM — Emotional Liberation Method",
      description:
        "Somatic healing sessions combining breathwork, vocalization, and body-based tools to release repressed trauma and restore your nervous system.",
      url: "https://elmsomatichealing.com",
      founder: {
        "@type": "Person",
        name: "Dr. Christian Gonzalez",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        addressCountry: "US",
      },
      priceRange: "$$",
    },
    {
      "@type": "Person",
      name: "Dr. Christian Gonzalez",
      jobTitle: "Naturopathic Doctor",
      affiliation: { "@type": "Organization", name: "ELM Health" },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "University of Bridgeport",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which session should I choose if I'm just starting out?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If you're feeling anxious, emotionally stuck, or disconnected from your body and want a safe place to begin, the ELM Group Immersion is the best first step.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between the Emotional Release Session and the Release + Integration Plan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Emotional Release Session is a standalone 90-minute healing experience. The Release + Integration Plan is a deeper, two-part transformation that adds a psychosomatic intake, identification of your psychosomatic archetype, and a personalized Nervous System Expansion Protocol.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to complete labs for the Medical Reset option?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lab testing is highly recommended but not mandatory. During the full-body intake, specific functional labs may be suggested based on your symptoms and history.",
          },
        },
        {
          "@type": "Question",
          name: "What kind of support will I get after the session?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each session includes foundational or personalized at-home practices designed to help you continue reconnecting with your nervous system.",
          },
        },
        {
          "@type": "Question",
          name: "How many sessions does it usually take to feel a shift?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most people begin feeling transformation within 1 to 3 sessions.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg text-text font-sans font-light antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
