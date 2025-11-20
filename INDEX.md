# 📚 LoL Skin Maker - 전체 문서 인덱스

## 🎯 당신이 찾는 것은?

### 🚀 빨리 시작하고 싶다면?
👉 **[QUICKSTART.md](QUICKSTART.md)** (5분)
- 1분 안에 설정 완료
- 기본 사용 방법
- 자주 나는 문제 해결

---

### 📖 전체를 이해하고 싶다면?
👉 **[README.md](README.md)** (15분)
- 프로젝트 개요
- 주요 기능
- API 엔드포인트
- 배포 가이드

---

### 🔧 자세한 설정이 필요하다면?
👉 **[SETUP.md](SETUP.md)** (20분)
- 단계별 설치 가이드
- 환경 변수 설정
- 나노바나 API 연동
- 트러블슈팅 상세 가이드

---

### 🏗️ 기술 아키텍처가 궁금하다면?
👉 **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** (30분)
- 시스템 아키텍처 다이어그램
- 각 파일의 상세 설명
- 요청 흐름 도표
- 코드 구조 분석

---

## 📁 프로젝트 파일 구조

```
lol-skin-maker/
│
├─ 📄 문서 파일
│  ├─ INDEX.md ⭐ (당신은 여기!)
│  ├─ QUICKSTART.md (5분 빠른시작)
│  ├─ README.md (전체 설명서)
│  ├─ SETUP.md (상세 가이드)
│  └─ PROJECT_SUMMARY.md (기술 분석)
│
├─ 🎯 핵심 코드
│  ├─ index.html (프론트엔드 UI)
│  ├─ server.js (백엔드 서버)
│  └─ image-processor.js (이미지 처리)
│
├─ ⚙️ 설정 파일
│  ├─ package.json (의존성)
│  ├─ .env (환경 변수)
│  └─ .gitignore
│
└─ 📦 자동 생성
   ├─ node_modules/ (패키지)
   └─ uploads/ (생성 스킨)
```

---

## ⏱️ 읽는 시간 가이드

| 문서 | 소요 시간 | 대상 |
|------|---------|------|
| QUICKSTART.md | 5분 | 빨리 시작하고 싶은 분 |
| README.md | 15분 | 전체 기능 알고 싶은 분 |
| SETUP.md | 20분 | 자세한 설정이 필요한 분 |
| PROJECT_SUMMARY.md | 30분 | 기술자, 개발자 |

---

## 🚀 빠른 실행 가이드

### 처음 사용자
```bash
1. npm install
2. npm run dev
3. http://localhost:3000 열기
```

### 경험자
```bash
1. git clone <repo>
2. npm install
3. .env 파일 설정 (선택사항)
4. npm start
```

---

## 📚 각 문서의 목적

### QUICKSTART.md
**목적**: 가장 빠르게 시작하기
**내용**:
- 설치 5단계
- 사용 방법 5단계
- 일반적인 문제 3가지

### README.md
**목적**: 전체 프로젝트 이해
**내용**:
- 기능 소개
- 기술 스택
- API 문서
- 배포 가이드

### SETUP.md
**목적**: 상세한 설정 및 트러블슈팅
**내용**:
- 패키지별 설명
- 환경 변수 상세 설정
- API 연동 방법
- 자주 나는 오류 해결

### PROJECT_SUMMARY.md
**목적**: 기술 구조 이해
**내용**:
- 시스템 아키텍처
- 파일별 상세 설명
- 요청 흐름 도표
- 성능 최적화

---

## 🎯 상황별 가이드

### 상황 1️⃣: "지금 당장 해보고 싶어!"
```
QUICKSTART.md 따라가기 (5분)
→ npm run dev
→ http://localhost:3000
```

### 상황 2️⃣: "어떻게 작동하는지 알고 싶어"
```
PROJECT_SUMMARY.md 읽기 (30분)
→ 아키텍처 이해
→ 코드 분석
```

### 상황 3️⃣: "나노바나 API를 연동하고 싶어"
```
SETUP.md의 "환경 변수 설정" 섹션
→ 나노바나 API 키 발급
→ .env 파일 설정
```

