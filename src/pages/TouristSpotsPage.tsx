import React, { useState } from 'react';
import Modal from '../components/Modal';
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
  padding-top: 80px; /* 내비게이션 바 높이만큼 패딩 추가 */
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
`;

const TouristSpotsPage: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);

  const handleImageClick = (spot: TouristSpot) => {
    setSelectedSpot(spot);
  };

  const closeModal = () => {
    setSelectedSpot(null);
  };

  return (
    <PageContainer> {/* PageContainer로 감싸기 */}
      <h1>관광명소</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {mockTouristSpots.map((spot) => (
          <div key={spot.id} style={{ border: '1px solid #ccc', padding: '10px', cursor: 'pointer' }} onClick={() => handleImageClick(spot)}>
            <img src={spot.imageUrl} alt={spot.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <h3>{spot.name}</h3>
          </div>
        ))}
      </div>

      {selectedSpot && (
        <Modal onClose={closeModal}>
          <h2>{selectedSpot.name}</h2>
          <img src={selectedSpot.imageUrl} alt={selectedSpot.name} style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '10px' }} />
          <p><strong>주소:</strong> {selectedSpot.address}</p>
          <p><strong>설명:</strong> {selectedSpot.description}</p>
          <p><strong>운영 시간:</strong> {selectedSpot.operatingHours}</p>
          <p><strong>가격:</strong> {selectedSpot.price}</p>
        </Modal>
      )}
    </PageContainer>
  );
};

export default TouristSpotsPage;