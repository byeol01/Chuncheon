import React, { useState } from 'react';
import Modal from '../components/Modal';
import styled from 'styled-components'; // styled-components import

interface WaterBody {
  id: number;
  name: string;
  type: 'river' | 'bridge';
  coords: string; // 지도에 표시될 좌표 (간단하게 문자열로 표현)
  imageUrl: string;
  address: string;
  qualityInfo: string; // 수질 정보 상세 설명
}

const mockWaterBodies: WaterBody[] = [
  {
    id: 1,
    name: "태백교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 태백교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 2,
    name: "팔미천",
    type: 'river',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 팔미천",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 3,
    name: "오탄리",
    type: 'river',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 오탄리",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 4,
    name: "윗샘밭교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 윗샘밭교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 5,
    name: "강촌교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 강촌교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 6,
    name: "효자교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 효자교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 7,
    name: "한계천",
    type: 'river',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 한계천",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 8,
    name: "공지천교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 공지천교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 9,
    name: "한덕교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 한덕교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 10,
    name: "납실교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 납실교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 11,
    name: "신연교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 신연교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 12,
    name: "퇴계교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 퇴계교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 13,
    name: "소양교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 소양교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 14,
    name: "하일교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 하일교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 15,
    name: "장학교",
    type: 'bridge',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 장학교",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
  {
    id: 16,
    name: "만천천",
    type: 'river',
    coords: "", // Placeholder
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 만천천",
    qualityInfo: "현재 수질 정보 준비 중입니다.",
  },
];

const PageContainer = styled.div`
  padding-top: 100px; /* 내비게이션 바 높이만큼 패딩 추가 */
  min-height: 100vh;
  display: flex;
  align-items: flex-start; /* 상단 정렬 */
`;

const MapPanel = styled.div`
  flex: 2; /* 지도 공간을 더 넓게 */
  border-right: 1px solid #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListPanel = styled.div`
  flex: 1; /* 목록 공간 */
  padding: 20px;
  display: flex; /* Flexbox 컨테이너로 변경 */
  flex-direction: column; /* 세로 방향 정렬 */
  gap: 10px; /* 목록 항목 간 간격 */
  
`;

const WaterBodyListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2열 배치 */
  gap: 10px; /* 그리드 항목 간 간격 */
  margin-top: 10px;
`;

const WaterBodyListItem = styled.button<{ id: number; $selectedId?: number }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  cursor: pointer;
  height: 77px; /* 리스트 높이 */
  background-color: ${props => (props.id === props.$selectedId ? '#e6f7ff' : '#fff')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  span {
    font-size: 1rem;
    color: #333;
  }
`;

const NumberPin = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const ModalText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 5px;

  strong {
    color: #333;
  }
`;

const WaterQualityMapPage: React.FC = () => {
  const [selectedWaterBody, setSelectedWaterBody] = useState<WaterBody | null>(null);

  const handleButtonClick = (waterBody: WaterBody) => {
    setSelectedWaterBody(waterBody);
  };

  const closeModal = () => {
    setSelectedWaterBody(null);
  };

  return (
    <PageContainer>
      <MapPanel>
        <h1>춘천 수질 지도</h1>
        <img src="/춘천하천지도.png" alt="춘천 지도" style={{ width: '800px', height: '700px' }} />
        <p>지도에 하천과 대교 이름이 표시됩니다.</p>
      </MapPanel>

      <ListPanel>
        <h2>하천/대교 목록</h2>
        <WaterBodyListGrid>
          {mockWaterBodies.map((wb) => (
            <WaterBodyListItem
              key={wb.id}
              id={wb.id}
              $selectedId={selectedWaterBody?.id}
              onClick={() => handleButtonClick(wb)}
            >
              <NumberPin>{wb.id}</NumberPin>
              <span>{wb.name}</span>
            </WaterBodyListItem>
          ))}
        </WaterBodyListGrid>
      </ListPanel>

      {selectedWaterBody && (
        <Modal onClose={closeModal}>
          <ModalTitle>{selectedWaterBody.name}</ModalTitle>
          <ModalImage src={selectedWaterBody.imageUrl} alt={selectedWaterBody.name} />
          <ModalText><strong>주소:</strong> {selectedWaterBody.address}</ModalText>
          <ModalText><strong>수질 정보:</strong> {selectedWaterBody.qualityInfo}</ModalText>
        </Modal>
      )}
    </PageContainer>
  );
};

export default WaterQualityMapPage;
