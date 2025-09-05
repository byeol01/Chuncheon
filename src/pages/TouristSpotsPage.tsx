import React, { useState } from 'react';
// import Modal from '../components/Modal'; // Modal 컴포넌트 제거
import styled from 'styled-components'; // styled-components import

interface TouristSpot {
  id: number;
  name: string;
  imageUrl: string;
  address: string;
  description: string;
  operatingHours: string;
  price: string;
}

const mockTouristSpots: TouristSpot[] = [
  {
    id: 1,
    name: "춘천닭갈비골목",
    imageUrl: "/명동닭갈비거리.png",
    address: "강원 춘천시 금강로62번길 4",
    description: "춘천의 명물 닭갈비를 맛볼 수 있는 골목입니다. 다양한 닭갈비 식당들이 모여있어 취향에 따라 선택할 수 있습니다.",
    operatingHours: "매일 10:00 - 22:00",
    price: "1인분 12,000원부터",
  },
  {
    id: 2,
    name: "소양강 스카이워크",
    imageUrl: "/스카이워크.png",
    address: "강원 춘천시 영서로 2675",
    description: "소양강 위에 설치된 투명한 바닥의 스카이워크입니다. 아찔한 경험과 함께 아름다운 소양강을 조망할 수 있습니다.",
    operatingHours: "하절기(3~10월) 10:00 - 20:00, 동절기(11~2월) 10:00 - 17:00",
    price: "무료",
  },
  {
    id: 3,
    name: "남이섬",
    imageUrl: "/남이섬.png",
    address: "강원 춘천시 남산면 남이섬길 1",
    description: "아름다운 자연과 다양한 문화시설이 어우러진 섬입니다. 드라마 겨울연가의 촬영지로도 유명합니다.",
    operatingHours: "매일 08:00 - 21:00 (선박 운항 시간 변동)",
    price: "입장료 16,000원 (성인 기준)",
  },
  {
    id: 4,
    name: "제이드가든 수목원",
    imageUrl: "/제이드가든수목원.png",
    address: "강원 춘천시 남산면 서천리 산111",
    description: "유럽의 숲을 그대로 옮겨놓은 듯한 아름다운 수목원입니다. 다양한 테마 정원과 산책로가 있습니다.",
    operatingHours: "매일 09:00 - 18:00",
    price: "입장료 10,000원",
  },
  {
    id: 5,
    name: "강촌 레일바이크",
    imageUrl: "/강촌레일바이크.png",
    address: "강원 춘천시 남산면 강촌구곡길 17",
    description: "폐철로 위를 달리며 북한강의 아름다운 풍경을 감상할 수 있는 레일바이크입니다.",
    operatingHours: "매일 09:00 - 17:00 (사전 예약 필수)",
    price: "2인승 30,000원, 4인승 45,000원",
  },
];

const PageContainer = styled.div`
  padding-top: 100px; /* 내비게이션 바 높이만큼 패딩 추가 */
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
  display: flex; /* Flexbox 컨테이너로 변경 */
  gap: 30px; /* 두 열 사이의 간격 */
`;

const LeftPanel = styled.div`
  flex: 1; /* 남은 공간을 채우도록 */
  max-width: 70%; /* 왼쪽 패널의 최대 너비 */
  display: grid; /* 그리드 레이아웃 */
  grid-template-columns: repeat(3, 1fr); /* 3개씩 보이도록 */
  gap: 20px; /* 그리드 아이템 간의 간격 */
  padding: 20px; /* 패널 내부 패딩 */
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const RightPanel = styled.div`
  flex: 1; /* 남은 공간을 채우도록 */
  max-width: 30%; /* 오른쪽 패널의 최대 너비 */
  padding: 20px; /* 패널 내부 패딩 */
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SpotItem = styled.div<{ $isActive: boolean }>`
  border: 1px solid ${props => props.$isActive ? '#007bff' : '#ccc'};
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
  }
`;

const DetailImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const DetailTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
`;

const DetailText = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
  line-height: 1.4;

  strong {
    color: #333;
  }
`;

const TouristSpotsPage: React.FC = () => {
  const [activeSpotId, setActiveSpotId] = useState<number>(mockTouristSpots[0].id);
  const selectedSpot = mockTouristSpots.find(spot => spot.id === activeSpotId);

  const handleSpotClick = (id: number) => {
    setActiveSpotId(id);
  };

  return (
    <PageContainer>
      <LeftPanel>
        <h1>관광명소</h1>
        {mockTouristSpots.map((spot) => (
          <SpotItem
            key={spot.id}
            $isActive={activeSpotId === spot.id}
            onClick={() => handleSpotClick(spot.id)}
          >
            <img src={spot.imageUrl} alt={spot.name} />
            <h3>{spot.name}</h3>
          </SpotItem>
        ))}
      </LeftPanel>

      <RightPanel>
        {selectedSpot ? (
          <div>
            <DetailTitle>{selectedSpot.name}</DetailTitle>
            <DetailImage src={selectedSpot.imageUrl} alt={selectedSpot.name} />
            <DetailText><strong>주소:</strong> {selectedSpot.address}</DetailText>
            <DetailText><strong>설명:</strong> {selectedSpot.description}</DetailText>
            <DetailText><strong>운영 시간:</strong> {selectedSpot.operatingHours}</DetailText>
            <DetailText><strong>가격:</strong> {selectedSpot.price}</DetailText>
          </div>
        ) : (
          <p>관광명소를 선택해주세요.</p>
        )}
      </RightPanel>
    </PageContainer>
  );
};

export default TouristSpotsPage;