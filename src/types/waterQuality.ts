export type WaterQualityLevel = 1 | 2 | 3 | 4 | 5;

export type WaterQualityStatus = '안전' | '주의' | '경고' | '위험' | '심각';

export interface WaterQualityData {
  level: WaterQualityLevel;
  status: WaterQualityStatus;
  turbidity: number; // 탁도 (NTU)
  algae: number; // 조류 (cells/mL)
  dissolvedOxygen: number; // 용존산소량 (mg/L)
  ph: number; // pH
  timestamp: Date;
}

export interface WaterQualityParameter {
  name: string;
  value: number;
  unit: string;
  level: WaterQualityLevel;
  status: WaterQualityStatus;
  description: string;
}

export interface HistoricalData {
  date: string;
  level: WaterQualityLevel;
  status: WaterQualityStatus;
}
