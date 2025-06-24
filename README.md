### Maker 마스터클래스

0. Remix(React Router 7)

1. BASICS : 프로젝트 생성 및 구조 설정

   - 1.0 프로젝트 생성 방법 ( npx create-react-router@7.0.1 wemake )
   - 1.1 라우터 프레임워크 파일 생성 및 URL 경로 설정 (routes.ts 파일을 생성하고 파일 경로를 설정하는 방법)
   - 1.2 라우터 프레임워크 루트 파일 동작 및 흐름 (root.tsx 파일을 생성하고 파일 경로를 설정하는 방법)
   - 1.3 layout.tsx 설정 및 설명
   - 1.4 react-router.config.ts 설정 및 설명(프레임워크를 설정)
     - Vite.config.ts : 코드를 가져다가 다른 걸로 변환.
     - 프론트엔드 코드를 가져다가 일반 JavaScript, CSS 코드로 변환. 서버 코드 백엔드에서 실행할 수 있는 function으로 변환.
   - 1.5 shadcn component 설정 및 설명(별도의 설치가 필요하지 않고, 어플리케이션에 복사해서 사용할 수 있음.)
   - 1.6 파일 구조 및 위치 설정(기능 기반 구조)

2. USING CURSORAI : CursorAI 사용 방법

   - 2.0 Introduction
   - 2.1 cursorrules 파일 생성(.cursorrules) 및 AI 지시 사항 입력.
   - 2.2 Cursor Tab (자동 완성 기능)
   - 2.3 AI 자동완성 기능 및 요금(Ctrl + k, Ctrl + l)
   - 2.4 Chat Tab (채팅 기능)
     - Cursor Settings > Features > Docs > Add new doc
     - @ 기호를 사용해서 공식 문서를 참조하거나 웹에서 검색 가능.
   - 2.5 Composer Tab(코드 작성 기능)
     - 파일이나 폴더를 생성할 수 있고, 파일 이름을 변경하고나 파일을 삭제하는 등 작업을 대신 수행해 줌.
     - 작업내용을 정확하고 상세하게 작성해야 함.
   - Cursor 기본기능 세가지
     - 1. Tab : 코드 작성시 자동완성 기능
     - 2. Ctrl + k : 코드 작성하다 에디터 상에서 자연어로 명령을 내리는 기능, 코드를 작성하거나 수정 해줌
     - 3. Chat : 에디터 내 대화형 AI 챗봇, 코드를 작성/수정해주는 것을 넘어서서 코드나, 개발 전반에 대한 질의 응답이 가능
   - 핵심 부가 기능 Context
     - 1. Ctrl + k 나 Chat 상황에서 파일, 폴더, 공식 문서, 코드의 일부, Notepad 등을 맥락으로 제공하여 내가 기대한 방향의 응답을 제대로 받을 수 있도록 함.
   - 컨텍스트 참조(@)
     - @Codebase : 전체 코드베이스 검색
     - @Files : 특정 파일 참조
     - @Folders : 폴더 전체 참조
     - @Web : 웹 검색
     - @Docs : 문서 참조
     - @Git : Git 관련 정보 참조

