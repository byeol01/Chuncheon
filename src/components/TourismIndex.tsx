import React from 'react';
import styled from 'styled-components';

interface TourismData {
  comfort: number;
  climateTemp: number;
  waterQuality: number;
  level: number;
  status: string;
  description: string;
}

export const Container = styled.div`
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 20px 0;
  color: #333;
  font-weight: 600;
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export const StatusText = styled.div<{ $level: number }>`
  font-size: 2rem;
  font-weight: bold;
  color: ${props => {
    switch (props.$level) {
      case 1: return '#28a745'; // 우수 (매우좋음)
      case 2: return '#20c997'; // 양호 (좋음)
      case 3: return '#ffc107'; // 보통 (보통)
      case 4: return '#fd7e14'; // 나쁨 (나쁨)
      case 5: return '#dc3545'; // 매우 나쁨 (특보발령주의)
      default: return '#6c757d';
    }
  }};
  margin-bottom: 10px;
`;

export const Description = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
  max-width: 400px;
  text-align: center;
`;

export const getLevelText = (level: number): string => {
  switch (level) {
    case 1: return '매우좋음';
    case 2: return '좋음';
    case 3: return '보통';
    case 4: return '나쁨';
    case 5: return '특보발령주의';
    default: return '정보 없음';
  }
};

interface TourismIndexProps {
  data: TourismData;
  hideTitle?: boolean; // hideTitle prop 추가
}

const TourismIndex: React.FC<TourismIndexProps> = ({ data, hideTitle }) => {
  return (
    <Container>
      {!hideTitle && <Title>관광지수</Title>} {/* hideTitle이 true일 때 Title 숨김 */}
      
      <MainSection>
        <StatusText $level={data.level}>
          {getLevelText(data.level)}
        </StatusText>

        <Description>
          {data.description}
        </Description>
      </MainSection>
    </Container>
  );
};

export default TourismIndex;
