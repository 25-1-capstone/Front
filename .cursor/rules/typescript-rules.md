# TypeScript 코드 스타일 가이드

## 타입 정의

- 인터페이스 이름: `I` 접두사 사용 (예: `IUser`)
- 타입 이름: PascalCase (예: `UserType`)
- 제네릭 타입 파라미터: PascalCase, 의미있는 이름 사용 (예: `TData`, `TResponse`)

## 타입 선언

```typescript
// 컴포넌트 props
interface IComponentProps {
  title: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

// 상태 타입
interface IUserState {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

// API 응답 타입
interface IApiResponse<TData> {
  data: TData;
  status: number;
  message: string;
}
```

## 타입 추론

- 명확한 경우 타입 추론 활용
- 복잡한 타입이나 라이브러리 타입의 경우 명시적 타입 선언

## 컴포넌트 타입 정의

```typescript
import { FC } from "react";

interface IButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button: FC<IButtonProps> = ({ label, onPress, disabled }) => {
  // 컴포넌트 구현
};
```

## 함수 타입 정의

```typescript
// 함수 타입 정의
type HandlePress = (id: string) => void;
type FetchData = <T>() => Promise<T>;

// 함수 구현
const handlePress: HandlePress = (id) => {
  // 구현
};
```

## 상수 및 열거형

```typescript
// 열거형 정의
enum StudyStatus {
  IDLE = "IDLE",
  STUDYING = "STUDYING",
  PAUSED = "PAUSED",
}

// 상수 타입
const TIMER_DURATION: number = 25 * 60; // 25분
```

## 타입 가드

```typescript
// 타입 가드 함수
function isError(value: unknown): value is Error {
  return value instanceof Error;
}
```

## 비동기 처리

```typescript
// 비동기 함수 타입
async function fetchUser(): Promise<IUser> {
  // 구현
}
```

## 스타일 타입

```typescript
import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface IStyles {
  container: ViewStyle;
  title: TextStyle;
}

const styles = StyleSheet.create<IStyles>({
  // 스타일 정의
});
```
