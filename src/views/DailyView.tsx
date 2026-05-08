import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Heart, Briefcase, Activity, Sparkles } from 'lucide-react';
import { useDailyFortune } from '../viewmodels/useDailyFortune';

export const DailyView: React.FC = () => {
  const { fortune, isLoading, refresh } = useDailyFortune();

  return (
    <div className="px-6 py-8 pb-32">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-xl flex items-center justify-center border border-white/20 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-mystic-gradient">Tử Vi 360</span>
        </div>
        <button 
          onClick={refresh}
          disabled={isLoading}
          className="w-10 h-10 rounded-full frosted-glass flex items-center justify-center text-indigo-200 transition-transform active:rotate-180"
        >
          <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
        </button>
      </header>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-[60vh] gap-4"
          >
            <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-indigo-300/60 font-serif italic tracking-wide">Đang thỉnh thông điệp...</p>
          </motion.div>
        ) : fortune && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="frosted-glass rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xs font-bold text-indigo-300 uppercase tracking-[0.2em]">Hôm nay của bạn</h2>
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-1 rounded-md uppercase border border-indigo-500/30 font-bold">Đại Cát</span>
              </div>

              {/* Tarot Card Image Area */}
              <div className="aspect-[3/4] rounded-2xl border border-white/10 bg-gradient-to-b from-indigo-900/40 to-black/40 overflow-hidden mb-8 shadow-inner group">
                <img 
                  src={fortune.cardImage} 
                  alt={fortune.cardName}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 text-center bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-serif italic mb-1 text-white">{fortune.cardName}</h3>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest">Thông điệp vũ trụ</p>
                </div>
              </div>

              <p className="text-lg font-serif italic text-white/90 leading-relaxed text-center mb-8 px-2">
                "{fortune.message}"
              </p>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] text-white/40 uppercase mb-1">Tình Cảm</p>
                  <p className="text-pink-400 font-bold text-sm">90%</p>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] text-white/40 uppercase mb-1">Sự Nghiệp</p>
                  <p className="text-green-400 font-bold text-sm">75%</p>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                  <p className="text-[10px] text-white/40 uppercase mb-1">Sức Khỏe</p>
                  <p className="text-blue-400 font-bold text-sm">85%</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <AdviceItem icon={Heart} label="Lời khuyên Tình Cảm" value={fortune.advice.love} color="text-pink-400" />
              <AdviceItem icon={Briefcase} label="Lời khuyên Sự Nghiệp" value={fortune.advice.career} color="text-blue-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdviceItem = ({ icon: Icon, label, value, color }: any) => (
  <div className="frosted-glass rounded-3xl p-5 flex items-center gap-5">
    <div className={`p-3 rounded-2xl bg-white/5 ${color}`}>
      <Icon size={20} />
    </div>
    <div>
      <h4 className="text-[10px] uppercase tracking-wider text-white/30 font-bold mb-1">{label}</h4>
      <p className="text-sm text-white/70 font-medium leading-snug">{value}</p>
    </div>
  </div>
);
