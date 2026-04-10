import React, { useEffect, useState } from 'react';
import { useTheme } from './theme-context';
import darkSignature from '../assets/ChatGPT Image Apr 10, 2026, 10_43_37 AM.png';
import lightSignature from '../assets/ChatGPT Image Apr 10, 2026, 10_44_15 AM.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { theme } = useTheme();
  const [isReadyToUnmount, setIsReadyToUnmount] = useState(false);
  const activeSignature = theme === 'dark' ? darkSignature : lightSignature;

  useEffect(() => {
    // Start removing the splash screen after the liquid fill animation (2.5 seconds)
    const fadeTimer = setTimeout(() => {
      setIsReadyToUnmount(true);
    }, 2800);

    // Call onComplete after the fade out transition finishes
    const unmountTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] loader-screen ${
        isReadyToUnmount ? 'opacity-0 -translate-y-full blur-sm' : 'opacity-100 translate-y-0 blur-none'
      } ${theme === 'dark' ? 'loader-screen--dark' : 'loader-screen--light'}`}
    >
      <div className="signature-frame" aria-label="Sure Surya loading signature">
        <img
          src={activeSignature}
          alt=""
          aria-hidden="true"
          className="signature-image signature-image--ghost"
        />
        <img
          src={activeSignature}
          alt="Sure Surya"
          className="signature-image signature-image--ink"
        />
        <span aria-hidden="true" className="signature-pen-glint" />

        <div aria-hidden="true" className="loader-progress">
          <span />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
