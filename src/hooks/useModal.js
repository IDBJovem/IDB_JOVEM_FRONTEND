import { useState, useCallback } from "react";

/**
 * Hook para controlar abertura/fechamento de modais.
 * @returns {{ isOpen, data, open, close }}
 */
export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const open = useCallback((payload = null) => {
    setData(payload);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setData(null);
  }, []);

  return { isOpen, data, open, close };
}
