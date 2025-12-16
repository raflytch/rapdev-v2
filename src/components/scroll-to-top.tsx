'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/button';
import { FaArrowUp } from 'react-icons/fa';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Scroll to top button with gradient styling
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`fixed z-40 ${
            isMobile ? 'bottom-20 right-4' : 'bottom-24 right-6'
          }`}
        >
          <Button
            onClick={scrollToTop}
            size={isMobile ? 'default' : 'lg'}
            className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 transition-all duration-300"
          >
            <FaArrowUp className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
