import React, { useEffect, useState } from 'react';
import { useTheme } from './theme-context';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { theme } = useTheme();
  const [isReadyToUnmount, setIsReadyToUnmount] = useState(false);

  useEffect(() => {
    // Start removing the splash screen after the liquid fill animation (2.5 seconds)
    const fadeTimer = setTimeout(() => {
      setIsReadyToUnmount(true);
    }, 2500);

    // Call onComplete after the fade out transition finishes (e.g. 700ms)
    const unmountTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isReadyToUnmount ? 'opacity-0 -translate-y-full blur-sm' : 'opacity-100 translate-y-0 blur-none'
      } ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#ffffff]'}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Premium Liquid Fill Title */}
        <h1 
          className={`font-signature liquid-fill-text ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
        >
          Sure Surya
        </h1>
        
        {/* Subtle loading indicator */}
        <div className="absolute -bottom-8 md:-bottom-12 w-16 h-[1px] bg-foreground/10 overflow-hidden mix-blend-difference">
          <div className="h-full bg-foreground w-full origin-left animate-[progressBar_2.2s_ease-out_forwards]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
