# LoL Skin Maker - 프로젝트 요약

## 📝 프로젝트 개요

사용자가 업로드한 사진을 League of Legends 스타일의 커스텀 스킨으로 변환해주는 풀스택 웹 애플리케이션입니다.

---

## 🎯 핵심 기능

| 기능 | 설명 | 구현 위치 |
|------|------|---------|
| **챔피언 선택** | LoL 모든 챔피언 검색 및 선택 | `index.html` (클라이언트) |
| **사진 업로드** | 드래그 & 드롭 또는 클릭 업로드 | `index.html` + `server.js` |
| **실시간 미리보기** | 캔버스로 합성 미리보기 | `index.html` (캔버스 API) |
| **스킨 생성** | AI 또는 로컬 이미지 처리 | `server.js` + `image-processor.js` |
| **다운로드** | PNG 형식으로 다운로드 | `index.html` |

---

## 🏗️ 아키텍처

```
┌─────────────────────────────────────────────────────┐
│                   사용자 (브라우저)                  │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/FormData
┌──────────────────────▼──────────────────────────────┐
│            Frontend (index.html)                     │
│  ┌────────────────────────────────────────────────┐ │
│  │ • 챔피언 선택 UI                              │ │
│  │ • 파일 업로드 (input)                         │ │
│  │ • Canvas 미리보기                             │ │
│  │ • /api/generate-skin 요청                     │ │
│  └────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │ POST /api/generate-skin
┌──────────────────────▼──────────────────────────────┐
│          Backend (Express.js - server.js)           │
│  ┌────────────────────────────────────────────────┐ │
│  │ 1. Multer: 파일 업로드 처리                   │ │
│  │ 2. 파일 검증 (타입, 크기)                     │ │
│  │ 3. 이미지 처리 결정                          │ │
│  │    ├─ Nanobana API (설정시)                  │ │
│  │    └─ Sharp 로컬 처리                        │ │
│  │ 4. 결과 저장 & 응답                          │ │
│  └────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │ 이미지 처리
┌──────────────────────▼──────────────────────────────┐
│      Image Processing (image-processor.js)          │
│  ┌────────────────────────────────────────────────┐ │
│  │ 1. 이미지 정규화 (308x560)                   │ │
│  │ 2. LoL 스킨 스타일 적용                       │ │
│  │    • 밝기, 포화도, 색상 조정                 │ │
│  │ 3. LoL 테두리 & 텍스트 추가                  │ │
│  │ 4. PNG로 저장                                │ │
│  └────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│            파일 시스템 (uploads/)                    │
│        생성된 스킨 이미지 저장 및 제공              │
└──────────────────────────────────────────────────────┘
```

---

## 📁 파일 설명

### `index.html` (Frontend - 메인)
```html
• 약 390줄의 HTML/CSS/JavaScript 혼합 파일
• 역할:
  - LoL 테마 UI 구성 (Tailwind CSS + 커스텀 스타일)
  - 챔피언 데이터 로드 (Ddragon API)
  - 파일 업로드 처리
  - 캔버스 기반 실시간 미리보기
  - 서버 API 호출 및 결과 표시
```

**주요 함수**:
- `loadChampions()`: 챔피언 데이터 로드
- `selectChampion()`: 챔피언 선택
- `updateCanvasPreview()`: 캔버스 미리보기
- `generateSkinWithAI()`: 서버로 스킨 생성 요청
- `showGeneratedSkin()`: 생성된 스킨 표시

---

### `server.js` (Backend - 핵심)
```javascript
• 약 180줄의 Node.js/Express 코드
• 역할:
  - Express 서버 초기화
  - Multer로 파일 업로드 처리
  - 이미지 유효성 검증
  - Nanobana API 또는 Sharp로 이미지 처리
  - 최종 이미지 저장 및 응답
```

**주요 엔드포인트**:
- `POST /api/generate-skin`: 스킨 생성 (메인)
- `GET /api/health`: 서버 상태 확인
- `GET /uploads/:filename`: 이미지 조회

**주요 기능**:
- `generateSkinWithNanobana()`: Nanobana API 호출
- `generateSkinWithCanvasStyle()`: 기본 처리
- 자동 폴백: API 실패 시 로컬 처리로 자동 전환

---

### `image-processor.js` (이미지 처리 - Sharp)
```javascript
• 약 140줄의 이미지 처리 로직
• 역할:
  - Sharp 라이브러리를 사용한 이미지 변환
  - LoL 스타일 필터 적용
  - SVG 오버레이로 테두리/텍스트 추가
```

**주요 함수**:
1. `applyLolSkinStyle()`: 색상/밝기 조정
2. `addLolFrame()`: 황금색 테두리 및 텍스트
3. `normalizeImage()`: 크기 조정
4. `generateCustomSkin()`: 전체 파이프라인

**처리 순서**:
```
입력 이미지
    ↓
정규화 (308x560)
    ↓
필터 적용 (밝기 1.1x, 포화도 1.3x)
    ↓
SVG 오버레이 추가
    ↓
PNG로 저장
```

---

### `package.json`
```json
• 프로젝트 설정 및 의존성 정의
• 스크립트:
  - "npm start": 프로덕션 실행
  - "npm run dev": 개발 모드 (자동 재시작)
```

**의존성**:
| 패키지 | 용도 |
|--------|------|
| express | 웹 서버 |
| multer | 파일 업로드 |
| sharp | 이미지 처리 |
| axios | HTTP 요청 |
| dotenv | 환경 변수 |

---

### `.env.example`
```env
NANOBANA_API_KEY=your_api_key_here (선택사항)
PORT=3000
NODE_ENV=development
```

---

### `README.md` & `SETUP.md`
- **README.md**: 프로젝트 전체 설명서
- **SETUP.md**: 상세 설정 가이드 및 트러블슈팅

