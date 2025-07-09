# 회원 + 게시판

## 🛠️ 사용기술

- **Frontend**: React v18
- **State Management**: Redux Toolkit, TanStack Query (react-query)
- **Styling**: TailwindCSS, MUI (Material UI)
- **Form & Validation**: React Hook Form, Zod
- **Backend**: json-server, json-server-auth
- **Package Manager**: pnpm

## 🔍 폴더구조

```
├── db.json # json-server 기반의 mock DB
├── Routes/ # react-router 기반 라우팅 설정
├── actions/ # fetch 기반 API 요청 로직 및 공통 에러 처리 (withErrorHandler)
├── components/ # 프로젝트 전역에서 재사용되는 UI 컴포넌트
├── hooks/ # 재사용 가능한 Custom Hook 정의
├── pages/ # 각 페이지 단위 컴포넌트 (index.tsx 중심 구조)
│ └── [components/hooks]/ # 각 페이지에 필요한 컴포넌트 및 hook 로컬 구성
├── Provider/ # 앱 최상단 Wrapper (QueryClientProvider, ReduxProvider, Theme, Toast 등 포함)
│ └── redux/ # Redux slice 및 store 설정
├── schema/ # 서버 응답 데이터의 zod 기반 스키마 검증
├── types/ # 전역 TypeScript 타입 정의
└── utils/ # 공통 유틸리티 함수 (예: withErrorHandler)
```

## 프로젝트 설치

### 1. 패키지 설치

```
pnpm install
```

### 2. 개발환경 실행

```
pnpm dev
```

### 3. json-server 실행

```
pnpm run server
```

## 📐 컴포넌트 설계 구조

- MUI의 Compound Pattern을 활용하여 기능별 컴포넌트를 조합해 구현
- 각 기능의 비즈니스 로직은 재사용성과 테스트 용이성을 위해 Custom Hook으로 분리
- 공통 API 에러 처리는 HOC(`withErrorHandler`)로 처리해 중복된 `try~catch` 로직을 제거

## 🌍 전역 상태 관리

- **Redux Toolkit** 으로 인증 상태, 댓글, 전역 알림(Toast) 관리
- **TanStack Query (react-query)** 로 서버 상태 관리

## ✅ 주요 기능 및 요구 사항

### 1. 게시글 목록 페이지 (NoticeBoardPage)

- **UI 구성**

  - 반응형 레이아웃을 위해 MUI의 `Grid`, `Card` 컴포넌트를 활용
  - `createTheme`을 통해 Desktop(≥1280px) / Mobile(<1280px) 기준으로 화면 구분
  - 데스크탑: 4개, 모바일: 1개 단위로 카드 배치

- **무한 스크롤 및 페이징**

  - `useInfiniteQuery`(tantstackquery) + `useInView`(Intersection Observer)훅 활용하여 무한 스크롤 구현
  - 페이지당 12개 항목 로드
  - `useSearchPostsQuery` 훅으로 posts 페이징 처리 및 API 호출

- **검색 기능**

  - dummyjson `posts/search?q=[terms]` API 사용
  - `SearchPostField`에서 입력 시 `query string` 업데이트
  - `useDebounce`로 불필요한 API 호출 방지
  - 검색 시 `useSearchPostsQuery` 훅으로 별도 API 호출 및 페이징 처리

- **스크롤 위치 복원**
  - 상세 페이지 진입 전의 스크롤 위치를 `sessionStorage`에 저장(`useYScrollRestore` 훅)
  - 뒤로가기를 통해 돌아올 때만 해당 위치 복원
  - 새로고침, 직접 URL 접근 등은 예외 처리

### 2. 게시글 상세 페이지 (NoticeBoardDetailPage)

- 게시글 내용과 댓글을 각각 `usePost`, `usePostsComments` 훅으로 호출
- 댓글 상태는 `tanstackquery`로 관리하지만, dummyjson의 DELETE/POST 요청 결과가 반영되지 않아 redux(commentSlice)에 별도 저장
- 댓글 생성/삭제 요청 성공 시 redux 상태를 갱신하여 UI 업데이트
- 서버 반영이 안 되므로 새로고침/재 진입 시 다시 원래 댓글이 나타나며 등록되지 않은 댓글 ID 삭제 시도시 에러

### 3. 공통 에러 처리 (actions/\*, prviders/tanstack/client.tsx)

- 모든 API 요청은 `actions`에서 처리하며, HOC(`withErrorHandler`)를 통해 반복되는 예외 처리 코드 제거
- `QueryClient`의 `queryCache.onError`를 통해 tanstackquery 요청 실패 시 전역 `toast`로 에러 메시지 노출 (`queryClient`)

### 4. 인증 기능 개발 (회원가입/로그인/로그아웃) (components/AuthModal)

- `useLogin`, `useRegister` 훅으로 로그인 및 회원가입 기능 구현
- 회원가입 시 Tab 컴포넌트로 admin, user, guest 중 Role 선택
- 로그인 성공 시, 사용자 정보(localStorage + redux)로 인증 상태 유지
- 로그아웃 시 localStorage 및 redux 초기화
- json-server-auth를 통해 역할 기반 인증 처리
- react-hook-form으로 폼 검증
- MUI TextField는 Controller로 연결하여 제어 컴포넌트 방식 적용

### 5. 게시글 목록 및 상세 개발

- `useCreatePost`, `useDeletePost` 훅으로 게시글 생성/삭제 기능 구성
- 로그인한 사용자가 관리자 또는 일반 사용자일 경우 목록 페이지에 작성 버튼 노출
- 작성 시 react-hook-form 으로 title, body 필수 검증
- 실제 API 요청은 dummyjson을 사용하지만, 서버에는 반영되지 않음
- 요청 성공 시 invalidateQueries로 posts 캐시 무효화 → 데이터 재요청
- 삭제 버튼은 관리자만 접근 가능
