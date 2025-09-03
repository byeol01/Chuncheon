import { WaterQualityLevel, WaterQualityStatus, WaterQualityParameter } from '../types/waterQuality';

// 수질 레벨에 따른 색상 매핑
export const getLevelColor = (level: WaterQualityLevel): string => {
  switch (level) {
    case 1: return '#4CAF50'; // 안전 - 초록
    case 2: return '#2196F3'; // 주의 - 파랑
    case 3: return '#FFC107'; // 경고 - 노랑
    case 4: return '#FF9800'; // 위험 - 주황
    case 5: return '#F44336'; // 심각 - 빨강
    default: return '#9E9E9E';
  }
};

// 수질 레벨에 따른 상태 매핑
export const getStatusFromLevel = (level: WaterQualityLevel): WaterQualityStatus => {
  switch (level) {
    case 1: return '안전';
    case 2: return '주의';
    case 3: return '경고';
    case 4: return '위험';
    case 5: return '심각';
    default: return '주의';
  }
};

// 탁도 기준에 따른 레벨 계산
export const calculateTurbidityLevel = (turbidity: number): WaterQualityLevel => {
  if (turbidity <= 5) return 1;
  if (turbidity <= 10) return 2;
  if (turbidity <= 20) return 3;
  if (turbidity <= 50) return 4;
  return 5;
};

// 조류 기준에 따른 레벨 계산
export const calculateAlgaeLevel = (algae: number): WaterQualityLevel => {
  if (algae <= 1000) return 1;
  if (algae <= 5000) return 2;
  if (algae <= 10000) return 3;
  if (algae <= 50000) return 4;
  return 5;
};

// 용존산소량 기준에 따른 레벨 계산
export const calculateDissolvedOxygenLevel = (dissolvedOxygen: number): WaterQualityLevel => {
  if (dissolvedOxygen >= 8) return 1;
  if (dissolvedOxygen >= 6) return 2;
  if (dissolvedOxygen >= 4) return 3;
  if (dissolvedOxygen >= 2) return 4;
  return 5;
};

// 종합 수질 레벨 계산 (가장 높은 레벨을 기준으로)
export const calculateOverallLevel = (
  turbidity: number,
  algae: number,
  dissolvedOxygen: number
): WaterQualityLevel => {
  const turbidityLevel = calculateTurbidityLevel(turbidity);
  const algaeLevel = calculateAlgaeLevel(algae);
  const dissolvedOxygenLevel = calculateDissolvedOxygenLevel(dissolvedOxygen);
  
  return Math.max(turbidityLevel, algaeLevel, dissolvedOxygenLevel) as WaterQualityLevel;
};

// 수질 파라미터 정보 생성
export const createWaterQualityParameters = (
  turbidity: number,
  algae: number,
  dissolvedOxygen: number
): WaterQualityParameter[] => {
  return [
    {
      name: '탁도',
      value: turbidity,
      unit: 'NTU',
      level: calculateTurbidityLevel(turbidity),
      status: getStatusFromLevel(calculateTurbidityLevel(turbidity)),
      description: '물의 투명도를 나타내는 지표'
    },
    {
      name: '조류',
      value: algae,
      unit: 'cells/mL',
      level: calculateAlgaeLevel(algae),
      status: getStatusFromLevel(calculateAlgaeLevel(algae)),
      description: '조류의 농도를 나타내는 지표'
    },
    {
      name: '용존산소량',
      value: dissolvedOxygen,
      unit: 'mg/L',
      level: calculateDissolvedOxygenLevel(dissolvedOxygen),
      status: getStatusFromLevel(calculateDissolvedOxygenLevel(dissolvedOxygen)),
      description: '물에 녹아있는 산소의 양'
    }
  ];
};
