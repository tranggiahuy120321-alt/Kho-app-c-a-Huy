import React, { useState } from 'react';
import { Camera, Image as ImageIcon, X } from 'lucide-react';

interface ImagePickerProps {
  onImageSelected: (url: string) => void;
  label: string;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({ onImageSelected, label }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setPreview(url);
        onImageSelected(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const clear = () => {
    setPreview(null);
  };

  if (preview) {
    return (
      <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden glass-morphism p-2">
        <img src={preview} alt="Selected" className="w-full h-full object-cover rounded-2xl" />
        <button 
          onClick={clear}
          className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-3xl border-2 border-dashed border-white/10 glass-morphism flex flex-col items-center justify-center gap-4 group hover:border-[#9d7cce]/50 transition-colors cursor-pointer relative overflow-hidden">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer z-10"
      />
      <div className="p-4 rounded-full bg-[#9d7cce]/10 text-[#9d7cce] group-hover:scale-110 transition-transform">
        <Camera size={32} />
      </div>
      <div className="text-center">
        <p className="text-white font-medium">{label}</p>
        <p className="text-gray-500 text-sm">Chạm để chụp hoặc chọn ảnh</p>
      </div>
    </div>
  );
};
