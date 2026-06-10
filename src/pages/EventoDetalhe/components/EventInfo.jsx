import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { fetchEndereco } from "../../../services/mapaService";

/* Resolve o endereço legível do evento a partir da lat/long (reverse geocoding). */
export default function EventInfo({ event }) {
  const [endereco, setEndereco] = useState("");

  const { latitude, longitude } = event || {};

  useEffect(() => {
    if (latitude == null || longitude == null) return;
    let active = true;
    fetchEndereco(latitude, longitude).then((addr) => {
      if (active && addr) setEndereco(addr);
    });
    return () => {
      active = false;
    };
  }, [latitude, longitude]);

  if (!endereco) return null;

  return (
    <section className="w-full bg-[#FDF3EA]">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 pb-8 -mt-4">
        <span className="flex items-start gap-2 text-[#1E1E1E]/70 text-sm">
          <MapPin size={16} className="text-[#FF6D2C] shrink-0 mt-0.5" />
          {endereco}
        </span>
      </div>
    </section>
  );
}
