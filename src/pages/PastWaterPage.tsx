// 과거 수질 상태 및 예측
import React, { useState } from 'react';
import styled from 'styled-components';
import CommonHeader from '../components/CommonHeader';
import PastWater from '../components/PastWater';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #F2F4F8;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 10px;
    font-weight: 600;
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
    margin: 0;
  }
`;

const MainSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 30px;
`;

const PredictionSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 30px;
  
  h2 {
    color: #333;
    margin-bottom: 25px;
    font-size: 1.8rem;
    text-align: center;
  }
`;

const PredictionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
`;

const PredictionCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  padding: 25px;
  border-left: 4px solid #007bff;
  
  h3 {
    color: #333;
    margin-bottom: 15px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .prediction-data {
    margin-bottom: 20px;
    
    .data-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
      
      .label {
        color: #666;
        font-weight: 500;
      }
      
      .value {
        color: #333;
        font-weight: 600;
      }
    }
  }
  
  .trend-indicator {
    text-align: center;
    padding: 15px;
    border-radius: 10px;
    background: rgba(0, 123, 255, 0.1);
    
    .trend-text {
      font-size: 1.1rem;
      font-weight: 600;
      color: #007bff;
      margin-bottom: 5px;
    }
    
    .confidence {
      color: #666;
      font-size: 0.9rem;
    }
  }
`;

const WeatherSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  
  h2 {
    color: #333;
    margin-bottom: 25px;
    font-size: 1.8rem;
    text-align: center;
  }
`;

const WeatherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const WeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  border-top: 4px solid #28a745;
  
  .weather-icon {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .weather-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 5px;
  }
  
  .weather-label {
    color: #666;
    font-size: 0.9rem;
  }
`;

const SettingsModal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const SettingsContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  min-width: 300px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  
  h3 {
    margin: 0 0 20px 0;
    color: #333;
  }
  
  .setting-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    
    label {
      font-weight: 500;
      color: #333;
    }
    
    .toggle-switch {
      position: relative;
      width: 50px;
      height: 24px;
      background: #ccc;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.3s ease;
      
      &.active {
        background: #007bff;
      }
      
      .slider {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s ease;
        
        &.active {
          transform: translateX(26px);
        }
      }
    }
  }
  
  .close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    
    &:hover {
      color: #333;
    }
  }
`;

const PastWaterPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <CommonHeader onSettingsClick={() => setIsSettingsOpen(true)} />
        
        <PageHeader>
          <h1>과거 수질 상태 및 예측</h1>
          <p>춘천시 의암호의 과거 수질 데이터와 향후 예측 정보를 제공합니다</p>
        </PageHeader>
{/* 
        <MainSection>
          <PastWater hidePastData={true} />
        </MainSection> */}

        <PredictionSection>
          <h2>📊 수질 예측 분석</h2>
          <PredictionGrid>
            <PredictionCard>
              <h3>🔮 향후 7일 예측</h3>
              <div className="prediction-data">
                <div className="data-row">
                  <span className="label">예측 신뢰도</span>
                  <span className="value">85-100%</span>
                </div>
                <div className="data-row">
                  <span className="label">주요 영향 요인</span>
                  <span className="value">기상 조건, 계절성</span>
                </div>
                <div className="data-row">
                  <span className="label">데이터 소스</span>
                  <span className="value">환경부, 기상청</span>
                </div>
              </div>
              <div className="trend-indicator">
                <div className="trend-text">수질 개선 트렌드</div>
                <div className="confidence">신뢰도: 92%</div>
              </div>
            </PredictionCard>

            <PredictionCard>
              <h3>🌡️ 기상 영향 분석</h3>
              <div className="prediction-data">
                <div className="data-row">
                  <span className="label">기온 영향</span>
                  <span className="value">높음</span>
                </div>
                <div className="data-row">
                  <span className="label">강수량 영향</span>
                  <span className="value">중간</span>
                </div>
                <div className="data-row">
                  <span className="label">습도 영향</span>
                  <span className="value">낮음</span>
                </div>
              </div>
              <div className="trend-indicator">
                <div className="trend-text">기상 조건 안정</div>
                <div className="confidence">예측 정확도: 88%</div>
              </div>
            </PredictionCard>

            <PredictionCard>
              <h3>📈 수질 지수 전망</h3>
              <div className="prediction-data">
                <div className="data-row">
                  <span className="label">현재 단계</span>
                  <span className="value">4단계 (나쁨)</span>
                </div>
                <div className="data-row">
                  <span className="label">1주 후 예상</span>
                  <span className="value">3단계 (보통)</span>
                </div>
                <div className="data-row">
                  <span className="label">개선 속도</span>
                  <span className="value">점진적</span>
                </div>
              </div>
              <div className="trend-indicator">
                <div className="trend-text">개선 전망</div>
                <div className="confidence">확률: 78%</div>
              </div>
            </PredictionCard>
          </PredictionGrid>
        </PredictionSection>

        <WeatherSection>
          <h2>🌤️ 기상 정보</h2>
          <WeatherGrid>
            <WeatherCard>
              <div className="weather-icon">🌡️</div>
              <div className="weather-value">23°C</div>
              <div className="weather-label">현재 기온</div>
            </WeatherCard>
            <WeatherCard>
              <div className="weather-icon">💧</div>
              <div className="weather-value">65%</div>
              <div className="weather-label">습도</div>
            </WeatherCard>
            <WeatherCard>
              <div className="weather-icon">🌧️</div>
              <div className="weather-value">0mm</div>
              <div className="weather-label">강수량</div>
            </WeatherCard>
            <WeatherCard>
              <div className="weather-icon">💨</div>
              <div className="weather-value">3.2m/s</div>
              <div className="weather-label">풍속</div>
            </WeatherCard>
            <WeatherCard>
              <div className="weather-icon">🌡️</div>
              <div className="weather-value">1013hPa</div>
              <div className="weather-label">기압</div>
            </WeatherCard>
            <WeatherCard>
              <div className="weather-icon">☀️</div>
              <div className="weather-value">맑음</div>
              <div className="weather-label">날씨</div>
            </WeatherCard>
          </WeatherGrid>
        </WeatherSection>
      </ContentWrapper>

      {/* 설정 모달 */}
      <SettingsModal $isOpen={isSettingsOpen}>
        <SettingsContent>
          <button 
            className="close-btn" 
            onClick={() => setIsSettingsOpen(false)}
          >
            ×
          </button>
          <h3>설정</h3>
          <div className="setting-item">
            <label>다크모드</label>
            <div 
              className={`toggle-switch ${isDarkMode ? 'active' : ''}`}
              onClick={toggleDarkMode}
            >
              <div className={`slider ${isDarkMode ? 'active' : ''}`}></div>
            </div>
          </div>
        </SettingsContent>
      </SettingsModal>
    </PageContainer>
  );
};

export default PastWaterPage;
