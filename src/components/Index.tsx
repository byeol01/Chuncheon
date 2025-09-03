import React from 'react';
import styled from 'styled-components';
import { WaterQualityData, WaterQualityLevel } from '../types/waterQuality';
import { getLevelColor } from '../utils/waterQualityUtils';
import WaterQualityIcon from './Icons';

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 20px 0;
  color: #333;
  font-weight: 600;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const MainIndicator = styled.div<{ $level: WaterQualityLevel }>`
  width: 50px;
  height: 80px;
`;

const MainIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatusText = styled.div<{ $level: WaterQualityLevel }>`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => getLevelColor(props.$level)};
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
  max-width: 400px;
  text-align: center;
`;

const LevelIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const LevelIndicator = styled.div<{ $level: WaterQualityLevel; $currentLevel: WaterQualityLevel }>`
  width: 15px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const getDescription = (level: WaterQualityLevel) => {
  switch (level) {
    case 1: return '"수질이 양호함, 안전한 상태"';
    case 2: return '"약간의 주의가 필요함"';
    case 3: return '"수질 악화 우려, 모니터링 필요"';
    case 4: return '"조류 발생 가능, 피부자극, 냄새 우려"';
    case 5: return '"심각한 수질 오염, 즉시 조치 필요"';
    default: return '"수질 상태 확인 중"';
  }
};

const getLevelText = (level: WaterQualityLevel): string => {
  switch (level) {
    case 1: return '우수';
    case 2: return '양호';
    case 3: return '보통';
    case 4: return '주의';
    case 5: return '불량';
    default: return '보통';
  }
};

const getLevelDescription = (level: WaterQualityLevel): string => {
  switch (level) {
    case 1: return '수질이 매우 양호함';
    case 2: return '수질이 양호함';
    case 3: return '수질이 보통임';
    case 4: return '수질이 나쁨, 주의가 필요함';
    case 5: return '수질이 매우 나쁨, 즉시 조치 필요';
    default: return '수질이 보통임';
  }
};

interface WaterQualityIndexProps {
  data: WaterQualityData;
}

const WaterQualityIndex: React.FC<WaterQualityIndexProps> = ({ data }) => {
  return (
    <Container>
      <Title>수질 지수</Title>
      
      <MainSection>
        {/* 메인 물방울 이미지 (종합수치로 식이 산출될 때마다 수정됨) */}
        <MainIndicator $level={data.level}>
          <MainIcon>
            <WaterQualityIcon level={data.level} size={70} />
          </MainIcon>
        </MainIndicator>

        {/* 수치별 단계와 멘트 */}
        <StatusText $level={data.level}>
          {getLevelText(data.level)}
        </StatusText>

        <Description>
          {getLevelDescription(data.level)}
        </Description>

        {/* 모든 물방울 이미지 (작게 배치) */}
        <LevelIndicators>
          {([1, 2, 3, 4, 5] as WaterQualityLevel[]).map(level => (
            <LevelIndicator key={level} $level={level} $currentLevel={data.level}>
              <WaterQualityIcon level={level} size={20} />
            </LevelIndicator>
          ))}
        </LevelIndicators>
      </MainSection>
    </Container>
  );
};

export default WaterQualityIndex;
