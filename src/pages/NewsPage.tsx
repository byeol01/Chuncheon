import React, { useState } from 'react';
import styled from 'styled-components';
import CommonHeader from '../components/CommonHeader';

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

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const NewsCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  .news-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 3rem;
    font-weight: bold;
  }
  
  .news-date {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
  
  .news-title {
    color: #333;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 15px;
    line-height: 1.4;
  }
  
  .news-excerpt {
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .news-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    
    .tag {
      background: rgba(0, 123, 255, 0.1);
      color: #007bff;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
`;

const NewsModal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  padding: 30px 30px 20px 30px;
  border-bottom: 1px solid #f0f0f0;
  
  .modal-image {
    width: 100%;
    height: 250px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 4rem;
    font-weight: bold;
  }
  
  .modal-date {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
  
  .modal-title {
    color: #333;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.3;
  }
`;

const ModalBody = styled.div`
  padding: 20px 30px 30px 30px;
  
  .modal-content {
    color: #333;
    line-height: 1.8;
    font-size: 1.1rem;
    margin-bottom: 25px;
  }
  
  .modal-tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    
    .tag {
      background: rgba(0, 123, 255, 0.1);
      color: #007bff;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #666;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #333;
    transform: scale(1.1);
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

const NewsPage: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const newsData = [
    {
      id: 1,
      title: "2025 춘천시 데이터 활용 해커톤 대회",
      content: "춘천시에서 데이터를 활용한 혁신적인 아이디어를 발굴하는 해커톤 대회를 개최합니다. 참가자들은 춘천시의 다양한 데이터를 활용하여 창의적인 솔루션을 제안할 수 있습니다. 이번 대회는 환경 데이터, 교통 데이터, 관광 데이터 등 춘천시의 핵심 데이터를 제공하며, 우수한 아이디어에 대해서는 상금과 함께 실제 구현 기회를 제공합니다. 특히 수질 모니터링과 관련된 혁신적인 솔루션을 찾고 있어, 환경 보호와 기술 혁신을 동시에 추구하는 참가자들의 많은 관심을 기대합니다.",
      image: "해커톤",
      date: "2025-01-15",
      tags: ["해커톤", "데이터", "혁신", "기술"]
    },
    {
      id: 2,
      title: "춘천시, 여름철 조류 확산에도 수돗물 안전 지켰다",
      content: "올해 여름철 의암호에서 조류가 확산되었지만, 춘천시는 첨단 정수 기술을 활용하여 수돗물의 안전성을 확보했습니다. 시민들의 건강을 최우선으로 하는 정책을 펼치고 있습니다. 춘천시는 지난 6월부터 8월까지 의암호에서 발생한 조류 확산에 대응하여 24시간 수질 모니터링 시스템을 가동하고, 고도정수처리 시설을 통해 안전한 수돗물을 공급했습니다. 또한 시민들에게 수질 정보를 실시간으로 제공하는 대시보드를 구축하여 투명성을 높였습니다. 이번 사례는 지자체의 적극적인 환경 관리와 시민 안전 보호 의지를 보여주는 좋은 예시가 되었습니다.",
      image: "정수장",
      date: "2025-01-10",
      tags: ["수질", "안전", "정수", "환경"]
    },
    {
      id: 3,
      title: "춘천시, 춘천사랑상품권 할인율 13%로 대폭 확대",
      content: "춘천시는 지역 경제 활성화를 위해 춘천사랑상품권의 할인율을 기존 10%에서 13%로 대폭 확대했습니다. 이는 시민들의 구매력을 높이고 지역 상권을 활성화하는 효과가 있을 것으로 기대됩니다. 춘천사랑상품권은 지역 내 가맹점에서 사용할 수 있는 지역 화폐로, 할인율 확대로 인해 시민들의 사용률이 크게 증가할 것으로 예상됩니다. 특히 의암호 주변 관광지와 연계하여 관광객들의 지역 상권 이용을 촉진하는 효과도 기대됩니다. 이번 정책은 지역 경제 회복과 관광 활성화를 동시에 추구하는 종합적인 지역 발전 전략의 일환입니다.",
      image: "상품권",
      date: "2025-01-05",
      tags: ["경제", "상품권", "할인", "지역발전"]
    },
    {
      id: 4,
      title: "춘천시 수질 모니터링 시스템 고도화 완료",
      content: "춘천시는 의암호 수질을 실시간으로 모니터링하는 첨단 시스템의 고도화를 완료했습니다. 이번 시스템 고도화를 통해 더욱 정확하고 신뢰할 수 있는 수질 데이터를 제공할 수 있게 되었습니다. 새로운 시스템은 AI 기반 예측 모델을 도입하여 수질 변화를 사전에 예측하고, IoT 센서를 통해 24시간 실시간 모니터링이 가능합니다. 또한 시민들이 쉽게 접근할 수 있는 모바일 앱과 웹 대시보드를 구축하여 수질 정보의 투명성을 높였습니다. 이번 시스템 고도화는 춘천시의 환경 관리 역량을 한 단계 끌어올리는 중요한 성과입니다.",
      image: "모니터링",
      date: "2025-01-01",
      tags: ["수질", "모니터링", "AI", "IoT", "시스템"]
    },
    {
      id: 5,
      title: "의암호 생태계 복원 프로젝트 착수",
      content: "춘천시는 의암호의 건강한 생태계를 복원하기 위한 대규모 프로젝트를 착수했습니다. 이 프로젝트는 수질 개선뿐만 아니라 생물 다양성 회복과 자연 친화적 환경 조성을 목표로 합니다. 프로젝트의 주요 내용으로는 수생식물 복원, 어류 서식지 개선, 습지 복원 등이 포함됩니다. 또한 시민 참여 프로그램을 통해 환경 교육과 체험 활동을 병행하여 환경 의식을 높이는 효과도 기대됩니다. 이번 프로젝트는 의암호를 단순한 수자원이 아닌 생태계의 보고로 만들어가는 중요한 첫걸음이 될 것입니다.",
      image: "생태계",
      date: "2024-12-28",
      tags: ["생태계", "복원", "환경", "생물다양성"]
    },
    {
      id: 6,
      title: "춘천시, 스마트시티 구축으로 환경 관리 혁신",
      content: "춘천시는 스마트시티 구축을 통해 환경 관리 시스템을 혁신적으로 개선하고 있습니다. IoT 센서, 빅데이터 분석, AI 기술을 활용하여 수질, 대기질, 소음 등 다양한 환경 요소를 실시간으로 모니터링하고 있습니다. 특히 의암호 수질 관리에 적용된 스마트 기술은 전국적으로 주목받고 있으며, 다른 지자체의 벤치마킹 대상이 되고 있습니다. 스마트시티 구축을 통해 환경 데이터의 수집부터 분석, 예측까지 일관된 시스템을 구축하여 더욱 효율적이고 과학적인 환경 관리가 가능해졌습니다. 이는 춘천시가 환경 친화적 스마트시티로 발전하는 중요한 기반이 될 것입니다.",
      image: "스마트시티",
      date: "2024-12-25",
      tags: ["스마트시티", "IoT", "AI", "환경관리", "혁신"]
    }
  ];

  const handleNewsClick = (news: any) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <CommonHeader onSettingsClick={() => setIsSettingsOpen(true)} />
        
        <PageHeader>
          <h1>춘천시 소식지</h1>
          <p>춘천시의 최신 소식과 주요 정책을 확인하세요</p>
        </PageHeader>

        <NewsGrid>
          {newsData.map((news) => (
            <NewsCard key={news.id} onClick={() => handleNewsClick(news)}>
              <div className="news-image">{news.image}</div>
              <div className="news-date">{news.date}</div>
              <div className="news-title">{news.title}</div>
              <div className="news-excerpt">
                {news.content.length > 100 
                  ? `${news.content.substring(0, 100)}...` 
                  : news.content
                }
              </div>
              <div className="news-tags">
                {news.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </NewsCard>
          ))}
        </NewsGrid>

        <NewsModal $isOpen={isModalOpen} onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>×</CloseButton>
            {selectedNews && (
              <>
                <ModalHeader>
                  <div className="modal-image">{selectedNews.image}</div>
                  <div className="modal-date">{selectedNews.date}</div>
                  <div className="modal-title">{selectedNews.title}</div>
                </ModalHeader>
                <ModalBody>
                  <div className="modal-content">{selectedNews.content}</div>
                  <div className="modal-tags">
                    {selectedNews.tags.map((tag: string, index: number) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </NewsModal>

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
      </ContentWrapper>
    </PageContainer>
  );
};

export default NewsPage;
