import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [displayContent, setDisplayContent] = useState(children);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // First render - show immediately
      setIsVisible(true);
      isFirstRender.current = false;
      return;
    }

    // Page change - animate out then in
    setIsVisible(false);
    
    const timer = setTimeout(() => {
      setDisplayContent(children);
      setIsVisible(true);
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Update content when children change but path is same
  useEffect(() => {
    setDisplayContent(children);
  }, [children]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-2'
      }`}
    >
      {displayContent}
    </div>
  );
};

export default PageTransition;
