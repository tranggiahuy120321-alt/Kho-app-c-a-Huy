import React from 'react';
import { motion } from 'motion/react';

export const ScannerEffect: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
      <motion.div
        initial={{ top: '-10%' }}
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="scanner-line"
      />
      <div className="absolute inset-0 bg-accent/10 animate-pulse" />
    </div>
  );
};
