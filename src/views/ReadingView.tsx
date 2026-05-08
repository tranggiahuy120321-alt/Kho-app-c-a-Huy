import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReading } from '../viewmodels/useReading';
import { ImagePicker } from '../components/ImagePicker';
import { ScannerEffect } from '../components/ScannerEffect';
import { RotateCcw, Sparkles } from 'lucide-react';

interface ReadingViewProps {
  type: 'face' | 'palm';
  title: string;
  description: string;
}

export const ReadingView: React.FC<ReadingViewProps> = ({ type, title, description }) => {
  const { image, result, isLoading, startScan, reset } = useReading(type);

  if (result) {
    return (
      <div className="px-6 py-8 pb-32 min-h-screen">
        <header className="mb-10 flex justify-between items-center">
            <h1 className="text-2xl font-serif italic text-white">Kết Quả</h1>
            <button onClick={reset} className="w-10 h-10 rounded-full frosted-glass flex items-center justify-center text-white/40 hover:text-white transition-colors">
                <RotateCcw size={18} />
            </button>
        </header>

        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           className="space-y-6"
        >
            <div className="w-2/3 mx-auto aspect-[4/5] rounded-[2.5rem] overflow-hidden frosted-glass border border-white/10 p-1.5 mb-10 shadow-2xl">
               <img src={image!} alt="Analysis" className="w-full h-full object-cover rounded-[2rem] grayscale contrast-125" />
            </div>

            <div className={`frosted-glass rounded-[40px] p-8 border border-white/5 space-y-8 relative overflow-hidden ${
              type === 'face' ? 'bg-gradient-to-br from-purple-900/10 to-blue-900/10' : 'bg-gradient-to-br from-pink-900/10 to-purple-900/10'
            }`}>
                <div className="text-center relative z-10">
                    <h2 className="text-xl font-serif font-bold text-indigo-300 mb-2">{result.title}</h2>
                    <p className="text-white/40 text-sm italic">"{result.description}"</p>
                </div>

                <div className="h-px bg-white/5" />

                <div className="space-y-8 relative z-10">
                    {result.details.map((detail, idx) => (
                        <div key={idx} className="space-y-2">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">{detail.label}</h3>
                            <p className="text-white/80 leading-relaxed text-sm font-medium">{detail.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="pb-12" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 pb-32 min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-serif italic text-white mb-2">{title}</h1>
        <p className="text-white/50 text-sm leading-relaxed">{description}</p>
      </header>

      <div className="space-y-8">
        <div className="relative">
            <ImagePicker 
                label={type === 'face' ? "Tướng Mặt" : "Chỉ Tay"} 
                onImageSelected={startScan} 
            />
            <ScannerEffect active={isLoading} />
        </div>

        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="flex justify-center gap-1.5">
                        {[0, 1, 2].map(i => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]"
                            />
                        ))}
                    </div>
                    <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.3em] animate-pulse">
                        Đang phân tích căn duyên...
                    </p>
                </motion.div>
            )}
        </AnimatePresence>

        {!isLoading && (
          <div className="frosted-glass rounded-3xl p-6 border border-white/5">
              <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
                      <Sparkles size={18} />
                  </div>
                  <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Thông tin bảo mật</p>
                      <p className="text-xs text-white/40 leading-relaxed font-medium">
                          Hình ảnh của bạn được xử lý bằng công nghệ AI bảo mật cao và sẽ được xóa ngay sau khi phân tích xong.
                      </p>
                  </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};
