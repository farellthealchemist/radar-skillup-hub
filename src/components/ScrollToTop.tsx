import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Automatically scrolls to the top of the page when route changes
 * Uses smooth scrolling behavior with performance optimizations
 */
const ScrollToTop = (): null => {
  const { pathname, search } = useLocation();
  const prevPathnameRef = useRef<string>("");

  useEffect(() => {
    // Only scroll if pathname actually changed (not just search params)
    if (prevPathnameRef.current !== pathname) {
      // Use requestAnimationFrame for smoother performance
      const scrollToTop = () => {
        try {
          // Check if smooth scrolling is supported
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          } else {
            // Fallback for older browsers
            window.scrollTo(0, 0);
          }
        } catch (error) {
          // Fallback in case of any errors
          console.warn('ScrollToTop: Failed to scroll smoothly, using instant scroll');
          window.scrollTo(0, 0);
        }
      };

      // Small delay to ensure DOM is ready after route change
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(scrollToTop);
      }, 0);

      prevPathnameRef.current = pathname;

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;