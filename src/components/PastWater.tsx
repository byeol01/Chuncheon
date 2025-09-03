import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface PastWaterProps {
  data?: any[];
}

const Container = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 900px;
  
  h3 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 1.2rem;
    text-align: center;
  }
`;

const WaterDrops = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  
  .water-drop {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    position: relative;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    .drop-icon {
      width: 55px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .status-text {
      font-size: 11px;
      font-weight: 600;
      text-align: center;
      line-height: 1.2;
      max-width: 60px;
    }
    
    .drop-label {
      font-size: 12px;
      color: #666;
      text-align: center;
      font-weight: 500;
    }
  }
`;

// 툴팁 스타일
const Tooltip = styled.div<{ $isVisible: boolean; $position: { x: number; y: number } }>`
  position: fixed;
  left: ${props => props.$position.x}px;
  top: ${props => props.$position.y}px;
  background: rgba(0, 0, 0, 0.95);
  color: white;
  padding: 20px;
  border-radius: 15px;
  font-size: 14px;
  z-index: 9999;
  max-width: 350px;
  display: ${props => props.$isVisible ? 'block' : 'none'};
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -120%);
  pointer-events: auto;
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    color: #ccc;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }
  }
  
  .tooltip-title {
    font-weight: bold;
    margin-bottom: 15px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    padding-right: 30px;
  }
  
  .tooltip-data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 15px;
    
    .data-item {
      .label {
        color: #ccc;
        font-size: 12px;
        margin-bottom: 5px;
      }
      .value {
        color: #fff;
        font-weight: bold;
        font-size: 16px;
      }
      .unit {
        color: #999;
        font-size: 11px;
        margin-left: 3px;
      }
    }
  }
  
  .tooltip-status {
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    margin-top: 15px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .comprehensive-score {
    margin-top: 15px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    text-align: center;
    
    .score-label {
      color: #ccc;
      font-size: 12px;
      margin-bottom: 5px;
    }
    
    .score-value {
      color: #fff;
      font-weight: bold;
      font-size: 18px;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(0, 0, 0, 0.95);
  }
`;

// 수질 예측을 위한 데이터 타입 정의
interface WaterQualityData {
  date: string;
  label: string;
  isToday: boolean;
  status: 'verySafe' | 'safe' | 'caution' | 'warning' | 'danger';
  iconPath: string;
  data: {
    turbidity: number;      // 탁도 (NTU)
    algae: number;          // 조류 (cells/mL)
    dissolvedOxygen: number; // 용존산소량 (mg/L)
    temperature: number;     // 수온 (°C)
    ph: number;             // pH
    conductivity: number;    // 전기전도도 (μS/cm)
  };
  weather: {
    temperature: number;     // 기온 (°C)
    humidity: number;       // 습도 (%)
    rainfall: number;       // 강수량 (mm)
    windSpeed: number;      // 풍속 (m/s)
    pressure: number;       // 기압 (hPa)
  };
  prediction: {
    confidence: number;     // 예측 신뢰도 (%)
    trend: 'improving' | 'stable' | 'worsening';
    factors: string[];      // 주요 영향 요인
  };
}

