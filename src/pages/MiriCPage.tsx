import React from 'react';
import styled from 'styled-components';
// import miriCLogo from '../../public/logo.png'; // 로고 이미지 임포트 제거

const PageContainer = styled.div`
  padding-top: 100px; /* 내비게이션 바 높이만큼 패딩 추가 */
  min-height: 100vh;
  background: #F2F4F8; /* 페이지 전체 배경색 */
  font-family: 'Noto Sans KR', sans-serif;
  color: #333;
  line-height: 1.6;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 60px;
  padding: 60px 0;
  background: linear-gradient(135deg, #e0f7fa 0%, #bbdefb 100%); /* 그라데이션 배경 */
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 3.5rem;
    color: #0d47a1;
    margin-bottom: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  p {
    font-size: 1.4rem;
    color: #1976d2;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  vertical-align: middle;
  border-radius: 10px; /* 로고 이미지에 약간의 둥근 모서리 */
`;

const SectionWrapper = styled.section`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
`;

const SectionHeader = styled.h2`
  font-size: 2.2rem;
  color: #0d47a1;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
  position: relative;
  
  &::after {
    content: '';
    width: 60px;
    height: 4px;
    background-color: #007bff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -10px;
    border-radius: 2px;
  }
`;

const ContentBlock = styled.div`
  margin-bottom: 25px;
  font-size: 1.1rem;
  color: #555;
  
  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #0d47a1;
    font-weight: 600;
  }
`;

const HighlightText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #007bff;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
  background: #e3f2fd;
  padding: 15px 20px;
  border-radius: 10px;
  border-left: 5px solid #007bff;
`;

const FormulaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  padding: 25px;
  background: #f0f8ff; /* 연한 파란색 배경 */
  border-radius: 15px;
  border: 1px solid #d0e8ff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const FormulaBox = styled.div`
  background: #e3f2fd;
  color: #1a237e;
  font-family: 'Roboto Mono', monospace;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 15px 30px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #90caf9;
`;

const VariableList = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 20px;
  font-size: 1rem;
  color: #424242;
  text-align: left;
  width: 100%;
  max-width: 500px;

  strong {
    color: #0d47a1;
    font-weight: 600;
  }
`;

const VariableItem = styled.div`
  display: contents;
`;

const ProcessFlow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 30px 0;
  flex-wrap: wrap;

  .step {
    background: #ffffff;
    padding: 15px 25px;
    border-radius: 25px;
    border: 1px solid #b3e5fc;
    color: #01579b;
    font-weight: 600;
    font-size: 1.1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    white-space: nowrap;
  }

  .arrow {
    font-size: 1.5rem;
    color: #007bff;
    font-weight: bold;
  }
`;

const ReferenceSection = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px dashed #e0e0e0;

  h3 {
    font-size: 1.6rem;
    color: #0d47a1;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const ReferenceItem = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.5;
  text-indent: -20px;
  padding-left: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const FeatureItem = styled.div`
  background: #f8f8f8;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }

  h3 {
    color: #0d47a1;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  p {
    color: #666;
    font-size: 1rem;
  }
