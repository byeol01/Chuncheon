// 수질 파라미터 상세 분석

import React, { useState } from 'react';
import styled from 'styled-components';
import CommonHeader from '../components/CommonHeader';
import WaterQualityParameters from '../components/Parameters';
import { WaterQualityData } from '../types/waterQuality';
import { getCurrentWaterQualityData } from '../data/mockData';

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

const DetailedAnalysis = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 40px;
`;

const AnalysisCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  padding: 25px;
  border-left: 4px solid #007bff;
  
  h3 {
    color: #333;
    margin-bottom: 20px;
    font-size: 1.3rem;
  }
  
  .parameter-detail {
    margin-bottom: 20px;
    
    .parameter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      
      .name {
        font-weight: 600;
        color: #333;
        font-size: 1.1rem;
      }
      
      .status {
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 600;
      }
    }
    
    .description {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 15px;
    }
    
    .current-value {
      background: rgba(0, 123, 255, 0.1);
      padding: 15px;
      border-radius: 10px;
      text-align: center;
      
      .value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #007bff;
        margin-bottom: 5px;
      }
      
      .unit {
        color: #666;
        font-size: 0.9rem;
      }
    }
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

const WaterQualityParametersPage: React.FC = () => {
  const currentData: WaterQualityData = getCurrentWaterQualityData();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '안전': return '#4CAF50';
      case '주의': return '#FFC107';
      case '위험': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status) {
      case '안전': return 'rgba(76, 175, 80, 0.2)';
      case '주의': return 'rgba(255, 193, 7, 0.2)';
      case '위험': return 'rgba(244, 67, 54, 0.2)';
      default: return 'rgba(158, 158, 158, 0.2)';
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <CommonHeader onSettingsClick={() => setIsSettingsOpen(true)} />
        
        <PageHeader>
          <h1>수질 파라미터 상세 분석</h1>
          <p>춘천시 의암호의 주요 수질 지표를 상세하게 분석한 결과입니다</p>
        </PageHeader>

        {/* <MainSection>
          <WaterQualityParameters data={currentData} />
        </MainSection> */}

        <DetailedAnalysis>
          <AnalysisCard>
            <h3>탁도 (Turbidity) 분석</h3>
            <div className="parameter-detail">
              <div className="parameter-header">
                <span className="name">탁도</span>
                <span 
                  className="status"
                  style={{ 
                    color: getStatusColor('위험'),
                    backgroundColor: getStatusBackground('위험')
                  }}
                >
                  위험
                </span>
              </div>
              <div className="description">
                물의 투명도를 나타내는 지표로, 부유물질의 양을 반영합니다. 
                높은 탁도는 수질 오염을 의미하며, 정수 처리 과정에서 추가적인 
                여과가 필요할 수 있습니다.
              </div>
              <div className="current-value">
                <div className="value">{currentData.turbidity}</div>
                <div className="unit">NTU</div>
              </div>
            </div>
          </AnalysisCard>

          <AnalysisCard>
            <h3>조류 (Algae) 분석</h3>
            <div className="parameter-detail">
              <div className="parameter-header">
                <span className="name">조류</span>
                <span 
                  className="status"
                  style={{ 
                    color: getStatusColor('위험'),
                    backgroundColor: getStatusBackground('위험')
                  }}
                >
                  위험
                </span>
              </div>
              <div className="description">
                조류의 농도를 나타내는 지표로, 과도한 번식은 수질 악화와 
                독성 물질 생성을 야기할 수 있습니다. 정기적인 모니터링이 
                필요합니다.
              </div>
              <div className="current-value">
                <div className="value">{currentData.algae.toLocaleString()}</div>
                <div className="unit">cells/mL</div>
              </div>
            </div>
          </AnalysisCard>

          <AnalysisCard>
            <h3>용존산소량 (DO) 분석</h3>
            <div className="parameter-detail">
              <div className="parameter-header">
                <span className="name">용존산소량</span>
                <span 
                  className="status"
                  style={{ 
                    color: getStatusColor('위험'),
                    backgroundColor: getStatusBackground('위험')
                  }}
                >
                  위험
                </span>
              </div>
              <div className="description">
                물에 녹아있는 산소의 양으로, 수생 생물의 생존과 수질 상태를 
                판단하는 중요한 지표입니다. 낮은 용존산소량은 수질 악화를 
                의미합니다.
              </div>
              <div className="current-value">
                <div className="value">{currentData.dissolvedOxygen}</div>
                <div className="unit">mg/L</div>
              </div>
            </div>
          </AnalysisCard>

          <AnalysisCard>
            <h3>pH 분석</h3>
            <div className="parameter-detail">
              <div className="parameter-header">
                <span className="name">pH</span>
                <span 
                  className="status"
                  style={{ 
                    color: getStatusColor('안전'),
                    backgroundColor: getStatusBackground('안전')
                  }}
                >
                  안전
                </span>
              </div>
              <div className="description">
                물의 산성과 염기성을 나타내는 지표로, 중성에 가까울수록 
                수생 생물에게 적합한 환경입니다. 현재 pH는 정상 범위에 
                있습니다.
              </div>
              <div className="current-value">
                <div className="value">{currentData.ph}</div>
                <div className="unit">pH</div>
              </div>
            </div>
          </AnalysisCard>
        </DetailedAnalysis>
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

export default WaterQualityParametersPage;
