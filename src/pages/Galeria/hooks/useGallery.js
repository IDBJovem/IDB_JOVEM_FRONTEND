import { useEffect, useState } from "react";
import { fetchAggregatedGallery } from "../../../services/eventService";

/* Galeria pública: agrega as fotos do Drive de todos os eventos com galeria. */
export function useGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchAggregatedGallery()
      .then((fotos) => active && setPhotos(fotos))
      .catch(() => active && setPhotos([]))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  return { photos, loading };
}
