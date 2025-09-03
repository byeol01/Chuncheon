import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const NavContainer = styled.nav`
  background: transparent;
  width: 100%;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  list-style: none;
  margin: 0;
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

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'MIRI-C' },
    { path: '/water-quality-index', label: '수질지수' },
    { path: '/parameters', label: '수질파라미터' },
    { path: '/past-water', label: '과거수질 상태 및 예측' },
    { path: '/news', label: '춘천소식지' },
    { path: '/contact', label: '문의하기' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <NavContainer>
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
    </NavContainer>
  );
};

export default Navigation;
