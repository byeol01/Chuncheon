import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';

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
  position: sticky;
  top: 20px;
  z-index: 1000;
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

interface CommonHeaderProps {
  onSettingsClick?: () => void;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ onSettingsClick }) => {
  // 로고 클릭 핸들러 - 메인 대시보드로 이동
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
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
          onClick={onSettingsClick}
        >
          <img src="/설정.png" alt="설정" />
        </button>
      </SettingsSection>
    </TopHeader>
  );
};

export default CommonHeader;
