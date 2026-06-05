import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById, fetchActivities } from "../../../services/eventService";

export function useEventDetails() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    fetchEventById(slug)
      .then(async (ev) => {
        if (!ev) {
          if (active) setError("Evento não encontrado");
          return;
        }
        const schedule = await fetchActivities(ev.id).catch(() => []);
        if (active) setEvent({ ...ev, schedule });
      })
      .catch(() => active && setError("Evento não encontrado"))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [slug]);

  return { event, loading, error };
}
