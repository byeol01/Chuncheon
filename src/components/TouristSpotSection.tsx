import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from './Modal'; // Modal 컴포넌트 임포트

interface TouristSpot {
  id: number;
  name: string;
  imageUrl: string;
  address: string;
  description: string;
  operatingHours: string;
  price: string;
}

// TouristSpotsPage에서 사용한 mock 데이터와 동일하게 유지
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

const Container = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 900px; /* 대시보드 레이아웃에 맞게 조정 */

  .slick-prev:before, .slick-next:before {
    color: #007bff;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 20px 0;
  color: #333;
  font-weight: 600;
`;

const SpotItem = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
  }
`;

const TouristSpotSection: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleSpotClick = (spot: TouristSpot) => {
    setSelectedSpot(spot);
  };

  const closeModal = () => {
    setSelectedSpot(null);
  };

  return (
    <Container>
      <Title>춘천 관광명소</Title>
      <Slider {...settings}>
        {mockTouristSpots.map((spot) => (
          <div key={spot.id}>
            <SpotItem onClick={() => handleSpotClick(spot)}>
              <img src={spot.imageUrl} alt={spot.name} />
              <p>{spot.name}</p>
            </SpotItem>
          </div>
        ))}
      </Slider>

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
    </Container>
  );
};

export default TouristSpotSection;
