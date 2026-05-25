import { useHomeData } from "./hooks/useHomeData";
import HeroSection from "./sections/HeroSection";
import SobreSection from "./sections/SobreSection";
import EventosSection from "./sections/EventosSection";
import VolunteerSection from "./sections/VolunteerSection";
import ProcessoVoluntario from "./sections/ProcessoVoluntario";
import ProdutosSection from "./sections/ProdutosSection";
import GaleriaSection from "./sections/GaleriaSection";
import LideresSection from "./sections/LideresSection";
import CalendarioSection from "./sections/CalendarioSection";

export default function Home() {
  const { countdown, events, products, gallery, nextEvent } = useHomeData();

  return (
    <main className="pt-[70px] md:pt-[82px]">
      <HeroSection countdown={countdown} nextEvent={nextEvent} />
      <SobreSection />
      <LideresSection />
      <EventosSection events={events} />
      <CalendarioSection />
      <VolunteerSection />
      <ProcessoVoluntario />
      <ProdutosSection products={products} />
      <GaleriaSection gallery={gallery} />
    </main>
  );
}
