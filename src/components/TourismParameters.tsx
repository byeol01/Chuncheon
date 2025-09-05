import React from 'react';
import styled from 'styled-components';

interface TourismData {
  comfort: number;
  climateTemp: number;
  waterQuality: number;
}

interface TourismParametersProps {
  data: TourismData;
}

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 20px 0;
  color: #333;
  font-weight: 600;
  transform: translateY(-20px);
`;

const ParameterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ParameterItem = styled.div`
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const ParameterName = styled.h3`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 15px;
`;

const GaugeContainer = styled.div<{ value: number }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(
    #007bff ${props => props.value * 3.6}deg,
    #e0e0e0 ${props => props.value * 3.6}deg
  );
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 15px auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    background: white;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
`;

const GaugeValue = styled.span`
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const ParameterDescription = styled.p`
  font-size: 0.9rem;
  color: #777;
  line-height: 1.4;
`;

const TourismParameters: React.FC<TourismParametersProps> = ({ data }) => {
  const parameters = [
    {
      name: '쾌적도',
      value: data.comfort,
      description: '현재 날씨와 환경에 따른 관광 쾌적 지수입니다.',
    },
    {
      name: '기후/기온',
      value: data.climateTemp,
      description: '춘천 지역의 현재 기온 및 기후 정보입니다.',
      unit: '°C',
    },
    {
      name: '수질',
      value: data.waterQuality,
      description: '주요 하천 및 호수의 수질 상태를 나타냅니다.',
    },
  ];

  return (
    <Container>
      <Title>관광지수 상세</Title>
      <ParameterGrid>
        {parameters.map((param) => (
          <ParameterItem key={param.name}>
            <ParameterName>{param.name}</ParameterName>
            <GaugeContainer value={param.value}>
              <GaugeValue>{param.value}{param.unit}</GaugeValue>
            </GaugeContainer>
            <ParameterDescription>{param.description}</ParameterDescription>
          </ParameterItem>
        ))}
      </ParameterGrid>
    </Container>
  );
};

export default TourismParameters;
