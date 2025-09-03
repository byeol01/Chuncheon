import { WaterQualityData, HistoricalData } from '../types/waterQuality';

// 현재 수질 데이터 (임시)
export const getCurrentWaterQualityData = (): WaterQualityData => {
  return {
    level: 4, // 위험
    status: '위험',
    turbidity: 35, // NTU
    algae: 35000, // cells/mL
    dissolvedOxygen: 3.2, // mg/L
    ph: 7.2, // pH
    timestamp: new Date()
  };
};

// 과거 수질 데이터 (임시)
export const getHistoricalData = (): HistoricalData[] => {
  const today = new Date();
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  
  return [
    {
      date: '월요일',
      level: 1,
      status: '안전'
    },
    {
      date: '화요일',
      level: 2,
      status: '주의'
    },
    {
      date: '수요일',
      level: 3,
      status: '경고'
    },
    {
      date: '목요일',
      level: 4,
      status: '위험'
    },
    {
      date: '어제',
      level: 5,
      status: '심각'
    },
    {
      date: '오늘',
      level: 4,
      status: '위험'
    },
    {
      date: '내일',
      level: 2,
      status: '주의'
    }
  ];
};

// 실시간 데이터 시뮬레이션 (임시)
export const generateRandomWaterQualityData = (): WaterQualityData => {
  const turbidity = Math.random() * 100; // 0-100 NTU
  const algae = Math.random() * 100000; // 0-100000 cells/mL
  const dissolvedOxygen = Math.random() * 12; // 0-12 mg/L
  const ph = 6.5 + Math.random() * 2; // 6.5-8.5 pH
  
  return {
    level: 4, // 임시로 위험 레벨로 설정
    status: '위험',
    turbidity,
    algae,
    dissolvedOxygen,
    ph,
    timestamp: new Date()
  };
};
