import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Heritage from "@/components/Heritage";
import Offres from "@/components/Offres";
import Realisations from "@/components/Realisations";
import Process from "@/components/Process";
import Partenaires from "@/components/Partenaires";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Heritage />
        <Offres />
        <Realisations />
        <Process />
        <Partenaires />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
