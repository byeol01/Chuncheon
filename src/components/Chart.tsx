import React from 'react';
import styled from 'styled-components';
import { getLevelColor } from '../utils/waterQualityUtils';
import { WaterQualityLevel } from '../types/waterQuality';
import WaterQualityIcon from './Icons';

const Container = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
  width: 900px;
`;

const LakeButton = styled.button`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
  margin-bottom: 20px;
  transform: translateX(-372px);
  
  &:hover {
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
  }
`;

const HistoricalTimeline = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 0;
`;

const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 80px;
`;

const TimelineIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimelineStatus = styled.div<{ $level: WaterQualityLevel }>`
  font-size: 0.8rem;
  color: ${props => getLevelColor(props.$level)};
  font-weight: 600;
`;

const TimelineLabel = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #333;
  font-weight: 500;
`;

const ScrollButton = styled.button`
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
    fill: #666;
  }
`;

interface HistoricalChartProps {
  activeTab: 'today' | 'tomorrow' | 'dayAfter';
}

const HistoricalChart: React.FC<HistoricalChartProps> = ({ activeTab }) => {
  // 과거 데이터를 요일별로 매핑 (이미지와 일치)
  const timelineData = [
    { day: '월요일', level: 1, status: '안전' },
    { day: '화요일', level: 2, status: '주의' },
    { day: '수요일', level: 3, status: '경고' },
    { day: '목요일', level: 4, status: '위험' },
    { day: '금요일', level: 5, status: '심각' },
    { day: '토요일', level: 4, status: '위험' },
    { day: '일요일', level: 2, status: '주의' }
  ];

  return (
    <Container>
      <LakeButton>의암호</LakeButton>
      
      <HistoricalTimeline>
        {timelineData.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineIcon>
              <WaterQualityIcon level={item.level as WaterQualityLevel} size={40} />
            </TimelineIcon>
            <TimelineStatus $level={item.level as WaterQualityLevel}>
              {item.status}
            </TimelineStatus>
            <TimelineLabel>
              {item.day}
            </TimelineLabel>
          </TimelineItem>
        ))}
        
        <ScrollButton>
          <svg viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </ScrollButton>
      </HistoricalTimeline>
    </Container>
  );
};

export default HistoricalChart;
