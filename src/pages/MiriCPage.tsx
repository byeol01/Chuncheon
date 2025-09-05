import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 80px; /* 내비게이션 바 높이만큼 패딩 추가 */
  min-height: 100vh;
`;

const MiriCPage: React.FC = () => {
  return (
    <PageContainer>
      <h1>MIRI-C</h1>
      <p>플랫폼 상세 설명과 시스템 구현 방식, 그리고 우리 사이트가 이루고자 하는 목표를 설명하는 페이지입니다.</p>
    </PageContainer>
  );
};

export default MiriCPage;
