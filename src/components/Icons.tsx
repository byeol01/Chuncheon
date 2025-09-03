import React from 'react';
import { WaterQualityLevel } from '../types/waterQuality';

interface WaterQualityIconProps {
  level: WaterQualityLevel;
  size?: number;
  className?: string;
}

// 1단계 안전 - 매우안전.png
const SafeIcon: React.FC<{ size?: number; className?: string }> = ({ size = 40, className }) => (
  <img 
    src="/매우안전.png" 
    alt="매우안전" 
    width={size} 
    height={size * 0.9} 
    className={className}
  />
);

// 2단계 주의 - 주의.png
const CautionIcon: React.FC<{ size?: number; className?: string }> = ({ size = 40, className }) => (
  <img 
    src="/안전.png" 
    alt="안전" 
    width={size} 
    height={size * 0.9} 
    className={className}
  />
);

// 3단계 경고 - 경고.png
const WarningIcon: React.FC<{ size?: number; className?: string }> = ({ size = 40, className }) => (
  <img 
    src="/주의.png" 
    alt="주의" 
    width={size} 
    height={size * 0.9} 
    className={className}
  />
);

// 4단계 위험 - 위험.png
const DangerIcon: React.FC<{ size?: number; className?: string }> = ({ size = 40, className }) => (
  <img 
    src="/경고.png" 
    alt="경고" 
    width={size} 
    height={size * 0.9} 
    className={className}
  />
);

// 5단계 심각 - 위험.png (더 진한 색상으로 표시)
const CriticalIcon: React.FC<{ size?: number; className?: string }> = ({ size = 40, className }) => (
  <img 
    src="/위험.png" 
    alt="위험" 
    width={size} 
    height={size * 0.9} 
    className={className}
    style={{ 
      filter: 'brightness(0.8) saturate(1.5)',
      transform: 'scale(1.1)'
    }}
  />
);

const WaterQualityIcon: React.FC<WaterQualityIconProps> = ({ level, size = 40, className }) => {
  switch (level) {
    case 1:
      return <SafeIcon size={size} className={className} />;
    case 2:
      return <CautionIcon size={size} className={className} />;
    case 3:
      return <WarningIcon size={size} className={className} />;
    case 4:
      return <DangerIcon size={size} className={className} />;
    case 5:
      return <CriticalIcon size={size} className={className} />;
    default:
      return <CautionIcon size={size} className={className} />;
  }
};

export default WaterQualityIcon;