### 상황 4️⃣: "문제가 생겼어"
```
SETUP.md의 "트러블슈팅" 섹션
→ 자신의 문제 찾기
→ 해결 방법 실행
```

### 상황 5️⃣: "배포하고 싶어"
```
README.md의 "배포 가이드" 섹션
→ 배포 환경 선택 (Heroku, AWS, etc)
→ 가이드 따라 배포
```

---

## 🔑 핵심 개념 5가지

### 1. 💾 Frontend
**`index.html`**
- 사용자 인터페이스
- 챔피언 검색 기능
- 사진 업로드
- 실시간 미리보기 (Canvas)
- 다운로드 버튼

### 2. 🖧 Backend
**`server.js`**
- Express 웹 서버
- 파일 업로드 처리 (Multer)
- 이미지 처리 조율
- 에러 처리

### 3. 🎨 이미지 처리
**`image-processor.js`**
- 이미지 크기 조정
- LoL 스타일 필터
- 텍스트 & 테두리 추가

### 4. 🔄 API 연동
**나노바나 API (선택사항)**
- 고급 이미지 처리
- 더 나은 품질 결과
- API 키 필요

### 5. ⚙️ 설정 관리
**`.env` 파일**
- 환경 변수 저장
- API 키 보안 관리
- 포트 설정

---

## 📊 기술 스택 한눈에

```
┌─────────────────────────────────────┐
│     Frontend (브라우저)              │
│  HTML5 + CSS3 (Tailwind)           │
│  JavaScript (Vanilla)               │
│  Canvas API                         │
└──────────────┬──────────────────────┘
               │ HTTP
┌──────────────▼──────────────────────┐
│     Backend (Node.js)               │
│  Express.js                         │
│  Multer (파일 업로드)               │
│  Sharp (이미지)                     │
│  Axios (HTTP)                       │
└─────────────────────────────────────┘
```

---

## ✅ 체크리스트

### 설치 전
- [ ] Node.js 14+ 설치됨
- [ ] npm 또는 yarn 설치됨
- [ ] 인터넷 연결 확인

### 설치 후
- [ ] `npm install` 완료
- [ ] `.env` 파일 생성 (선택사항)
- [ ] `npm run dev` 성공
- [ ] `http://localhost:3000` 접속 가능

### 첫 테스트
- [ ] 챔피언 검색 작동
- [ ] 사진 업로드 가능
- [ ] 미리보기 표시됨
- [ ] 스킨 생성 완료
- [ ] 이미지 다운로드 가능

---

## 🆘 도움이 필요하신가요?

### 1. 빠른 시작 관련
→ [QUICKSTART.md](QUICKSTART.md) 섹션 "🚨 문제 해결"

### 2. 설치 관련
→ [SETUP.md](SETUP.md) 섹션 "🐛 자주 발생하는 문제"

### 3. 기능 관련
→ [README.md](README.md) 섹션 "🔌 API 엔드포인트"

### 4. 기술 관련
→ [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) 섹션 "🔄 요청 흐름"

---

## 🎓 학습 경로

### 초급 (이미지 생성만 해보기)
1. QUICKSTART.md 읽기
2. 스킨 몇 개 생성해보기
3. 다양한 챔피언 시도

### 중급 (코드 이해하기)
1. PROJECT_SUMMARY.md 읽기
2. index.html의 JavaScript 부분 분석
3. server.js 흐름 이해

### 고급 (커스터마이징)
1. image-processor.js 수정 (필터 변경)
2. 새로운 API 통합
3. 데이터베이스 추가

---

## 🎉 축하합니다!

이제 당신은:
- ✅ 풀스택 웹 애플리케이션 구조 이해
- ✅ Node.js/Express 백엔드 경험
- ✅ 파일 업로드 처리 이해
- ✅ 이미지 처리 기술 습득
- ✅ API 연동 경험

---

## 📞 피드백

더 나은 문서를 위해 피드백을 주시면 감사하겠습니다!

---

**이제 시작할 준비가 되셨나요?**

👉 **[QUICKSTART.md](QUICKSTART.md)** 로 이동! 🚀

또는 **npm run dev** 실행! 🎮✨

