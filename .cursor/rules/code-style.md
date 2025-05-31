# Expo 프로젝트 코드 스타일 가이드

## 기본 포맷팅 규칙

- 들여쓰기: 2칸 스페이스
- 최대 줄 길이: 100자
- 세미콜론 필수
- 문자열: 쌍따옴표 사용
- 후행 쉼표(trailing comma) 사용

## 네이밍 컨벤션

- 컴포넌트: PascalCase (예: `UserProfile`)
- 함수: camelCase (예: `handleSubmit`)
- 상수: UPPER_SNAKE_CASE (예: `API_BASE_URL`)
- 변수: camelCase (예: `userInfo`)
- 파일명: 컴포넌트는 PascalCase, 유틸리티는 camelCase

## 컴포넌트 구조

```jsx
import { StyleSheet } from 'react-native';

const ComponentName = ({ prop1, prop2 }) => {
  // 1. 상태(state) 선언
  // 2. 효과(effects) 선언
  // 3. 이벤트 핸들러
  // 4. 렌더링 로직

  return (
    // JSX
  );
};

const styles = StyleSheet.create({
  // 스타일 정의
});

export default ComponentName;
```

## 스타일 가이드

- 인라인 스타일 지양
- StyleSheet.create 사용
- 색상은 상수로 관리
- 반응형 디자인을 위해 하드코딩된 크기 지양
