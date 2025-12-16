'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/button';
import { FaArrowUp } from 'react-icons/fa';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Scroll to top button with elegant black gradient
 * Appears when user scrolls down and positioned above the dock
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ 
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={`fixed z-40 ${
            isMobile ? 'bottom-20 right-4' : 'bottom-24 right-6'
          }`}
        >
          <Button
            onClick={scrollToTop}
            size={isMobile ? 'default' : 'lg'}
            className="group rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black hover:from-black hover:via-gray-900 hover:to-gray-800 border-2 border-gray-700 hover:border-gray-600 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 ring-2 ring-gray-600/30 hover:ring-gray-500/50"
          >
            <FaArrowUp className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} transition-transform duration-300 group-hover:-translate-y-0.5 text-white`} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
