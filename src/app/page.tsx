import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Stages from "@/components/Stages";
import Sessions from "@/components/Sessions";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Intro />
      <Stages />
      <Sessions />
      <About />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </>
  );
}
