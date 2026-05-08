import { useState } from 'react';
import { ScanningResult } from '../models/types';
import { apiService } from '../services/apiService';

export function useReading(type: 'face' | 'palm') {
  const [result, setResult] = useState<ScanningResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const startScan = async (imageUrl: string) => {
    setImage(imageUrl);
    setIsLoading(true);
    try {
      const data = type === 'face' 
        ? await apiService.scanFace(imageUrl) 
        : await apiService.scanPalm(imageUrl);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return { image, result, isLoading, startScan, reset };
}