`;

const MiriCPage: React.FC = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <HeroSection>
          <h1>
            <LogoImage src={'/logo.png'} alt="MIRI-C Logo" /> {/* 로고 경로 직접 참조 */}
            MIRI-C
          </h1>
          <p>춘천시의 아름다운 자연과 깨끗한 수질을 위한 혁신적인 플랫폼</p>
        </HeroSection>

        <SectionWrapper>
          <SectionHeader>MIRI-C의 의미</SectionHeader>
          <ContentBlock>
            <p>
              <HighlightText>
                <strong>MIRI-C</strong> (Multi-Indicator Risk Index for leisure in Chuncheon)는
                <strong> 춘천시 수질 데이터를 활용한 관광환경지수</strong>를 의미합니다.
              </HighlightText>
            </p>
            <p>
              이 지수는 춘천시의 호수와 강 등 수자원 환경에 대한 다각적인 데이터를 분석하여
              관광객들이 안전하고 쾌적하게 물 관련 레저 활동을 즐길 수 있도록 돕는
              종합적인 환경 지표입니다. MIRI-C는 단순히 수질 데이터를 제공하는 것을 넘어,
              이를 기반으로 관광 활동의 위험도를 예측하고 맞춤형 정보를 제공하여
              관광객들의 만족도를 높이는 데 기여합니다.
            </p>
          </ContentBlock>
        </SectionWrapper>

        <SectionWrapper>
          <SectionHeader>플랫폼 소개</SectionHeader>
          <ContentBlock>
            <p>
              MIRI-C는 춘천시의 수질 환경을 실시간으로 모니터링하고 분석하여,
              관광객 및 시민들에게 신뢰성 높은 <strong>관광환경지수</strong>를 제공하는 플랫폼입니다.
              이 플랫폼은 춘천시의 주요 관광 명소와 연계된 수질 정보를
              직관적이고 이해하기 쉬운 형태로 제공하여, 방문객들이 안심하고
              여행 계획을 세울 수 있도록 지원합니다. 또한, 환경 변화에 대한
              빠른 대응과 선제적인 정보 제공을 통해 춘천시의 지속 가능한
              관광 생태계를 조성하는 데 중요한 역할을 합니다.
            </p>
          </ContentBlock>
          <FeatureGrid>
            <FeatureItem>
              <h3>실시간 데이터 분석</h3>
              <p>최첨단 센서와 빅데이터 기술로 춘천시 수질을 24시간 모니터링합니다.</p>
            </FeatureItem>
            <FeatureItem>
              <h3>관광환경지수 제공</h3>
              <p>수질 데이터를 기반으로 관광객을 위한 맞춤형 환경 지수를 산출합니다.</p>
            </FeatureItem>
            <FeatureItem>
              <h3>예측 및 알림 서비스</h3>
              <p>미래의 수질 변화를 예측하고 위험 상황을 사전에 사용자에게 알립니다.</p>
            </FeatureItem>
          </FeatureGrid>
        </SectionWrapper>

        <SectionWrapper>
          <SectionHeader>핵심 기술 및 데이터 산출 방식</SectionHeader>
          <ContentBlock>
            <p>
              MIRI-C는 <strong>IoT 기반의 수질 센서 네트워크</strong>를 통해 춘천시 전역의 주요
              하천과 호수에서 실시간으로 수질 데이터를 수집하고 분석합니다. 
              이러한 데이터는 관광객의 활동에 영향을 미칠 수 있는 환경 요소를 정확하게 분석하고 예측하는 데 활용됩니다.
            </p>
          </ContentBlock>

          <h3 style={{ fontSize: '1.6rem', color: '#0d47a1', marginBottom: '20px', textAlign: 'center', marginTop: '40px' }}>
            관광환경지수(TEI) 산출 모델
          </h3>

          <FormulaContainer>
            <p style={{ fontSize: '1.2rem', color: '#1976d2', marginBottom: '20px', textAlign: 'center' }}>
              기존의 <strong>“관광기후지수 (TCI, Tourism Climate Index)”</strong>에는 수질 정보가 포함되지 않음
            </p>
            <FormulaBox>TCI = 2(4Cd + Ca + 2P + W + 2S)</FormulaBox>
            <VariableList>
              <VariableItem><strong>Cd:</strong></VariableItem><VariableItem>낮 열쾌적성 (기온, 습도)</VariableItem>
              <VariableItem><strong>Ca:</strong></VariableItem><VariableItem>일일 열 쾌적성 (기온, 습도)</VariableItem>
              <VariableItem><strong>P:</strong></VariableItem><VariableItem>강수량</VariableItem>
              <VariableItem><strong>W:</strong></VariableItem><VariableItem>일조량</VariableItem>
              <VariableItem><strong>S:</strong></VariableItem><VariableItem>풍속</VariableItem>
            </VariableList>
          </FormulaContainer>

          <ProcessFlow>
            <span className="step">수질 데이터</span>
            <span className="arrow">▼</span>
            <span className="step">포함</span>
          </ProcessFlow>

          <FormulaContainer>
            <p style={{ fontSize: '1.2rem', color: '#1976d2', marginBottom: '20px', textAlign: 'center' }}>
              새로운 <strong>“관광환경지수 (TEI, Tourism Environmental Index)”</strong> 개발
            </p>
            <FormulaBox>TEI = TCI + 2R</FormulaBox>
            <VariableList>
              <VariableItem><strong>R:</strong></VariableItem><VariableItem>수질지수</VariableItem>
            </VariableList>
          </FormulaContainer>

          <h3 style={{ fontSize: '1.6rem', color: '#0d47a1', marginBottom: '20px', textAlign: 'center', marginTop: '40px' }}>
            수질 지수(R) 산출 과정 및 산출식
          </h3>
          <ProcessFlow>
            <span className="step">데이터 수집 및 전처리</span>
            <span className="arrow">→</span>
            <span className="step">Light GBM 모델링</span>
            <span className="arrow">→</span>
            <span className="step">수질 지수 예측</span>
          </ProcessFlow>

          <FormulaContainer>
            <FormulaBox>R = wT * XT + wA * XA + wD * (1-XD)</FormulaBox>
            <VariableList>
              <VariableItem><strong>wT:</strong></VariableItem><VariableItem>탁도 가중치</VariableItem>
              <VariableItem><strong>XT:</strong></VariableItem><VariableItem>탁도 예측 값</VariableItem>
              <VariableItem><strong>wA:</strong></VariableItem><VariableItem>조류(Chl-a) 가중치</VariableItem>
              <VariableItem><strong>XA:</strong></VariableItem><VariableItem>조류(Chl-a) 예측 값</VariableItem>
              <VariableItem><strong>wD:</strong></VariableItem><VariableItem>용존산소(DO) 가중치</VariableItem>
              <VariableItem><strong>XD:</strong></VariableItem><VariableItem>용존산소(DO) 예측 값</VariableItem>
            </VariableList>
          </FormulaContainer>

          <ReferenceSection>
            <h3>참고 문헌</h3>
            <ReferenceItem>
              Sasikala, D., et al., (2022). "Water Quality Prediction and Classificationbased on Linear Discriminant Analysis andLight Gradient Boosting Machine ClassifierApproach" Journal of Innovative Image Processing, 4(3), p147-156.
            </ReferenceItem>
            <ReferenceItem>
              Alnageb, R., et al., (2022). "Machine Learning-based Water Potability Prediction" IEEE/ACS 19th International Conference on Computer Systems and Applications, p1-6
            </ReferenceItem>
            <ReferenceItem>
              Randika K., et al., (2024). "Advancing water quality assessment and prediction using machine learning models, coupled with explainable artificial intelligence (XAI) techniques like shapley additive explanations (SHAP) for interpreting the black-box nature" Results in Engineering, 23, 102831
            </ReferenceItem>
          </ReferenceSection>

        </SectionWrapper>

        <SectionWrapper>
          <SectionHeader>MIRI-C의 목표</SectionHeader>
          <ContentBlock>
            <p>
              MIRI-C는 단순히 정보를 제공하는 것을 넘어, 춘천시 관광 산업의 지속적인 성장을
              지원하고 환경 보호에 기여하는 것을 목표로 합니다.
            </p>
            <HighlightText>
              이를 통해 <strong>관광객 유치 증대</strong>를 목표로 두며, 춘천시를 더욱 매력적이고
              안전한 관광 도시로 발전시키는 데 이바지하고자 합니다.
            </HighlightText>
            <p>
              MIRI-C는 또한 다음 세 가지 주요 목표를 달성하기 위해 노력합니다:
            </p>
            <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '20px' }}>
              <li style={{ marginBottom: '10px', fontSize: '1.1rem', color: '#333' }}>
                <strong style={{ color: '#007bff' }}>1. 정확도 및 신뢰도 확보:</strong> 석사천, 퇴계천 등 지류 수질 데이터 확보를 통해
                관광환경지수의 정확도와 신뢰도를 높입니다.
              </li>
              <li style={{ marginBottom: '10px', fontSize: '1.1rem', color: '#333' }}>
                <strong style={{ color: '#007bff' }}>2. 의사결정 지원:</strong> 행사/축제 기획 및 춘천시의 주요 의사결정을 위한
                정확한 환경 데이터를 제공하여 효율적인 정책 수립을 돕습니다.
              </li>
              <li style={{ marginBottom: '10px', fontSize: '1.1rem', color: '#333' }}>
                <strong style={{ color: '#007bff' }}>3. 관광객 만족 향상:</strong> 투명하고 신뢰할 수 있는 환경 정보를 제공하여
                관광객들이 안심하고 춘천을 방문할 수 있도록 하여 만족도를 높입니다.
              </li>
            </ul>
            <p style={{ marginTop: '20px' }}>
              궁극적으로 춘천시가 <strong>친환경 스마트 관광 도시</strong>로서의 위상을 확립하고,
              지속 가능한 발전을 이루는 데 MIRI-C가 핵심적인 역할을 할 것입니다.
            </p>
          </ContentBlock>
        </SectionWrapper>

      </ContentWrapper>
    </PageContainer>
  );
};

export default MiriCPage;
