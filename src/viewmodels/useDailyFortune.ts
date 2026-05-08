import { useState, useEffect } from 'react';
import { DailyFortune } from '../models/types';
import { apiService } from '../services/apiService';

export function useDailyFortune() {
  const [fortune, setFortune] = useState<DailyFortune | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestDailyFortune = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getDailyFortune();
      setFortune(data);
    } catch (err) {
      setError('Không thể tải thông điệp hôm nay.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestDailyFortune();
  }, []);

  return { fortune, isLoading, error, refresh: requestDailyFortune };
}
