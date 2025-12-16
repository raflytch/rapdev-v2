'use client';

import { useState, useEffect } from 'react';
import { NumberTicker } from '@/components/atoms/number-ticker';

/**
 * Loading screen with number ticker animation
 */
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="text-6xl md:text-8xl font-bold">
          <NumberTicker value={100} startValue={0} delay={0} />
          <span className="ml-2">%</span>
        </div>
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
