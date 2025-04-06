# Expo 프로젝트 구조 가이드

## 디렉토리 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
│   ├── common/    # 공통 컴포넌트
│   └── screens/   # 화면별 컴포넌트
├── navigation/     # 네비게이션 설정
├── screens/        # 화면 컴포넌트
├── services/       # API 서비스
├── hooks/          # 커스텀 훅
├── utils/          # 유틸리티 함수
├── constants/      # 상수 정의
├── assets/         # 이미지, 폰트 등
└── styles/         # 공통 스타일
```

## 파일 네이밍

- 컴포넌트: `ComponentName.jsx`
- 스타일: `ComponentName.styles.js`
- 타입: `ComponentName.types.ts`
- 유틸리티: `utilityName.js`
- 테스트: `ComponentName.test.js`

## 임포트 순서

1. React/React Native 임포트
2. 서드파티 라이브러리
3. 로컬 컴포넌트
4. 로컬 유틸리티/상수
5. 스타일/타입

## 환경 설정

- `.env` 파일 사용
- 환경별 설정 분리 (dev/prod)
- 민감한 정보는 환경변수로 관리

## 에셋 관리

- 이미지는 PNG/SVG 선호
- 폰트는 `assets/fonts/`
- 아이콘은 라이브러리 사용
