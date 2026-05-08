import React from 'react';
import { ReadingView } from './ReadingView';

export const PalmistryView: React.FC = () => {
  return (
    <ReadingView 
      type="palm" 
      title="Xem Chỉ Tay" 
      description="Hệ thống tự động nhận diện các đường Sinh đạo, Trí đạo và Tâm đạo." 
    />
  );
};
