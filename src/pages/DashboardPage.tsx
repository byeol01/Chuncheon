import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import Navigation from '../components/Navigation';
import { StatusText, Description, getLevelText } from '../components/TourismIndex'; // TourismIndex에서 내보낸 컴포넌트 임포트
import TourismParameters from '../components/TourismParameters'; 
import TouristSpotSection from '../components/TouristSpotSection';
import WaterQualityIcon from '../components/Icons'; // 아이콘 컴포넌트 임포트

const PageContainer = styled.div`
  min-height: 100vh;
  background: #F2F4F8;
  padding: 80px 20px 20px 20px; /* 상단 패딩 추가 */
  font-family: 'Noto Sans KR', sans-serif;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 20px;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
  width: 100%;
`;

const LeftPanel = styled.div<{ $level?: number }>` // $level 타입을 일반 숫자로 변경
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 500px;
  height: 400px;
  display: flex; /* flex 컨테이너로 변경 */
  flex-direction: column; /* 세로 방향 정렬 */
  padding: 30px; /* 모든 방향 패딩 통일 */
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

const DateButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px; /* 관광지수 텍스트 아래에 배치 */
  margin-bottom: 20px; /* 메인 콘텐츠와의 간격 */
  align-self: flex-start; /* LeftPanel의 왼쪽 정렬 */
`;

const DateButton = styled.button<{ $isActive: boolean }>`
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid ${props => (props.$isActive ? '#007bff' : '#ccc')};
  background-color: ${props => (props.$isActive ? '#007bff' : '#fff')};
  color: ${props => (props.$isActive ? '#fff' : '#333')};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => (props.$isActive ? '#0056b3' : '#f0f0f0')};
    color: ${props => (props.$isActive ? '#fff' : '#000')};
  }
`;

const TourismTitle = styled.h2` /* 관광지수 텍스트를 위한 새로운 styled component */
  font-size: 1.8rem;
  color: #333;
  font-weight: 600;
  margin: 0; /* 기본 margin 제거 */
  align-self: flex-start; /* LeftPanel의 왼쪽 정렬 */
`;

const MainContentCenter = styled.div` /* 아이콘과 설명을 중앙에 배치하기 위한 컨테이너 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1; /* 남은 공간을 채우도록 */
  padding-top: 0; /* 더 이상 필요 없음 */
`;

interface TourismData {
  comfort: number;
  climateTemp: number;
  waterQuality: number;
  level: number;
  status: string;
  description: string;
}

const mockTourismDataToday: TourismData = {
  comfort: 85,
  climateTemp: 25,
  waterQuality: 90,
  level: 1, // 우수
  status: '우수',
  description: '오늘은 춘천 관광하기에 매우 쾌적하고 물 관련 활동도 좋습니다.',
};

const mockTourismDataTomorrow: TourismData = {
  comfort: 70,
  climateTemp: 27,
  waterQuality: 75,
  level: 3, // 보통
  status: '보통',
  description: '내일은 기온이 약간 오르고, 전반적인 관광 활동에 보통 수준의 쾌적함이 예상됩니다.',
};

const DashboardPage: React.FC = () => {
  const [isToday, setIsToday] = useState(true);
  const currentTourismData = isToday ? mockTourismDataToday : mockTourismDataTomorrow;
  const navigate = useNavigate(); // useNavigate 훅 초기화

  const newsData = [
    {
      id: 1,
      title: "춘천시, 환경 보호 캠페인 시작",
    },
    {
      id: 2,
      title: "의암호 수질 개선 사업 추진",
    },
    {
      id: 3,
      title: "춘천 환경 사랑 시민 참여 유도",
    }
  ];

  const handleMoreNews = () => {
    navigate('/news'); // 춘천환경소식지 페이지로 이동
  };

  return (
    <PageContainer>
      <ContentWrapper>
            <Navigation />

        <MainContent>
          <LeftPanel $level={currentTourismData.level}>
            <TourismTitle>관광지수</TourismTitle> 
            <DateButtonContainer> 
              <DateButton $isActive={isToday} onClick={() => setIsToday(true)}>오늘</DateButton>
              <DateButton $isActive={!isToday} onClick={() => setIsToday(false)}>내일</DateButton>
            </DateButtonContainer>
            
            <MainContentCenter>
              <WaterQualityIcon level={currentTourismData.level} size={100} /> {/* 아이콘 이미지 */}
              <StatusText $level={currentTourismData.level}>
                {getLevelText(currentTourismData.level)}
              </StatusText>
              <Description>
                {currentTourismData.description}
              </Description>
            </MainContentCenter>

          </LeftPanel>
          
          <RightPanel>
            <TourismParameters data={currentTourismData} />
          </RightPanel>
        </MainContent>

        <BottomContent>
          <TouristSpotSection />
          <NewsSection>
            <div className="news-header">
              <h3>춘천환경소식지</h3>
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
