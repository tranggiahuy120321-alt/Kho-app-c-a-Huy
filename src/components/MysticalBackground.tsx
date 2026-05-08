import React from 'react';
import { motion } from 'motion/react';

export const MysticalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0A051A]">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#4B2C91] rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[0%] right-[-5%] w-[400px] h-[400px] bg-[#B53C6A] rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.25, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-[#214E91] rounded-full blur-[90px]"
      />
      
      {/* Decorative stars/dust */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-indigo-300 rounded-full opacity-30"></div>
      </div>
    </div>
  );
};