---

## 🔄 요청 흐름

### 1. 사용자 상호작용
```
1. 챔피언 선택 (클릭)
   └─> selectedChampion 변수 업데이트
       └─> updateCanvasPreview() 호출
           └─> 캔버스에 미리보기 표시

2. 사진 업로드 (드래그 & 드롭)
   └─> userImageFile 변수 저장
       └─> 캔버스 미리보기 업데이트

3. 슬라이더 조절
   └─> opacitySlider 값 변경
       └─> 캔버스 미리보기 업데이트 (실시간)

4. "스킨 생성하기" 클릭
   └─> generateSkinWithAI() 호출
       └─> FormData로 파일 + 챔피언명 전송
           └─> POST /api/generate-skin
```

### 2. 서버 처리
```
POST /api/generate-skin 수신
    ↓
Multer: 파일 저장 (uploads/)
    ↓
검증:
  ├─ 파일 존재 확인
  ├─ 파일 타입 확인 (이미지만)
  ├─ 챔피언명 확인
  └─ 파일 크기 확인 (최대 10MB)
    ↓
이미지 처리 선택:
  ├─ NANOBANA_API_KEY 존재?
  │   ├─ Yes: generateSkinWithNanobana() 시도
  │   └─ 실패: 로컬 처리로 폴백
  └─ generateCustomSkin() 실행
    ↓
결과 저장 (uploads/skin_*.png)
    ↓
JSON 응답:
{
  "success": true,
  "url": "/uploads/skin_*.png",
  "champion": "Ahri"
}
```

### 3. 클라이언트 업데이트
```
응답 받음 (200 OK)
    ↓
이미지 표시:
  ├─ Canvas 숨기기
  ├─ 새 <img> 요소 생성
  └─ url로 이미지 로드
    ↓
다운로드 버튼 활성화
```

---

## 🚀 실행 흐름

### 첫 실행
```bash
1. npm install
2. .env 파일 생성 (또는 스킵)
3. npm run dev
4. http://localhost:3000 접속
```

### 서버 시작 로그
```
╔════════════════════════════════════╗
║   LoL Skin Maker 서버 시작        ║
╠════════════════════════════════════╣
║ 포트: 3000                    
║ 주소: http://localhost:3000
║ API 키: ✓ 설정됨 (또는 ✗ 미설정)
╚════════════════════════════════════╝
```

---

## 🔌 API 명세

### POST `/api/generate-skin`
**요청**:
```bash
curl -X POST http://localhost:3000/api/generate-skin \
  -F "image=@photo.jpg" \
  -F "champion=Ahri"
```

**응답 (성공)**:
```json
{
  "success": true,
  "message": "스킨이 성공적으로 생성되었습니다.",
  "filename": "skin_1700470200000_Ahri.png",
  "url": "/uploads/skin_1700470200000_Ahri.png",
  "size": 125000,
  "champion": "Ahri",
  "timestamp": "2024-11-20T10:30:00Z"
}
```

**응답 (실패)**:
```json
{
  "success": false,
  "error": "이미지 파일이 업로드되지 않았습니다.",
  "timestamp": "2024-11-20T10:30:00Z"
}
```

---

## 🛡️ 보안 기능

| 기능 | 구현 | 위치 |
|------|------|------|
| 파일 타입 검증 | MIME 타입 확인 | server.js:26-31 |
| 파일 크기 제한 | 10MB 제한 | server.js:33 |
| 경로 검증 | 상대 경로만 허용 | server.js:109-112 |
| 임시 파일 삭제 | 5초 후 자동 삭제 | server.js:94-100 |
| API 키 보호 | 환경 변수 사용 | .env |

---

## 📊 성능 최적화

| 항목 | 구현 | 효과 |
|------|------|------|
| 이미지 정규화 | 308x560으로 고정 | 파일 크기 감소 |
| 동기 처리 | 요청별 순차 처리 | 리소스 효율 |
| 자동 폴백 | API 실패 시 로컬 처리 | 가용성 증가 |
| 임시 파일 정리 | 자동 삭제 | 디스크 사용량 감소 |

---

## 🎓 학습 포인트

이 프로젝트에서 배울 수 있는 기술:

1. **프론트엔드**
   - HTML5 Canvas API (이미지 합성)
   - File API (파일 업로드)
   - Fetch API (서버 통신)
   - Tailwind CSS (스타일링)

2. **백엔드**
   - Express.js (웹 서버)
   - Multer (파일 업로드)
   - Sharp (이미지 처리)
   - 에러 처리 및 폴백

3. **DevOps**
   - 환경 변수 관리
   - 파일 시스템 관리
   - 로깅 및 모니터링

4. **보안**
   - 파일 유효성 검증
   - 경로 검증
   - API 키 보호

---

## 🎯 향후 개선 사항

- [ ] 데이터베이스 추가 (생성 히스토리)
- [ ] 사용자 인증 (로그인)
- [ ] 이미지 필터 추가
- [ ] 배치 처리 (여러 이미지)
- [ ] WebSocket (실시간 진행률)
- [ ] CDN 연동 (이미지 캐싱)
- [ ] 모바일 앱 (React Native)

---

## 📞 문제 해결

| 문제 | 해결방법 |
|------|--------|
| 포트 3000 사용 중 | PORT=3001 npm run dev |
| Sharp 설치 실패 | npm install --build-from-source |
| uploads 폴더 없음 | 서버가 자동 생성 |
| API 키 오류 | .env 파일 확인 |

---

## 📝 라이선스 및 저작권

- MIT License
- League of Legends는 Riot Games의 상표입니다.

---

**완성된 풀스택 애플리케이션!** 🎮✨

