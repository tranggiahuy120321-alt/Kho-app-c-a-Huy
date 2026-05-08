export interface DailyFortune {
  cardName: string;
  cardImage: string;
  message: string;
  fortuneDate: string;
  advice: {
    love: string;
    career: string;
    health: string;
  };
  luckScore: number;
}

export interface AstrologyResult {
  personality: string;
  career: string;
  love: string;
  element?: string;
  sign: string;
}

export interface ScanningResult {
  title: string;
  description: string;
  details: {
    label: string;
    value: string;
  }[];
}

export type AstrologyType = 'Eastern' | 'Western';

export interface UserProfile {
  name: string;
  dob: Date;
  birthTime: string;
  type: AstrologyType;
}
