import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const NavContainer = styled.nav`
  background: rgba(255, 255, 255, 0.9); /* 배경색 추가 및 투명도 조절 */
  width: 100%;
  /* max-width: 1440px; */ /* 제거 */
  /* margin: 0 auto; */ /* 제거 */
  padding: 15px 0; /* 좌우 패딩을 Wrapper로 이동 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  position: fixed; /* 상단 고정 */
  top: 0;
  left: 0;
  right: 0; /* 우측으로도 확장 */
  z-index: 1000; /* 다른 요소 위에 오도록 설정 */
  /* display: flex; */ /* Wrapper로 이동 */
  /* justify-content: space-between; */ /* Wrapper로 이동 */
  /* align-items: center; */ /* Wrapper로 이동 */
`;

const Wrapper = styled.div` /* 로고와 NavList를 감싸는 Wrapper 추가 */
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px; /* 좌우 패딩을 Wrapper에 적용 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NavList = styled.ul`
  display: flex;
  /* justify-content: center; */ /* flex-end로 변경 */
  align-items: center;
  gap: 30px;
  list-style: none;
  margin: 0 0 0 auto; /* margin-left: auto로 변경하여 오른쪽으로 밀어냅니다. */
  padding: 0;
`;

const NavItem = styled.li<{ $isActive: boolean }>`
  .nav-link {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    border-radius: 25px;
    text-decoration: none;
    color: ${props => props.$isActive ? '#007bff' : '#666'};
    background: ${props => props.$isActive ? 'rgba(0, 123, 255, 0.1)' : 'transparent'};
    font-weight: ${props => props.$isActive ? '600' : '500'};
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      color: #007bff;
      background: rgba(0, 123, 255, 0.1);
      transform: translateY(-2px);
    }
  }
`;

const Logo = styled.div`
  cursor: pointer;
  /* font-weight: bold; */ /* 제거 */
  /* font-size: 1.5rem; */ /* 제거 */
  /* color: #007bff; */ /* 제거 */
  /* margin-right: 30px; */ /* 제거 */
  img {
    height: 40px; /* 로고 이미지 높이 조정 */
    width: auto;
  }
`;

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/miri-c', label: 'MIRI-C' },
    { path: '/tourist-spots', label: '관광명소' },
    { path: '/water-quality-map', label: '수질지도' },
    { path: '/news', label: '춘천환경소식지' },
    { path: '/contact', label: '제보하기' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <NavContainer>
      <Wrapper>
        <Logo onClick={() => handleNavigation('/')}> {/* 로고 클릭 시 메인 대시보드로 이동 */}
          <img src="/logo.png" alt="로고" />
        </Logo>
        <NavList>
          {navItems.map((item) => (
            <NavItem 
              key={item.path} 
              $isActive={location.pathname === item.path}
            >
              <div 
                className="nav-link"
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </div>
            </NavItem>
          ))}
        </NavList>
      </Wrapper>
    </NavContainer>
  );
};

export default Navigation;
