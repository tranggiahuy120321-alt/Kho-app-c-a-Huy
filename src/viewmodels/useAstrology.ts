import { useState } from 'react';
import { AstrologyResult, UserProfile, AstrologyType } from '../models/types';
import { apiService } from '../services/apiService';

export function useAstrology() {
  const [result, setResult] = useState<AstrologyResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    dob: new Date(),
    birthTime: '12:00',
    type: 'Eastern'
  });

  const analyze = async () => {
    if (!profile.name) return;
    
    setIsLoading(true);
    try {
      const data = await apiService.getAstrologyAnalysis(profile);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const setType = (type: AstrologyType) => {
    setProfile(prev => ({ ...prev, type }));
  };

  const reset = () => {
    setResult(null);
  };

  return { 
    profile, 
    setProfile, 
    result, 
    isLoading, 
    analyze, 
    setType,
    reset
  };
}
