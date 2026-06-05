import { useState, useEffect } from "react";
import { fetchAllEvents, isFutureEvent } from "../../../services/eventService";
import { mockProducts } from "../../../data/mockProducts";
import { mockGallery } from "../../../data/mockGallery";
import { getCountdown } from "../../../utils/formatDate";

export function useHomeData() {
  const [events, setEvents] = useState([]);
  const [nextEvent, setNextEvent] = useState(null);
  const [countdown, setCountdown] = useState(getCountdown(null));
  // Produtos e galeria seguem como mock (Partes 2 e 3 da integração)
  const [products] = useState(mockProducts);
  const [gallery] = useState(mockGallery);

  useEffect(() => {
    let active = true;
    fetchAllEvents()
      .then((all) => {
        if (!active) return;
        setEvents(all);
        const proximos = all
          .filter((e) => isFutureEvent(e.date))
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setNextEvent(proximos[0] || all[0] || null);
      })
      .catch(() => active && setEvents([]));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!nextEvent?.date) return;
    const interval = setInterval(() => {
      setCountdown(getCountdown(nextEvent.date));
    }, 1000);
    return () => clearInterval(interval);
  }, [nextEvent]);

  return { countdown, events, products, gallery, nextEvent };
}
