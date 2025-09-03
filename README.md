# 춘천시 의암호 수질 모니터링 대시보드

춘천시 의암호의 실시간 수질 상태를 모니터링하는 React 기반 웹 애플리케이션입니다.

## 🚀 주요 기능

### 📊 실시간 수질 모니터링
- **탁도 (NTU)**: 물의 투명도를 나타내는 지표
- **조류 (cells/mL)**: 조류의 농도를 나타내는 지표  
- **용존산소량 (mg/L)**: 물에 녹아있는 산소의 양

### 🎯 수질 등급 시스템
1. **안전 (1단계)** - 수질이 양호함, 안전한 상태
2. **주의 (2단계)** - 약간의 주의가 필요함
3. **경고 (3단계)** - 수질 악화 우려, 모니터링 필요
4. **위험 (4단계)** - 조류 발생 가능, 피부자극, 냄새 우려
5. **심각 (5단계)** - 심각한 수질 오염, 즉시 조치 필요

### 📈 데이터 시각화
- 실시간 수질 지수 표시
- 과거 데이터 추이 차트
- 각 파라미터별 상세 정보
- 진행률 바를 통한 직관적 표시

### 🎨 사용자 인터페이스
- 반응형 디자인
- 직관적인 색상 코딩
- 실시간 업데이트
- 모던한 UI/UX

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript
- **Styling**: Styled Components
- **Charts**: Recharts
- **Font**: Noto Sans KR

## 📦 설치 및 실행

### 필수 요구사항
- Node.js 16.0 이상
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

### 빌드
```bash
# 프로덕션 빌드
npm run build
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── WaterQualityDashboard.tsx    # 메인 대시보드
│   ├── WaterQualityIndex.tsx        # 수질 지수 표시
│   ├── WaterQualityParameters.tsx   # 수질 파라미터 표시
│   └── HistoricalChart.tsx          # 과거 데이터 차트
├── types/
│   └── waterQuality.ts              # 타입 정의
├── utils/
│   └── waterQualityUtils.ts         # 유틸리티 함수
├── data/
│   └── mockData.ts                  # 임시 데이터
└── App.tsx                          # 메인 앱 컴포넌트
```

## 🔧 주요 컴포넌트

### WaterQualityDashboard
- 전체 대시보드 레이아웃 관리
- 탭 네비게이션 (오늘/내일/과거)
- 실시간 데이터 업데이트

### WaterQualityIndex
- 현재 수질 등급 표시
- 5단계 수질 지수 시각화
- 경고 메시지 표시

### WaterQualityParameters
- 탁도, 조류, 용존산소량 상세 정보
- 각 파라미터별 진행률 바
- 실시간 수치 표시

### HistoricalChart
- 과거 수질 데이터 차트
- 일별 수질 변화 추이
- 인터랙티브 툴팁

## 📊 데이터 기준

### 탁도 (NTU)
- 1단계 (안전): ≤ 5
- 2단계 (주의): ≤ 10
- 3단계 (경고): ≤ 20
- 4단계 (위험): ≤ 50
- 5단계 (심각): > 50

### 조류 (cells/mL)
- 1단계 (안전): ≤ 1,000
- 2단계 (주의): ≤ 5,000
- 3단계 (경고): ≤ 10,000
- 4단계 (위험): ≤ 50,000
- 5단계 (심각): > 50,000

### 용존산소량 (mg/L)
- 1단계 (안전): ≥ 8
- 2단계 (주의): ≥ 6
- 3단계 (경고): ≥ 4
- 4단계 (위험): ≥ 2
- 5단계 (심각): < 2

## 🎨 디자인 특징

- **그라데이션 배경**: 시각적 매력도 향상
- **글래스모피즘**: 모던한 UI 효과
- **반응형 레이아웃**: 모든 디바이스 지원
- **색상 코딩**: 직관적인 수질 등급 표시
- **애니메이션**: 부드러운 전환 효과

## 🔮 향후 개선 사항

- [ ] 실제 API 연동
- [ ] 실시간 알림 기능
- [ ] 모바일 앱 개발
- [ ] 데이터 내보내기 기능
- [ ] 사용자 인증 시스템
- [ ] 관리자 대시보드

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**춘천시 의암호 수질 모니터링 시스템** - 시민의 안전한 물 환경을 위한 실시간 모니터링
