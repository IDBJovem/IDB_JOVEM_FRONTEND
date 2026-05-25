import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the page to the top whenever the route changes.
 * Ignores hash-based navigation (e.g. /#produtos) so that
 * section-scroll logic can handle those independently.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, let the hash-scroll logic handle it
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