3. UI with Cursor & Shadcn

   - 3.0 디자인 패턴 설정 및 설명
   - 3.1 ~ 3.3 Navigation 메뉴 생성 및 설명
   - 3.5 Navigation : Join, Login 기능 설정 및 설명
   - 3.6 ~ 3.9 Typography 설정 및 설명(홈, 제목, 부제목 등), 일관성 있게 보이게 설정
   - 3.10 routes.ts 파일 설정 및 설명
   - 3.11 cursor composer 페이지에 생성했었던 loder의 역할에 대한 설명
   - 3.12 ~ 3.13 .react-router 설명: 폴더 구조를 복사해서, 정의된 페이지들의 type을 생성
   - 3.14 페이지 변수 설정 및 설명
   - 3.15 에러 처리 및 검증 관련 설명 (Route.ErrorBoundaryProps : 4:00)
   - 3.16 ~ 3.17 페이지 페이지네이션 컴포넌트 생성 및 설명 (페이징 설정할때 ui에 있는 pagination.tsx 에 있는 a 태그를 Link로 변경)
   - 3.18 페이지 페이지네이션 컴포넌트, 날짜 설정 및 설명
   - 3.19 meta 태그 설정 및 설명
   - 3.20 검색 페이지 생성 및 설명
   - 3.21 카테고리 페이지 파라미터 파싱 및 설명
   - 3.22 InputPair, SelectPair : Form 재사용성 설정 및 설명
   - 3.23 폼 데이터 전송 및 설명
   - 3.24 Calendar 컴포넌트 설명
   - 3.25 상세 페이지 설정 및 설명
   - 3.26 ~ 3.27 layout Route 와 NavLink 설정 및 설명 (다른 페이지들이 렌더링될 layout 파일 설정)
   - 3.28 reviews 페이지 Dialog 로 설정 및 설명
   - 3.29 IdeasGPT 설정 및 설명
   - 3.30 Jobs 페이지 설정 및 설명(사용자가 선택한 필터가 어떤 건지 선택)
   - 3.31 ~ 3.32 Jobs, Submit Job 페이지 설정 및 설명
   - 3.33 회원가입, 로그인, OTP(일회성 비밀번호) 로그인 페이지 설정 및 설명
   - 3.34 소셜 로그인 페이지 설정 및 설명
   - 3.35 ~ 3.36 커뮤니티 페이지 설정 및 설명
   - 3.37 커뮤니티 댓글, 답글, 대댓글(reply) 페이지 설정 및 설명
   - 3.38 ~ 3.39 팀 페이지 설정 및 설명
   - 3.40 profile 페이지 설정 및 설명(사용자 쿠키를 읽고, 세션을 추출 후, "/users/:username" 경로로 리다이렉트)
   - 3.41 알람 페이지 설정 및 설명
   - 3.42 프로파일 페이지 설정 및 설명
   - 3.43 ~ 3.44 메시지 페이지 설정 및 설명
   - 3.45 데쉬보드 레이아웃 페이지 설정 및 설명
   - 3.46 ~ 3.47 Charts 설정 및 설명
   - 3.48 반응형 레이아웃 설정 및 설명

4. Supabase & Drizzle Database

   - 4.0 Supabase 프로젝트 생성 및 설정
   - 4.1 Drizzle 설정 및 설명
   - 4.2 jobs 테이블 생성 및 설명 (테이블 생성 후 : npm run db:generate, Supabase 연결 : npm run db:migrate)
   - 4.3 User 테이블을 확용하여 profiles 테이블 생성 및 설명

5. Data Loading Strategies(가제 데이터 실행 : --legacy-peer-deps)

   - 5.1 Drizzle 데이터 로딩 전략 설명
   - 5.2 Supabase 설정 및 데이터 로딩 전략 설명(supa-client.ts 파일 생성 및 설명)
     - npm install supabase --save -dev --legacy-peer-deps
     - npm supabase login
     - npm run db:typegen
   - 5.3 데이터 로딩 전략 설명
   - 5.4 테이블 연결 키 설정 및 설명(database view)
   - 5.5 type null 해결 방법(npm install type-fest)
     - type-fest 라이브러리: type을 덮어 쓰거나 수정하는데 사용할 수 있는 TypeScript type 모음
   - 5.6 비정규화된 카운터(post_upvote_trigger 카운터 설정)
   - 5.7 application 에서의 data loading 전략 설명
     - 사용자가 loading 상태에서 완료전까지는 데이터를 볼 수 없기 때문에 장단점이 있음
   - 5.8 데이터 로딩 단점 보완 방법
   - 5.9 페이지 로딩 시간 줄이기
     - prefetch: intent(데이터를 로드하기 전에 미리 로드하는 것)
   - 5.10 브라우저에서 데이터를 fetch 하는 방법(clientLoader)

6. Public Pages

   - 6.0 static 데이터를 사용 중인 우리의 ui에 연결 (public 페이지만 설정)
   - 6.1 페이지 번호 설정
   - 6.2 community 필터링 전략 설명 (keyword, sorting, period, topic 검색 설정)
   - 6.14 챠트, RPC Function

