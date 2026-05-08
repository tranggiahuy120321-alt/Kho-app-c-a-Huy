import React from 'react';
import { motion } from 'motion/react';
import { useAstrology } from '../viewmodels/useAstrology';
import { Sparkles, Calendar, User, Clock, ChevronRight, RotateCcw } from 'lucide-react';

export const AstrologyView: React.FC = () => {
  const { profile, setProfile, result, isLoading, analyze, setType, reset } = useAstrology();

  if (result) {
    return (
      <div className="px-6 py-8 pb-32 min-h-screen">
        <header className="mb-10 text-center">
          <div className="w-16 h-16 rounded-2xl frosted-glass flex items-center justify-center text-indigo-400 mx-auto mb-4 border border-indigo-500/20 shadow-xl">
            <Sparkles size={32} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-1">Giải mã Tử Vi</h1>
          <p className="text-indigo-300 uppercase text-[10px] tracking-[0.2em] font-bold">
            {profile.type === 'Eastern' ? 'Phương Đông' : 'Phương Tây'}
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="frosted-glass rounded-[40px] p-8 border border-white/10 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-8 opacity-5 scale-150">
                <Sparkles size={120} />
             </div>
             
             <div className="text-center mb-10">
               <h2 className="text-4xl font-serif italic text-white mb-3">{result.sign}</h2>
               {result.element && (
                 <span className="px-4 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20">
                   Bản Mệnh: {result.element}
                 </span>
               )}
             </div>

             <div className="space-y-8">
                <AnalysisSection title="Tính cách" content={result.personality} />
                <AnalysisSection title="Sự nghiệp" content={result.career} />
                <AnalysisSection title="Tình duyên" content={result.love} />
             </div>
          </div>

          <button
            onClick={reset}
            className="w-full h-16 rounded-3xl frosted-glass flex items-center justify-center gap-3 text-white/40 hover:text-white transition-all hover:bg-white/5 active:scale-95"
          >
            <RotateCcw size={20} />
            <span className="font-bold text-xs uppercase tracking-widest">Làm lại phép xem</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 pb-32 min-h-screen">
      <header className="mb-10">
        <h1 className="text-3xl font-serif italic text-white mb-2">Bản Đồ Vận Mệnh</h1>
        <p className="text-white/50 text-sm leading-relaxed">Khám phá những bí ẩn về tính cách và tương lai của bạn qua tinh tú.</p>
      </header>

      <div className="space-y-8">
        <div className="flex bg-black/40 p-1 rounded-2xl border border-white/10 relative overflow-hidden">
          <button
            onClick={() => setType('Eastern')}
            className={`flex-1 py-3.5 rounded-xl text-[11px] font-bold tracking-widest transition-all relative z-10 ${
              profile.type === 'Eastern' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
            }`}
          >
            PHƯƠNG ĐÔNG
          </button>
          <button
            onClick={() => setType('Western')}
            className={`flex-1 py-3.5 rounded-xl text-[11px] font-bold tracking-widest transition-all relative z-10 ${
              profile.type === 'Western' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/40 hover:text-white'
            }`}
          >
            PHƯƠNG TÂY
          </button>
        </div>

        <div className="space-y-5">
          <InputGroup
            icon={User}
            label="Họ và Tên"
            placeholder="Nguyễn Hoàng An"
            value={profile.name}
            onChange={(val) => setProfile({ ...profile, name: val })}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputGroup
              icon={Calendar}
              label="Ngày Sinh"
              type="date"
              value={profile.dob.toISOString().split('T')[0]}
              onChange={(val) => setProfile({ ...profile, dob: new Date(val) })}
            />
            <InputGroup
              icon={Clock}
              label="Giờ Sinh"
              type="time"
              value={profile.birthTime}
              onChange={(val) => setProfile({ ...profile, birthTime: val })}
            />
          </div>
        </div>

        <button
          onClick={analyze}
          disabled={!profile.name || isLoading}
          className={`w-full h-16 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center gap-3 text-white font-bold tracking-widest shadow-[0_10px_30px_rgba(79,70,229,0.3)] transition-all ${
            (!profile.name || isLoading) ? 'opacity-40 cursor-not-allowed' : 'active:scale-[0.98] hover:shadow-[0_15px_40px_rgba(79,70,229,0.4)]'
          }`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              XEM KẾT QUẢ
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const InputGroup = ({ icon: Icon, label, type = 'text', placeholder, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/30 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
        <Icon size={18} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-indigo-500/50 transition-all"
      />
    </div>
  </div>
);

const AnalysisSection = ({ title, content }: { title: string, content: string }) => (
  <div className="space-y-2.5">
    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">{title}</h3>
    <p className="text-white/80 leading-relaxed font-serif italic text-lg">{content}</p>
  </div>
);
