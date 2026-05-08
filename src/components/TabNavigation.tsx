import React from 'react';
import { Home, Sparkles, User, HandIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'daily', label: 'Daily', icon: Home },
    { id: 'astrology', label: 'Tử Vi', icon: Sparkles },
    { id: 'face', label: 'Tướng Mặt', icon: User },
    { id: 'palm', label: 'Chỉ Tay', icon: HandIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-8 py-4 pb-10 frosted-glass border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex flex-col items-center gap-1.5 transition-all duration-300 relative",
            activeTab === tab.id ? "text-indigo-400" : "text-white/40 hover:text-white"
          )}
        >
          <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 1.5} />
          <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div 
              layoutId="tab-indicator"
              className="absolute -bottom-2 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_12px_#6366f1]" 
            />
          )}
        </button>
      ))}
    </nav>
  );
};
