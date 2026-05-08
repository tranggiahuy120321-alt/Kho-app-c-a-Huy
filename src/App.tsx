import { useState } from 'react';
import { MysticalBackground } from './components/MysticalBackground';
import { TabNavigation } from './components/TabNavigation';
import { DailyView } from './views/DailyView';
import { AstrologyView } from './views/AstrologyView';
import { FaceReadingView } from './views/FaceReadingView';
import { PalmistryView } from './views/PalmistryView';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('daily');

  const renderContent = () => {
    switch (activeTab) {
      case 'daily': return <DailyView />;
      case 'astrology': return <AstrologyView />;
      case 'face': return <FaceReadingView />;
      case 'palm': return <PalmistryView />;
      default: return <DailyView />;
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#9d7cce]/30">
      <MysticalBackground />
      
      <main className="max-w-md mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
