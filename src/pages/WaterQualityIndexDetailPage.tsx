import React, { useState } from 'react';
import styled from 'styled-components';
import CommonHeader from '../components/CommonHeader';
import WaterQualityIndex from '../components/Index';
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

const AdditionalInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 40px;
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  padding: 25px;
  border-left: 4px solid #007bff;
  
  h3 {
    color: #333;
    margin-bottom: 15px;
    font-size: 1.3rem;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
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

const WaterQualityIndexDetailPage: React.FC = () => {
  const currentData: WaterQualityData = getCurrentWaterQualityData();
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
          <h1>수질 지수 상세 정보</h1>
          <p>춘천시 의암호 수질 상태를 종합적으로 분석한 결과입니다</p>
        </PageHeader>

        <MainSection>
          <WaterQualityIndex data={currentData} />
        </MainSection>

        <AdditionalInfo>
          <InfoCard>
            <h3>수질 등급 기준</h3>
            <div className="info-item">
              <span className="label">매우 양호 (1단계)</span>
              <span className="value">0-20점</span>
            </div>
            <div className="info-item">
              <span className="label">양호 (2단계)</span>
              <span className="value">21-40점</span>
            </div>
            <div className="info-item">
              <span className="label">보통 (3단계)</span>
              <span className="value">41-60점</span>
            </div>
            <div className="info-item">
              <span className="label">나쁨 (4단계)</span>
              <span className="value">61-80점</span>
            </div>
            <div className="info-item">
              <span className="label">매우 나쁨 (5단계)</span>
              <span className="value">81-100점</span>
            </div>
          </InfoCard>

          <InfoCard>
            <h3>현재 상태 요약</h3>
            <div className="info-item">
              <span className="label">종합 등급</span>
              <span className="value">{currentData.level}단계</span>
            </div>
            <div className="info-item">
              <span className="label">탁도</span>
              <span className="value">{currentData.turbidity} NTU</span>
            </div>
            <div className="info-item">
              <span className="label">조류</span>
              <span className="value">{currentData.algae.toLocaleString()} cells/mL</span>
            </div>
            <div className="info-item">
              <span className="label">용존산소량</span>
              <span className="value">{currentData.dissolvedOxygen} mg/L</span>
            </div>
            <div className="info-item">
              <span className="label">pH</span>
              <span className="value">{currentData.ph}</span>
            </div>
          </InfoCard>
        </AdditionalInfo>
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

export default WaterQualityIndexDetailPage;