const PastWater: React.FC<PastWaterProps> = ({ data }) => {
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // 통합 데이터가 있으면 사용, 없으면 기본 데이터 생성
  const pastWaterQuality = data || [
    {
      date: '2024-08-31',
      label: '8.31',
      isToday: false,
      status: '양호',
      iconPath: '/안전.png',
      data: { turbidity: 20, algae: 15000, dissolvedOxygen: 6.5, temperature: 24, ph: 7.0, conductivity: 200 }
    },
    {
      date: '2024-09-01',
      label: '9.1',
      isToday: false,
      status: '양호',
      iconPath: '/안전.png',
      data: { turbidity: 22, algae: 18000, dissolvedOxygen: 6.2, temperature: 25, ph: 7.1, conductivity: 220 }
    },
    {
      date: '2024-09-02',
      label: '9.2',
      isToday: false,
      status: '양호',
      iconPath: '/안전.png',
      data: { turbidity: 25, algae: 20000, dissolvedOxygen: 5.8, temperature: 26, ph: 7.2, conductivity: 240 }
    },
    {
      date: '2024-09-03',
      label: '오늘',
      isToday: true,
      status: '주의',
      iconPath: '/경고.png',
      data: { turbidity: 35, algae: 35000, dissolvedOxygen: 3.2, temperature: 26, ph: 7.2, conductivity: 250 }
    },
    {
      date: '2024-09-04',
      label: '9.4',
      isToday: false,
      status: '주의',
      iconPath: '/경고.png',
      data: { turbidity: 38, algae: 38000, dissolvedOxygen: 3.0, temperature: 27, ph: 7.3, conductivity: 260 }
    },
    {
      date: '2024-09-05',
      label: '9.5',
      isToday: false,
      status: '불량',
      iconPath: '/위험.png',
      data: { turbidity: 45, algae: 45000, dissolvedOxygen: 2.5, temperature: 28, ph: 7.4, conductivity: 270 }
    },
    {
      date: '2024-09-06',
      label: '9.6',
      isToday: false,
      status: '불량',
      iconPath: '/위험.png',
      data: { turbidity: 50, algae: 50000, dissolvedOxygen: 2.0, temperature: 29, ph: 7.5, conductivity: 280 }
    }
  ];

  // 실시간 날짜 계산 - 오늘을 기준으로 7일
  const getDateLabels = () => {
    const today = new Date();
    const dates = [];
    
    // 3일 전부터 3일 후까지 (총 7일, 오늘을 중앙에)
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      let label = '';
      if (i === 0) {
        label = '오늘';
      } else {
        // MM/DD 형식으로 표시
        label = date.toLocaleDateString('ko-KR', { 
          month: 'numeric', 
          day: 'numeric' 
        });
      }
      
      dates.push({
        label,
        date: date.toISOString().split('T')[0],
        isToday: i === 0
      });
    }
    
    return dates;
  };

  // 공공데이터 기반 수질 예측 알고리즘 (주석으로 수식 설명)
  const predictWaterQuality = (dateInfo: any, index: number): WaterQualityData => {
    // ===== 실제 API 연동 시 사용할 데이터 소스 =====
    // 1. 환경부 물환경정보시스템 - 수질측정망 + 자동측정망 (확정/미확정 자료)
    // 2. 국가수질자동측정망 API - 공공데이터포털 (환경부)
    // 3. 기상청 API - 단기예보, 초단기실황 등 (공공데이터포털)
    // 4. K-water 댐·보 운영정보 API (공공데이터포털)
    // 5. 기상자료개방포털 - 강수량, 기온, 풍속, 습도, 기압 등
    // 6. 국가수자원관리종합정보시스템(WAMIS) - 댐 수위, 방류량, 유입량, 발전량
    // 7. K-water 물정보포털 - 의암댐, 소양강댐 운영현황

    // ===== 수질 예측 수식 (실제 데이터로 교체 예정) =====
    // 수질 지수 = f(탁도, 조류, 용존산소량, 수온, pH, 전기전도도, 기상조건, 댐운영정보)
    
    // 현재는 임시 데이터로 시뮬레이션
    const baseTurbidity = 15 + Math.sin(index * 0.5) * 10; // 사인파 패턴으로 변동
    const baseAlgae = 15000 + Math.cos(index * 0.3) * 10000; // 코사인파 패턴으로 변동
    const baseDO = 6.5 + Math.sin(index * 0.4) * 2; // 용존산소량 변동
    
    // 기상 조건에 따른 수질 영향 (실제로는 기상청 API 데이터 사용)
    const weatherFactor = 1 + (Math.random() - 0.5) * 0.3;
    
    // 최종 수질 데이터 계산
    const turbidity = Math.max(0, baseTurbidity * weatherFactor);
    const algae = Math.max(0, baseAlgae * weatherFactor);
    const dissolvedOxygen = Math.max(0, baseDO * weatherFactor);
    
    // 수질 상태 판정 (실제로는 환경부 기준 적용)
    let status: 'verySafe' | 'safe' | 'caution' | 'warning' | 'danger';
    let iconPath: string;
    
    // 종합 수질 지수 계산 (실제로는 더 복잡한 알고리즘 적용)
    const waterQualityIndex = (
      (turbidity / 50) * 0.3 +           // 탁도 가중치 30%
      (algae / 50000) * 0.3 +            // 조류 가중치 30%
      (1 - dissolvedOxygen / 8) * 0.4    // 용존산소량 가중치 40%
    );
    
    if (waterQualityIndex < 0.2) {
      status = 'verySafe';
      iconPath = '/매우안전.png';
    } else if (waterQualityIndex < 0.4) {
      status = 'safe';
      iconPath = '/안전.png';
    } else if (waterQualityIndex < 0.6) {
      status = 'caution';
      iconPath = '/주의.png';
    } else if (waterQualityIndex < 0.8) {
      status = 'warning';
      iconPath = '/경고.png';
    } else {
      status = 'danger';
      iconPath = '/위험.png';
    }
    
    // 기상 데이터 (실제로는 기상청 API에서 가져옴)
    const weather = {
      temperature: 20 + Math.sin(index * 0.2) * 10, // 기온 변동
      humidity: 60 + Math.cos(index * 0.3) * 20,   // 습도 변동
      rainfall: Math.max(0, Math.random() * 50),    // 강수량
      windSpeed: Math.random() * 10,                // 풍속
      pressure: 1013 + (Math.random() - 0.5) * 20  // 기압
    };
    
    // 예측 신뢰도 및 트렌드 (실제로는 머신러닝 모델 결과)
    const confidence = 85 + Math.random() * 15; // 85-100% 신뢰도
    const trend = index < 3 ? 'improving' : index > 3 ? 'worsening' : 'stable';
    
    // 주요 영향 요인 (실제로는 데이터 분석 결과)
    const factors = [];
    if (weather.rainfall > 30) factors.push('강수량 증가');
    if (weather.temperature > 25) factors.push('고온');
    if (algae > 20000) factors.push('조류 번식');
    if (dissolvedOxygen < 4) factors.push('용존산소량 부족');
    
    return {
      ...dateInfo,
      status,
      iconPath,
      data: {
        turbidity: Math.round(turbidity * 10) / 10,
        algae: Math.round(algae),
        dissolvedOxygen: Math.round(dissolvedOxygen * 10) / 10,
        temperature: Math.round((20 + Math.random() * 10) * 10) / 10,
        ph: Math.round((6.5 + Math.random() * 2) * 10) / 10,
        conductivity: Math.round(200 + Math.random() * 100)
      },
      weather,
      prediction: {
        confidence: Math.round(confidence),
        trend,
        factors: factors.length > 0 ? factors : ['정상 범위']
      }
    };
  };

  // 과거 수질 상태 데이터 생성
  const getPastWaterQuality = (): WaterQualityData[] => {
    const dates = getDateLabels();
    return dates.map((dateInfo, index) => predictWaterQuality(dateInfo, index));
  };

  // 종합수치 계산 함수
  const calculateComprehensiveScore = (turbidity: number, algae: number, dissolvedOxygen: number) => {
    // ===== 향후 DB 연결 시 사용할 실제 데이터 소스 =====
    // 1. 환경부 물환경정보시스템 - 실시간 수질 데이터
    // 2. 국가수질자동측정망 API - 공공데이터포털
    // 3. 춘천시 수질측정소 데이터 - 의암호, 소양강 등
    // 4. 기상청 API - 기온, 강수량, 습도 등 기상 조건
    // 5. K-water 댐 운영정보 - 수위, 방류량, 유입량
    
    // ===== 종합수질지수 계산 공식 (실제 환경부 기준 적용 예정) =====
    // WQI = (탁도 가중치 × 0.3) + (조류 가중치 × 0.3) + (용존산소량 가중치 × 0.4)
    
    // 현재는 임시 계산식 (실제로는 환경부 공식 적용)
    const turbidityScore = Math.max(0, 100 - (turbidity / 50) * 100);
    const algaeScore = Math.max(0, 100 - (algae / 50000) * 100);
    const doScore = Math.max(0, (dissolvedOxygen / 8) * 100);
    
    const comprehensiveScore = Math.round(
      (turbidityScore * 0.3) + (algaeScore * 0.3) + (doScore * 0.4)
    );
    
    return Math.max(0, Math.min(100, comprehensiveScore));
  };

  // 컴포넌트 마운트 시 오늘 날짜의 툴팁 자동 표시
  useEffect(() => {
    const pastWaterQuality = getPastWaterQuality();
    const todayData = pastWaterQuality.find(item => item.isToday);
    
    if (todayData) {
      // 오늘 날짜의 위치 계산
      const todayElement = document.querySelector('.water-drop:nth-child(4)'); // 오늘은 4번째 요소
      if (todayElement) {
        const rect = todayElement.getBoundingClientRect();
        setTooltipPosition({
          x: rect.left + rect.width / 2,
          y: rect.top
        });
        setTooltipData(todayData);
        setIsTooltipVisible(true);
        setHoveredItem('today');
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 마우스 호버 이벤트 핸들러
  const handleMouseEnter = (event: React.MouseEvent, waterData: WaterQualityData) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
    setTooltipData(waterData);
    setIsTooltipVisible(true);
    setHoveredItem(waterData.date);
  };

  const handleMouseLeave = () => {
    // 마우스가 떠나도 툴팁을 계속 표시 (다른 아이콘에 호버하기 전까지)
  };

  // 상태에 따른 색상 반환
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verySafe': return '#00C851'; // 매우 안전 - 밝은 녹색
      case 'safe': return '#4CAF50';     // 안전 - 녹색
      case 'caution': return '#FFC107';  // 주의 - 노란색
      case 'warning': return '#FF9800';  // 경고 - 주황색
      case 'danger': return '#F44336';   // 위험 - 빨간색
      default: return '#666';
    }
  };

  // 상태 텍스트 반환
  const getStatusText = (status: string) => {
    switch (status) {
      case 'verySafe': return '매우안전';
      case 'safe': return '안전';
      case 'caution': return '주의';
      case 'warning': return '경고';
      case 'danger': return '위험';
      default: return '확인중';
    }
  };

  return (
    <>
      <Container>
        <h3>과거 수질 상태 및 예측</h3>
        <WaterDrops>
          {pastWaterQuality.map((item, index) => (
            <div 
              key={index} 
              className="water-drop"
              onMouseEnter={(e) => handleMouseEnter(e, item)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="drop-icon">
                <img src={item.iconPath} alt={getStatusText(item.status)} />
              </div>
              <span 
                className="status-text"
                style={{ color: getStatusColor(item.status) }}
              >
                {getStatusText(item.status)}
              </span>
              <span className="drop-label">{item.label}</span>
            </div>
          ))}
        </WaterDrops>
      </Container>

      {/* 툴팁 */}
      <Tooltip 
        $isVisible={isTooltipVisible} 
        $position={tooltipPosition}
      >
        {tooltipData && (
          <>
            <button 
              className="close-btn" 
              onClick={() => setIsTooltipVisible(false)}
            >
              ×
            </button>
            <div className="tooltip-title">{tooltipData.label} 수질 상태</div>
            <div className="tooltip-data">
              <div className="data-item">
                <div className="label">탁도</div>
                <div className="value">
                  {tooltipData.data.turbidity}
                  <span className="unit"> NTU</span>
                </div>
              </div>
              <div className="data-item">
                <div className="label">조류</div>
                <div className="value">
                  {tooltipData.data.algae.toLocaleString()}
                  <span className="unit"> cells/mL</span>
                </div>
              </div>
              <div className="data-item">
                <div className="label">용존산소량</div>
                <div className="value">
                  {tooltipData.data.dissolvedOxygen}
                  <span className="unit"> mg/L</span>
                </div>
              </div>
              <div className="data-item">
                <div className="label">수온</div>
                <div className="value">
                  {tooltipData.data.temperature}
                  <span className="unit">°C</span>
                </div>
              </div>
            </div>
            
            {/* 종합점수 */}
            <div className="comprehensive-score">
              <div className="score-label">종합점수</div>
              <div className="score-value">
                {calculateComprehensiveScore(
                  tooltipData.data.turbidity,
                  tooltipData.data.algae,
                  tooltipData.data.dissolvedOxygen
                )}/100
              </div>
            </div>
            
            <div 
              className="tooltip-status"
              style={{ backgroundColor: getStatusColor(tooltipData.status) }}
            >
              {getStatusText(tooltipData.status)}
            </div>
          </>
        )}
      </Tooltip>
    </>
  );
};

export default PastWater;
