import React from 'react';
import { ReadingView } from './ReadingView';

export const FaceReadingView: React.FC = () => {
  return (
    <ReadingView 
      type="face" 
      title="Xem Tướng Mặt" 
      description="Kết nối AI để giải mã vận mệnh qua các nét trên khuôn mặt bạn." 
    />
  );
};
