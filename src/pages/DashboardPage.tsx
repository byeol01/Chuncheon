import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import WaterQualityIndex from '../components/Index';
import WaterQualityParameters from '../components/Parameters';
import PastWater from '../components/PastWater';
import { WaterQualityData, WaterQualityLevel } from '../types/waterQuality';
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
`;

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

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  width: 100%;
`;

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
    background: ${props => {
      switch (props.$level) {
        case 1: return 'rgba(0, 200, 81, 0.05)';
        case 2: return 'rgba(76, 175, 80, 0.05)';
        case 3: return 'rgba(255, 193, 7, 0.05)';
        case 4: return 'rgba(255, 152, 0, 0.05)';
        case 5: return 'rgba(244, 67, 54, 0.05)';
        default: return 'rgba(158, 158, 158, 0.05)';
      }
    }};
    border-radius: 20px;
    z-index: 0;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const RightPanel = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 900px;
`;

const BottomContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  width: 100%;
`;

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

const DashboardPage: React.FC = () => {
  // 통합된 수질 데이터 생성 (모든 컴포넌트에 동일하게 전달)
  const [integratedData] = React.useState(() => {
    // 고정된 테스트 데이터 생성 - "주의" 상태로 통일
    const baseData: WaterQualityData = {
      turbidity: 35.0, // 탁도 - 위험 수준
      algae: 35000, // 조류 - 위험 수준
      dissolvedOxygen: 3.2, // 용존산소량 - 위험 수준
      ph: 7.2, // pH
      level: 4 as WaterQualityLevel, // 수질 레벨 (주의)
      status: '주의',
      timestamp: new Date()
    };
    
    // 과거 데이터도 동일한 기준으로 생성
    const today = new Date();
    const pastData = [];
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // 오늘 데이터는 baseData와 동일하게 "주의" 상태
      if (i === 0) {
        pastData.push({
          date: date.toISOString().split('T')[0],
          label: '오늘',
          isToday: true,
          status: '주의', // 오늘은 "주의" 상태로 통일
          iconPath: '/경고.png', // 경고 아이콘 사용
          data: {
            turbidity: baseData.turbidity,
            algae: baseData.algae,
            dissolvedOxygen: baseData.dissolvedOxygen,
            temperature: 26.0,
            ph: baseData.ph,
            conductivity: 250
          },
          weather: {
            temperature: 23,
            humidity: 65,
            rainfall: 0,
            windSpeed: 5,
            pressure: 1013
          },
          prediction: {
            confidence: 85,
            trend: 'stable',
            factors: ['기상 조건', '계절성 변화']
          }
        });
      } else {
        // 과거/미래 데이터는 다른 상태로 설정
        let status, iconPath;
        if (i < 0) {
          // 과거 데이터는 더 좋은 상태
          if (i === -3) {
            status = '우수';
            iconPath = '/매우안전.png';
          } else if (i === -2) {
            status = '양호';
            iconPath = '/안전.png';
          } else {
            status = '보통';
            iconPath = '/주의.png';
          }
        } else {
          // 미래 데이터는 더 나쁜 상태
          if (i === 1) {
            status = '주의';
            iconPath = '/경고.png';
          } else if (i === 2) {
            status = '불량';
            iconPath = '/위험.png';
          } else {
            status = '불량';
            iconPath = '/위험.png';
          }
        }
        
        pastData.push({
          date: date.toISOString().split('T')[0],
          label: i < 0 ? date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }) : date.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }),
          isToday: false,
          status: status,
          iconPath: iconPath,
          data: {
            turbidity: baseData.turbidity * (1 + (Math.random() - 0.5) * 0.2),
            algae: baseData.algae * (1 + (Math.random() - 0.5) * 0.2),
            dissolvedOxygen: baseData.dissolvedOxygen * (1 + (Math.random() - 0.5) * 0.2),
            temperature: 26.0 + (Math.random() - 0.5) * 2,
            ph: baseData.ph + (Math.random() - 0.5) * 0.1,
            conductivity: 250 + (Math.random() - 0.5) * 20
          },
          weather: {
            temperature: 23 + (Math.random() - 0.5) * 4,
            humidity: 65 + (Math.random() - 0.5) * 10,
            rainfall: Math.random() * 10,
            windSpeed: 5 + Math.random() * 3,
            pressure: 1013 + (Math.random() - 0.5) * 10
          },
          prediction: {
            confidence: 85 + Math.random() * 10,
            trend: i < 0 ? 'improving' : i > 0 ? 'worsening' : 'stable',
            factors: ['기상 조건', '계절성 변화']
          }
        });
      }
    }
    
    return {
      current: baseData,
      past: pastData
    };
  });

  const newsData = [
    {
      id: 1,
      title: "2025 춘천시 데이터 활용 해커톤 대회",
    },
    {
      id: 2,
      title: "춘천시, 여름철 조류 확산에도 수돗물 안전 지켰다",
    },
    {
      id: 3,
      title: "춘천시, 춘천사랑상품권 할인율 13%로 대폭 확대",
    }
  ];

  const handleMoreNews = () => {
    // 여기에 더보기 페이지로 이동하는 로직을 추가할 수 있습니다
    alert('더보기 페이지로 이동합니다.');
  };

  // 로고 클릭 핸들러 - 메인화면으로 이동
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <TopHeader>
          <LogoSection onClick={handleLogoClick}>
            <img src="/logo2.png" alt="로고" className="logo" />
          </LogoSection>
          
          <NavigationSection>
            <Navigation />
          </NavigationSection>
          
          <SettingsSection>
            <button className="settings-btn">
              <img src="/설정.png" alt="설정" />
            </button>
          </SettingsSection>
        </TopHeader>

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

        <MainContent>
          <LeftPanel $level={integratedData.current.level}>
            <WaterQualityIndex data={integratedData.current} />
          </LeftPanel>
          
          <RightPanel>
            <WaterQualityParameters data={integratedData.current} />
          </RightPanel>
        </MainContent>

        <BottomContent>
          <PastWater data={integratedData.past} />
          <NewsSection>
            <div className="news-header">
              <h3>춘천시 소식지</h3>
              <button className="more-btn" onClick={handleMoreNews}>
                더보기
              </button>
            </div>
            <div className="news-list">
              {newsData.map((news) => (
                <div key={news.id} className="news-item">
                  <span className="news-title">{news.title}</span>
                  <span className="news-arrow">&gt;</span>
                </div>
              ))}
            </div>
          </NewsSection>
        </BottomContent>
      </ContentWrapper>
    </PageContainer>
  );
};

export default DashboardPage;
