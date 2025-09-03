import React, { useState } from 'react';
import styled from 'styled-components';
import WaterQualityIndex from './Index';
import WaterQualityParameters from './Parameters';
import PastWater from './PastWater';
import { WaterQualityData, WaterQualityLevel } from '../types/waterQuality';
import { getCurrentWaterQualityData } from '../data/mockData';
import Navigation from './Navigation';

// 단계별 배경색 반환 함수 (극도로 연한 느낌)
const getLevelBackgroundColor = (level: WaterQualityLevel): string => {
  switch (level) {
    case 1: return 'rgba(0, 200, 81, 0.05)';    // 매우 양호 - 극도로 연한 녹색
    case 2: return 'rgba(76, 175, 80, 0.05)';   // 양호 - 극도로 연한 녹색
    case 3: return 'rgba(255, 193, 7, 0.05)';   // 보통 - 극도로 연한 노란색
    case 4: return 'rgba(255, 152, 0, 0.05)';   // 나쁨 - 극도로 연한 주황색
    case 5: return 'rgba(244, 67, 54, 0.05)';   // 매우 나쁨 - 극도로 연한 빨간색
    default: return 'rgba(158, 158, 158, 0.05)'; // 기본 - 극도로 연한 회색
  }
};

// ===== STYLED COMPONENTS =====

// 메인 대시보드 컨테이너 - 전체 페이지 배경과 기본 스타일
const DashboardContainer = styled.div<{ $isDarkMode: boolean }>`
  min-height: 100vh;
  background: ${props => props.$isDarkMode 
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
    : '#F2F4F8'};
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  color: ${props => props.$isDarkMode ? '#ffffff' : '#333'};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 전체 콘텐츠를 감싸는 컨테이너 (1440px 중앙 정렬)
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

// 상단 헤더 - 로고, 네비게이션, 설정 아이콘을 포함
const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
`;

// 로고 섹션
const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  .logo {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

// 네비게이션 섹션
const NavigationSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 20px;
`;

// 설정 섹션
const SettingsSection = styled.div`
  .settings-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    img {
      width: 24px;
      height: 24px;
    }
    
    &:hover {
      background: #f0f0f0;
    }
  }
`;

// 헤더 섹션 - 위치 정보, 검색바, 날씨 데이터를 포함
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
  margin-top: 50px;
`;

// 위치 정보 섹션 - 춘천시와 의암호 기준 표시
const LocationInfo = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 5px 0;
  }
  p {
    font-size: 1rem;
    color: #666;
    margin: 0;
    text-align: left;
  }
`;

// 검색 섹션
const SearchSection = styled.div`
  flex: 1;
  max-width: 400px;
  margin: 0 20px;
  position: relative;
  
  .search-input {
    width: 100%;
    padding: 12px 45px 12px 15px;
    border: 2px solid #e0e0e0;
    border-radius: 25px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
    
    &:focus {
      border-color: #007bff;
    }
  }
  
  .search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
  }
`;

// 날씨 정보 섹션
const WeatherSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  .weather-main {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }
  
  .weather-details {
    font-size: 0.9rem;
    color: #666;
    text-align: right;
  }
`;

// 설정 모달
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

// 메인 콘텐츠 영역 - 수질 지수와 파라미터를 좌우로 배치
const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  width: 100%;
`;

// 왼쪽 패널 - 수질 지수 컴포넌트를 포함
const LeftPanel = styled.div<{ $level: WaterQualityLevel }>`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 500px;
  height: 330px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => getLevelBackgroundColor(props.$level)};
    border-radius: 20px;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

// 오른쪽 패널 - 수질 파라미터 컴포넌트를 포함
const RightPanel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 900px;
`;

// 하단 콘텐츠 영역 - 소식지와 과거 수질 상태를 좌우로 배치
const BottomContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  width: 100%;
  
`;

// 소식지 섹션
const NewsSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 500px;
  
  .news-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h3 {
      margin: 0;
      color: #333;
      font-size: 1.2rem;
    }
    
    .more-btn {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      
      &:hover {
        background: #0056b3;
        transform: translateY(-2px);
      }
    }
  }
  
  .news-list {
    .news-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:last-child {
        border-bottom: none;
      }
      
      &:hover {
        background: #f8f9fa;
        padding-left: 10px;
        border-radius: 10px;
      }
      
      .news-title {
        color: #333;
        font-weight: 500;
      }
      
      .news-arrow {
        color: #666;
        font-size: 18px;
      }
    }
  }
`;

// 소식지 모달
const NewsModal = styled.div<{ $isOpen: boolean }>`
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

const NewsModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  
  .news-image {
    width: 100%;
    height: 200px;
    background: #f0f0f0;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 14px;
  }
  
  .news-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
  }
  
  .news-content {
    color: #666;
    line-height: 1.6;
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

// ===== MAIN COMPONENT =====

/**
 * WaterQualityDashboard - 춘천시 의암호 수질 모니터링 대시보드 메인 컴포넌트
 * 
 * 주요 기능:
 * - 실시간 수질 데이터 표시
 * - 5단계 수질 등급 시스템 (안전-주의-경고-위험-심각)
 * - 수질 지수, 파라미터 표시
 * - 상단 로고, 설정, 검색 기능
 * - 실시간 날씨 데이터
 * - 소식지 및 과거 수질 상태 표시
 */
const WaterQualityDashboard: React.FC = () => {
  // 현재 수질 데이터 상태
  const [currentData] = useState<WaterQualityData>(getCurrentWaterQualityData());
  
  // 다크모드 상태
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // 설정 모달 상태
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // 소식지 모달 상태
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);

  // 다크모드 토글
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 소식지 데이터
  const newsData = [
    {
      id: 1,
      title: "2025 춘천시 데이터 활용 해커톤 대회",
      content: "춘천시에서 데이터를 활용한 혁신적인 아이디어를 발굴하는 해커톤 대회를 개최합니다. 참가자들은 춘천시의 다양한 데이터를 활용하여 창의적인 솔루션을 제안할 수 있습니다.",
      image: "해커톤 이미지"
    },
    {
      id: 2,
      title: "춘천시, 여름철 조류 확산에도 수돗물 안전 지켰다",
      content: "올해 여름철 의암호에서 조류가 확산되었지만, 춘천시는 첨단 정수 기술을 활용하여 수돗물의 안전성을 확보했습니다. 시민들의 건강을 최우선으로 하는 정책을 펼치고 있습니다.",
      image: "정수장 이미지"
    },
    {
      id: 3,
      title: "춘천시, 춘천사랑상품권 할인율 13%로 대폭 확대",
      content: "춘천시는 지역 경제 활성화를 위해 춘천사랑상품권의 할인율을 기존 10%에서 13%로 대폭 확대했습니다. 이는 시민들의 구매력을 높이고 지역 상권을 활성화하는 효과가 있을 것으로 기대됩니다.",
      image: "상품권 이미지"
    }
  ];

  // 소식지 클릭 핸들러
  const handleNewsClick = (news: any) => {
    setSelectedNews(news);
    setIsNewsModalOpen(true);
  };

  // 더보기 페이지로 이동
  const handleMoreNews = () => {
    // 여기에 더보기 페이지로 이동하는 로직을 추가할 수 있습니다
    alert('더보기 페이지로 이동합니다.');
  };

  // 로고 클릭 핸들러 - 메인화면으로 이동
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <DashboardContainer $isDarkMode={isDarkMode}>
      
      <ContentWrapper>
      
        {/* 상단 헤더 - 로고, 네비게이션, 설정 아이콘 */}
        <TopHeader>
          <LogoSection onClick={handleLogoClick}>
            <img src="/logo2.png" alt="로고" className="logo" />
          </LogoSection>
          
          <NavigationSection>
            <Navigation />
          </NavigationSection>
          
          <SettingsSection>
            <button 
              className="settings-btn" 
              onClick={() => setIsSettingsOpen(true)}
            >
              <img src="/설정.png" alt="설정" />
            </button>
          </SettingsSection>
        </TopHeader>

        {/* 헤더: 위치 정보 + 검색바 + 날씨 데이터 */}
        <Header>
          <LocationInfo>
            <h1>강원특별자치도 춘천시</h1>
            <p>의암호 기준</p>
          </LocationInfo>
          
          <SearchSection>
            <input 
              type="text" 
              className="search-input" 
              placeholder="춘천"
              defaultValue="춘천"
            />
            <img src="/돋보기.png" alt="검색" className="search-icon" />
          </SearchSection>
          
          <WeatherSection>
            <div className="weather-main">23°C</div>
            <div className="weather-details">맑음 • 습도 65%</div>
          </WeatherSection>
        </Header>

        {/* 메인 콘텐츠: 수질 지수 + 파라미터 */}
        <MainContent>
          <LeftPanel $level={currentData.level}>
            <WaterQualityIndex data={currentData} />
          </LeftPanel>
          
          <RightPanel>
            <WaterQualityParameters data={currentData} />
          </RightPanel>
        </MainContent>

        {/* 하단 콘텐츠: 소식지 + 과거 수질 상태 */}
        <BottomContent>
          <PastWater />
          <NewsSection>
            <div className="news-header">
              <h3>춘천시 소식지</h3>
              <button className="more-btn" onClick={handleMoreNews}>
                더보기
              </button>
            </div>
            <div className="news-list">
              {newsData.map((news) => (
                <div 
                  key={news.id} 
                  className="news-item"
                  onClick={() => handleNewsClick(news)}
                >
                  <span className="news-title">{news.title}</span>
                  <span className="news-arrow">&gt;</span>
                </div>
              ))}
            </div>
          </NewsSection>
        </BottomContent>
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

      {/* 소식지 모달 */}
      <NewsModal $isOpen={isNewsModalOpen}>
        <NewsModalContent>
          <button 
            className="close-btn" 
            onClick={() => setIsNewsModalOpen(false)}
          >
            ×
          </button>
          {selectedNews && (
            <>
              <div className="news-image">{selectedNews.image}</div>
              <h2 className="news-title">{selectedNews.title}</h2>
              <p className="news-content">{selectedNews.content}</p>
            </>
          )}
        </NewsModalContent>
      </NewsModal>
    </DashboardContainer>
  );
};

export default WaterQualityDashboard;
