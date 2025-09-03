import React from 'react';
import styled from 'styled-components';
import { WaterQualityData, WaterQualityLevel } from '../types/waterQuality';
import { createWaterQualityParameters, getLevelColor } from '../utils/waterQualityUtils';

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 20px 0;
  color: #333;
  font-weight: 600;
`;

const ParameterGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto;
  transform: translateX(10px);
`;

const ParameterCard = styled.div<{ $level: WaterQualityLevel }>`
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  padding: 20px;
  border-left: 4px solid ${props => getLevelColor(props.$level)};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 250px;
`;

const ParameterHeader = styled.div`
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // margin-bottom: 15px;
`;

const ParameterName = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
  font-weight: 600;
`;

const ParameterValue = styled.div<{ $level: WaterQualityLevel }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => getLevelColor(props.$level)};
  margin: 10px 0;
`;

const ParameterStatus = styled.div<{ $level: WaterQualityLevel }>`
  font-size: 0.9rem;
  color: ${props => getLevelColor(props.$level)};
  font-weight: 600;
  margin-bottom: 10px;
  padding: 5px 10px;
  background: ${props => getLevelColor(props.$level)}20;
  border-radius: 15px;
  display: inline-block;
`;

const ParameterDescription = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $level: WaterQualityLevel; $percentage: number }>`
  height: 100%;
  background: ${props => {
    const percentage = Math.min(props.$percentage, 100);
    if (percentage <= 20) return '#4CAF50'; // 안전 - 녹색
    if (percentage <= 40) return '#8BC34A'; // 양호 - 연한 녹색
    if (percentage <= 60) return '#FFC107'; // 보통 - 노란색
    if (percentage <= 80) return '#FF9800'; // 주의 - 주황색
    return '#F44336'; // 위험 - 빨간색
  }};
  width: ${props => Math.min(props.$percentage, 100)}%;
  border-radius: 4px;
  transition: all 0.5s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

// API 결과 분석을 통한 3단계 분류 함수
const getStatusByValue = (parameterName: string, value: number): { status: string; level: WaterQualityLevel } => {
  switch (parameterName) {
    case '탁도':
      if (value <= 10) return { status: '안전', level: 1 };
      if (value <= 25) return { status: '주의', level: 2 };
      return { status: '위험', level: 3 };
    
    case '조류':
      if (value <= 10000) return { status: '안전', level: 1 };
      if (value <= 25000) return { status: '주의', level: 2 };
      return { status: '위험', level: 3 };
    
    case '용존산소량':
      if (value >= 6.0) return { status: '안전', level: 1 };
      if (value >= 4.0) return { status: '주의', level: 2 };
      return { status: '위험', level: 3 };
    
    default:
      return { status: '확인중', level: 1 };
  }
};

interface WaterQualityParametersProps {
  data: WaterQualityData;
}

const WaterQualityParameters: React.FC<WaterQualityParametersProps> = ({ data }) => {
  const parameters = createWaterQualityParameters(data.turbidity, data.algae, data.dissolvedOxygen);

  const getProgressPercentage = (value: number, maxValue: number) => {
    return (value / maxValue) * 100;
  };

  const getMaxValue = (parameterName: string) => {
    switch (parameterName) {
      case '탁도':
        return 50; // NTU
      case '조류':
        return 50000; // cells/mL
      case '용존산소량':
        return 10; // mg/L
      default:
        return 100;
    }
  };

  return (
    <Container>
      <Title>수질 파라미터</Title>
      
      <ParameterGrid>
        {parameters.map((parameter, index) => {
          const statusInfo = getStatusByValue(parameter.name, parameter.value);
          
          return (
            <ParameterCard key={parameter.name} $level={statusInfo.level}>
              <ParameterHeader>
                <ParameterName>{parameter.name}</ParameterName>
                <ParameterStatus $level={statusInfo.level}>
                  {statusInfo.status}
                </ParameterStatus>
              </ParameterHeader>
              
              <ParameterDescription>
                {parameter.description}
              </ParameterDescription>
              
              <ProgressContainer>
                <ProgressFill 
                  $level={statusInfo.level} 
                  $percentage={getProgressPercentage(parameter.value, getMaxValue(parameter.name))}
                />
              </ProgressContainer>
            </ParameterCard>
          );
        })}
      </ParameterGrid>
    </Container>
  );
};

export default WaterQualityParameters;