7. Authentication

   - 7.1 Server Side vs Client Side Auth 차이 설명 (npm install @supabase/ssr @supabase/supabase-js)
   - 7.2 서버 사이드 클라이언트, 브라우저 클라이언트 만들기
   - 7.3 사용자 로그인 Form 사용 방법, action 사용 방법, 사용자가 제출한 값에 대한 응답
   - 7.4 로그인 설정
   - 7.5 이메일 가입 설정
   - 7.6 raw_user_meta_data 설정
   - 7.7 소셜(깃허브, 카카오) 로그인 설정
   - 7.8 소셜 로그인 새 유저가 생성될 때 일어나는 로그인 설정
   - 7.9 OTP 이메일 인증 로그인
   - 9.10 sms 인증 로그인(https://console.twilio.com/ : V1Z1QYY8UBQFFPAHMYAPWSV6) 잘 안됨

8. Private Pages

   - 8.0 로그인한 사용자만 볼 수 있는 페이지들 작업, Post 입력 기능 설정
   - 8.1 Job 입력 설정
   - 8.2 Team 입력 설정
   - 8.3 ~ 8.4 커뮤니티 게시물 답글, 댓글 입력 설정
   - 8.5 Idas 설정
   - 8.6 Product Reviews 입력 설정
   - 8.7 Dashboard 입력 설정
   - 8.8 Product Dashboard 입력 설정
   - 8.9 edit profile 수정, 업로드 설정
   - 8.10 이미지 업로드 설정
   - 8.11 업로드 보안 설정
   - 8.12 products 제품 입력 설정

9. Fetchers

   - 9.1 fetcher.Form 설정 방법 (useFetcher())
   - 9.2 fetcher를 submit 하는 방법 (post-card.tsx 적용 확인)
   - 9.3 fetcher 구현 설정 (optimistic UI)
   - 9.4 notification triggers 설정
   - 9.5 ~ 9.6 notification 알림 설정

10. DMS

    - 10.1 Supabase 제공 Realtime 사용해서 만듬 (Postgres Changes) / 보안에 취약해서 잘 사용에 주의를 요함
    - 10.2 메세지 룸 생성
    - 10.3 ~ 10.4 메시지 생성
    - 10.5 실시간 메세지 (browserClient 사용. 보안 취약)
    - 10.6 RLS 보안 설정
    - 10.7 Security Definer View 보안 설정
    - 10.8 Function Search Path 보안 설정

11. GPT & CRON JOBS

    - 11.0 GPT 모델과 대화하는 방법, Supabase 프로젝트에서 크론 잡(cron job: 예약된 작업)을 활성화하는 방법
    - 11.1 npm install openai, ,GPT 모델과 대화 설정
    - 11.2 cron job 설정

12. TRANSACTIONAL EMAILS

    - react-email-starter 폴더이동 > npm run dev > http://localhost:3000/ 접속
    - 12.0 트랜잭셔널 이메일(백엔드에서 어떤 이벤트가 발생하고 그걸 사용자에게 알림) 보내는 방법 (https://ap.www.namecheap.com/, https://resend.com/, https://www.cloudflare.com/ko-kr/)
    - 12.1 도메인 만들기
    - 12.2 도메인 생성 후 dns 연결
    - 12.3 이메일 전송 테스트
    - 12.4 이메일 템플릿 만들기(https://react.email/) - npm i create-email --legacy-peer-deps > react-email-starter 폴더이동 > npm i
      npm i @react-email/components --legacy-peer-deps

13. TOSS PAYMENTS

    - 13.0 토스로 돈을 보내는 방법, 결제 검증 방법
    - 13.1 결제 방법 렌더링 / (Toss Payments SDK : npm i @tosspayments/tosspayments-sdk --legacy-peer-deps)
    - 13.2 결제 요청 후 결제 검증
    - 13.3 결제 후 처리 방법 (음... 뭔가 커스터밍 필요함...)

14. DEPLOYMENT

    - 14.0 Vercel 배포, 방화벽 활성화 및 보안, 에러 reporting 설정 방법
    - 14.1 Row Level Security(RLS) 보안 설명, Drizzle RLS(타입스크립트 자동 완성 기능, Supabase와 함께 RLS를 사용) 작성 방법
    - 14.2 vercel 설치 / npm i @vercel/react-router --legacy-peer-deps

## 추가 라이브러리

- luxon : 날짜 관련 라이브러리 (npm install --save luxon)
- zod : 데이터 유효성 검사 라이브러리 (npm i zod)

## 테이블

- jobs : 채용공고 테이블
- profiles : 유저 프로파일 테이블
- follows : 팔로워, 팔로잉 관리 테이블
- notifications : 알림 테이블
- messageRooms : 메시지 방 테이블
- messageRoomMembers : 메시지 방 멤버 테이블
- messages : 메시지 테이블
- products : 제품 테이블
- categories : 제품 카테고리 테이블
- products_upvotes : 제품에 대한 upvotes 테이블 (products 테이블과 profiles 테이블의 다대다 관계를 위한 연결 테이블)
- reviews : 제품 리뷰 테이블
- gptIdeas : GPT 아이디어 테이블
- gptIdeasLikes : GPT 아이디어 좋아요 테이블
- topics : 커뮤니티 토픽 테이블
- posts : 커뮤니티 게시글 테이블
- postUpvotes : 커뮤니티 대한 upvotes 테이블
- postReports : 커뮤니티 대한 댓글, 댓글 참조 테이블
- teams : 팀 테이블
- 4.9 User Profile Trigger : 데모 데이터 넣기

## supabase

- Seed the databasae, create at least 5 rows per table and use this id for every profile_id column everywhere 'b4d3ebf3-7177-454a-9827-85567d38a5eb'
- 데이터베이스를 seed하고, 각 테이블 마다 최소 5개의 행(row)을 생성하고, 모든 profile_id 컬럼에 대해 ID를 'b4d3ebf3-7177-454a-9827-85567d38a5eb' 사용

## Database Schema

- npm run db:generate
- npm run db:migrate
- npm run db:typegen

## cursorrules

- cursor는 열려있는 파일들로부터만 context를 받아와 자동완성을 제공.
- 이 컴포넌트를 /features/products/components/product-card.tsx로 추상화 해줘,
  card.tsx 파일을 추상화하고, content를 위해 props을 사용해줘.
- 파일의 경로에 있는 모든 파일을 생성해줘.
- 파일의 경로에 있는 모든 파일을 확인 후 없는건 생성해 주고, 없는 파일은 삭제해줘.
- 경로 파일만 작성하고 이미 존재하는 파일은 수정하지 마십시오. 새로운 파일만 생성하십시오.
- 어떠한 loader나 action function도 미리 채우지 말고, 나중에 채워넣을 수 있도록 해줘.
- 해당 경로에 tsx 파일만 만들어주고, 어떠한 loader나 action function도 미리 채우지 말고, 나중에 채워넣을 수 있도록 해줘.
- 파일의 경로에 있는 모든 파일을 확인 후 없는건 생성해 주고, 해당 경로에 tsx 파일만 만들어주고, 어떠한 loader나 action function도 미리 채우지 말고, 나중에 채워넣을 수 있도록 해줘.

- migration 파일을 사용하여 데이터베이스 내 모든 테이블을 삽입할 Seed 파일을 생성하는 데 필요한 컨텍스트를 수집하세요. 날짜에는 NOW() 생성해주세요. 'profile_id'컬럼에는 'b4d3ebf3-7177-454a-9827-85567d38a5eb'을 사용하고, 복합 기본 키, 유니크 제약조건 및 기타 관련 제약조건을 준수하세요.단, profiles 테이블은 제외합니다. 가능하면 각 테이블에 최소 5개의 행을 생성하고, 복합 기본 키를 가진 브릿지 테이블에는 1개의 행을 생성하세요.

## 유저 로그인 절차

- Browser
  Client Cookies -------------> Supabase Server ----------> Who is the user?
- Server
  Browser Send Cookies -----> loader() receives cookies -----> Supabase SSC (cookies) -----> Supabase Server -----> Who is the user?

## 오류 해결

- 라이브러리 버전을 호환되는 버전으로 맞추거나, --save --legacy-peer-deps 뒤에 입력하기: 기존버전 무시하고 설치한다는 뜻 (npm install --save --legacy-peer-deps)

- view생성 후 return 값이 nullable인 object일 경우 supa-client.ts 에서 SetNonNullable 추가

## 추가할 기능 정리

- 반려동물 관리 or 반려동물 목록 > 전체 현항 [상세정보, 수정, 삭제]
- 반려동물 관리 or 반려동물 목록 > 건강 관리 [상세정보, 수정, 삭제]

# 구조도

## pets-page.tsx 반려동물 목록 구조도

```ts
app/features/pets/
├── components/                    # 🎴 반려동물 카드 컴포넌트
│   ├── pet-overview-card.tsx      # 🐕 전체 현황용 카드 (이름, 나이, 품종, 건강상태)
│   ├── family-pet-card.tsx        # 👨‍👩‍👧‍👦 가족 구성도용 카드 (관계도, 혈통 정보)
│   ├── health-summary-card.tsx    # 🏥 건강 관리용 카드 (예방접종, 건강검진, 투약)
│   ├── birth-record-card.tsx      # 👶 출산 기록 카드 (새끼 정보, 출산일)
│   └── stats-summary.tsx          # 📊 통계 요약 컴포넌트 (총 반려동물 수, 평균 나이)
├── pages/
│   └── pets-page.tsx              # 🎯 메인 반려동물 목록 페이지
├── types/
│   └── pet.ts                     # 🏷️ 반려동물 타입 정의
└── schema.ts                      # 📊 데이터베이스 스키마

# 📱 Page Layout Structure
pets-page.tsx
├── 🌈 Header Section              # 그라데이션 배경, 타이틀, 설명
├── 📊 Stats Summary               # 전체 통계 (총 반려동물, 건강상태 분포)
├── 🎛️ Action Bar                  # 새 반려동물 등록, 필터, 정렬 옵션
├── 📋 Pet Grid Layout             # 반응형 그리드 (1-4열)
│   ├── PetOverviewCard            # 각 반려동물 개요 카드
│   ├── FamilyPetCard              # 가족 관계 카드 (부모-자식)
│   ├── HealthSummaryCard          # 건강 요약 카드
│   └── BirthRecordCard            # 출산 기록 카드 (해당시)
└── 🔗 Quick Actions              # 빠른 액세스 (건강기록, 예약, 병원정보)

# 🌐 Navigation Flow
- 📝 등록: → /pets/register
- 👁️ 상세: → /pets/:petId
- 🏥 건강: → /pets/health-records/:petId
- 👶 출산: → /pets/birth-records/:petId
- 🏥 병원: → /pets/hospitals
```

## register-pet-page.tsx 반려동물 등록 / 수정,삭제 구조도

```ts
app/features/pets/
├── forms/                         # 📋 등록/수정 폼 컴포넌트
│   ├── pet-basic-info-form.tsx    # 💖 기본 정보 폼 (프로필 사진, 이름, 종류, 품종, 생년월일, 성별, 중성화)
│   ├── pet-detail-info-form.tsx   # 🏥 신체/신원 정보 폼 (체중, 신장, 혈액형, 칩번호, 등록정보)
│   ├── pet-relations-form.tsx     # 👥 관계/기타 정보 폼 (가족관계, 성격, 사회성, 활동량, 특이사항)
│   └── puppy-management-form.tsx  # 🐶 새끼 관리 폼 (출산 기록용)
├── pages/
│   └── register-pet-page.tsx      # 🎯 메인 등록/수정 페이지 (641줄 → 200줄 최적화)
├── types/
│   └── pet.ts                     # 🏷️ 반려동물 타입 정의
└── schema.ts                      # 📊 데이터베이스 스키마

# 📋 Form Structure (3단계 탭)
register-pet-page.tsx
├── 🎨 Header Section              # 뒤로가기, 타이틀, 설명
├── 🎯 Sticky Tab Navigation       # 기본정보 → 신체/신원 → 관계/기타
│   ├── Tab 1: PetBasicInfoForm    # 필수 정보 + 프로필 사진
│   ├── Tab 2: PetDetailInfoForm   # 아코디언 구조 (Physical + Identity)
│   └── Tab 3: PetRelationsForm    # 아코디언 구조 (Adoption + Additional)
└── 🎛️ Footer Actions             # 삭제(수정시), 취소, 저장 버튼

# 🌐 URL Structure
- 등록: /pets/register
- 수정: /pets/register?petId=123
- 처리: POST → intent (create|update|delete)
```

## birth-records-page.tsx 출산기록 / 수정,삭제 구조도

```ts
app/features/pets/
├── components/                    # 🎴 출산기록 관련 컴포넌트
│   ├── birth-record-header.tsx    # 📝 헤더 컴포넌트 (제목, 설명, 생성 버튼)
│   ├── birth-record-list.tsx     # 📋 출산기록 리스트 (카드형태, 수정/상세 버튼)
│   ├── birth-record-tabs.tsx     # 🎛️ 탭 네비게이션 (기본정보, 산후관리)
│   ├── basic-info-tab.tsx        # 💖 기본정보 탭 (모견정보, 교배정보, 출산정보, 의료정보)
│   ├── post-care-tab.tsx         # 🏥 산후관리 탭 (모니터링, 수유, 투약, 후속관리)
│   └── birth-record-card.tsx     # 🎴 기존 카드 컴포넌트 (변경하지 않음)
├── hooks/                         # 🎣 커스텀 훅
│   └── use-birth-record-form.ts   # 📊 폼 상태 관리 훅 (17개 상태 + 액션 함수)
├── pages/
│   └── birth-records-page.tsx    # 🎯 메인 출산기록 페이지 (1573줄 → 200줄, 87% 최적화)
├── constants.ts                   # 🏷️ 상수 정의 (탭설정, 옵션들, 테스트 데이터)
├── types/
│   └── pet.ts                     # 🏷️ 반려동물 타입 정의
└── schema.ts                      # 📊 데이터베이스 스키마

# 📱 Page Layout Structure (최적화 후)
birth-records-page.tsx
├── 🌈 BirthRecordHeader           # 동적 제목/설명, 새 기록 생성 버튼
├── 📋 BirthRecordList             # 테스트 데이터 기반 카드 리스트
├── 🎛️ BirthRecordTabs            # 동적 탭 생성 (입양시 care탭 숨김)
│   ├── BasicInfoTab              # 복잡한 폼 로직 (17개 props)
│   │   ├── 📝 모견 정보           # 선택된 반려동물 정보
│   │   ├── 💕 교배 정보           # 교배 방식, 상대 정보
│   │   ├── 👶 출산 정보           # 출산일, 장소, 새끼 수
│   │   └── 🏥 의료 정보           # 아코디언: 병원, 의료진, 비용
│   └── PostCareTab               # 산후 관리 섹션들
│       ├── 📊 모니터링 일정        # 체중, 체온, 활동량 추적
│       ├── 🍼 수유 관리           # 수유 계획, 이유식 단계
│       ├── 💊 투약 정보           # 예방접종, 영양제, 치료약
│       └── 📅 후속 관리           # 검진 일정, 중성화 계획
└── 🎛️ Action Buttons            # 임시저장, 저장, 취소

# 🎯 최적화 성과
- 📊 코드 줄 수: 1573줄 → 200줄 (87% 감소)
- 🧩 컴포넌트 분리: 6개 컴포넌트로 모듈화
- 🎣 상태 관리: 커스텀 훅으로 17개 상태 분리
- 🏷️ 상수 분리: 별도 파일로 관리
- 🔄 재사용성: Props 기반 설계
- 📝 단일 책임: 각 컴포넌트별 명확한 역할

# 🌐 Props Structure
BirthRecordHeader:    view, selectedRecord, birthType, onCreateNew
BirthRecordList:      onEdit
BirthRecordTabs:      birthType
BasicInfoTab:         17개 props (상태값 + 핸들러)
PostCareTab:          -
use-birth-record-form: 17개 상태 + 액션 함수 반환

# 🔧 Technical Details
- ✅ 테스트 데이터 유지 (SAMPLE_BIRTH_RECORDS)
- ✅ birth-record-card.tsx 보존
- ✅ loader/action 함수 생성하지 않음
- ✅ TypeScript 타입 안정성
- ✅ 함수형 프로그래밍 패턴 적용
```
