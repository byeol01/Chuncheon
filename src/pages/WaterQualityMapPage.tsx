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
    name: "소양강",
    type: 'river',
    coords: "37.880, 127.730",
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 소양강",
    qualityInfo: "소양강 상류는 깨끗한 수질을 유지하고 있으며, 생활용수 및 농업용수로 활용됩니다. 최근 수질 검사 결과 \"좋음\" 등급을 받았습니다.",
  },
  {
    id: 2,
    name: "춘천대교",
    type: 'bridge',
    coords: "37.885, 127.725",
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 춘천대교",
    qualityInfo: "춘천대교 주변의 수질은 보통 수준입니다. 주기적인 오염원 감시와 관리가 필요합니다. 최근 수질 검사 결과 \"보통\" 등급을 받았습니다.",
  },
  {
    id: 3,
    name: "의암호",
    type: 'river',
    coords: "37.860, 127.690",
    imageUrl: "https://via.placeholder.com/300",
    address: "강원 춘천시 의암호",
    qualityInfo: "의암호는 주변 관광지와 밀접하여 수질 관리가 중요합니다. 현재 \"좋음\" 등급을 유지하고 있으나, 지속적인 모니터링이 필요합니다.",
  },
];

const PageContainer = styled.div`
  padding-top: 100px; /* 내비게이션 바 높이만큼 패딩 추가 */
  min-height: 100vh;
  display: flex;
`;

const MapPanel = styled.div`
  flex: 1;
  border-right: 1px solid #ccc;
  padding: 20px;
`;

const ListPanel = styled.div`
  flex: 0.5;
  padding: 20px;
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
        {/* 실제 지도 API 연동 부분 - 여기서는 간단한 이미지로 대체 */}
        <img src="https://via.placeholder.com/600x400?text=Chuncheon+Map" alt="춘천 지도" style={{ width: '100%', height: 'auto' }} />
        <p>지도에 하천과 대교 이름이 표시됩니다.</p>
      </MapPanel>

      <ListPanel>
        <h2>하천/대교 목록</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {mockWaterBodies.map((wb) => (
            <button key={wb.id} onClick={() => handleButtonClick(wb)} style={{ padding: '10px', border: '1px solid #eee', borderRadius: '5px', cursor: 'pointer' }}>
              {wb.name} ({wb.type === 'river' ? '하천' : '대교'})
            </button>
          ))}
        </div>
      </ListPanel>

      {selectedWaterBody && (
        <Modal onClose={closeModal}>
          <h2>{selectedWaterBody.name}</h2>
          <img src={selectedWaterBody.imageUrl} alt={selectedWaterBody.name} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '10px' }} />
          <p><strong>주소:</strong> {selectedWaterBody.address}</p>
          <p><strong>수질 정보:</strong> {selectedWaterBody.qualityInfo}</p>
        </Modal>
      )}
    </PageContainer>
  );
};

export default WaterQualityMapPage;
