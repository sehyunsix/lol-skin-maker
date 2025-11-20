# 🚀 나노바나나(Nanobanana) API 설정 가이드

## 📌 개요

LoL Skin Maker는 이제 **나노바나나 API만 사용**합니다.
로컬 이미지 처리는 사용하지 않으므로, 나노바나나 API 키 설정이 **필수**입니다.

---

## 🔑 나노바나나 API 키 발급

### Step 1: 나노바나나 웹사이트 방문
```
https://nanobana.com
```

### Step 2: 계정 생성/로그인
- 회원가입 (무료)
- 이메일 인증

### Step 3: API 키 생성
1. 대시보드/개발자 콘솔 접속
2. "새 API 키 생성" 클릭
3. 프로젝트명 입력 (예: "LoL Skin Maker")
4. API 키 복사

---

## 🔧 설정 방법

### Option 1: .env 파일로 설정 (권장) ⭐

1. 프로젝트 루트에서 `.env` 파일 생성

```bash
cd /Users/yuksehyun/project/lol-skin-maker
cat > .env << EOF
NANOBANA_API_KEY=your_actual_api_key_here
PORT=3000
NODE_ENV=development
EOF
```

2. 또는 텍스트 에디터에서 `.env` 파일 생성
```
NANOBANA_API_KEY=sk_live_abc123def456...
PORT=3000
NODE_ENV=development
```

### Option 2: 환경 변수로 직접 설정

```bash
# macOS/Linux
export NANOBANA_API_KEY=your_api_key_here
npm run dev

# Windows (PowerShell)
$env:NANOBANA_API_KEY="your_api_key_here"
npm run dev
```

### Option 3: 서버 시작 시 전달

```bash
NANOBANA_API_KEY=your_api_key_here npm run dev
```

---

## ✅ 설정 확인

### 1. 서버 실행
```bash
npm run dev
```

### 2. 헬스 체크 확인
```bash
curl http://localhost:3000/api/health
```

### 성공 응답 ✓
```json
{
  "status": "ok",
  "nanobanaApiKey": "✓ 설정됨",
  "mode": "Nanobanana API Only",
  "timestamp": "2024-11-20T10:30:00Z"
}
```

### 실패 응답 ✗
```json
{
  "status": "error",
  "nanobanaApiKey": "✗ 미설정 (필수)",
  "mode": "Nanobanana API Only",
  "timestamp": "2024-11-20T10:30:00Z"
}
```

---

## 🎯 사용 방법

### 사용자 입장

1. **앱 방문**
   ```
   http://localhost:3000
   ```

2. **챔피언 선택**
   - 왼쪽 패널에서 챔피언 검색 및 선택

3. **사진 업로드**
   - "내 사진" 박스 클릭
   - 사진 선택 또는 드래그

4. **스킨 생성**
   - "스킨 생성하기" 버튼 클릭
   - 🔄 나노바나나 API에서 처리 중...
   - ✅ 완료!

5. **다운로드**
   - "이미지 저장" 버튼 클릭

---

## 📊 나노바나나 API 작동 원리

```
사용자 사진 업로드
    ↓
서버에서 임시 저장
    ↓
나노바나나 API 호출
    ↓
API에서 이미지 처리
    ├─ 챔피언 스타일 적용
    ├─ 필터 및 효과 추가
    └─ 최적화된 결과 반환
    ↓
서버에서 받은 이미지 저장
    ↓
사용자에게 표시
    ↓
다운로드 가능
```

---

## 🚨 문제 해결

### ❌ "API 키가 설정되지 않았습니다"

**원인**: `.env` 파일이 없거나 `NANOBANA_API_KEY`가 없음

**해결법**:
```bash
# 1. .env 파일 확인
ls -la .env

# 2. .env 파일 생성
echo "NANOBANA_API_KEY=your_key_here" > .env

# 3. 서버 재시작
npm run dev
```

### ❌ "나노바나나 API 오류"

**원인**: API 키가 유효하지 않음 또는 API 서버 문제

**해결법**:
```bash
# 1. API 키 확인
cat .env

# 2. 나노바나나 웹사이트에서 새 키 발급
# https://nanobana.com

# 3. .env 파일 업데이트
# NANOBANA_API_KEY=new_key_here

# 4. 서버 재시작
npm run dev
```

### ❌ "헬스 체크 실패"

```bash
# 상태 확인
curl http://localhost:3000/api/health

# 예상 결과 (실패시)
# {
#   "status": "error",
#   "nanobanaApiKey": "✗ 미설정 (필수)"
# }
```

---

## 📈 나노바나나 API 장점

✅ **고급 이미지 처리**
- 기계학습 기반 스타일 변환
- 더 자연스러운 합성

✅ **고품질 결과**
- 고해상도 처리
- 세밀한 디테일 유지

✅ **빠른 처리**
- 최적화된 서버
- 빠른 응답 시간

✅ **다양한 스타일**
- 여러 필터 지원
- 커스터마이징 가능

---

## 💰 비용 정보

나노바나나 API 가격:
- 무료 평가판: 월 X회 무료
- 유료 플랜: 사용량 기반 요금제
- 자세한 정보: https://nanobana.com/pricing

---

## 🔒 보안 주의사항

### ⚠️ API 키 보안

**절대 하면 안 되는 것**:
```bash
# ❌ 나쁜 예: 코드에 직접 입력
const API_KEY = "sk_live_abc123...";

# ❌ 나쁜 예: Git에 커밋
git add .env
git commit -m "Add API key"

# ❌ 나쁜 예: 공개 저장소에 업로드
```

**해야 할 것**:
```bash
# ✅ 좋은 예: .env 파일 사용
NANOBANA_API_KEY=sk_live_abc123...

# ✅ 좋은 예: .gitignore에 추가
echo ".env" >> .gitignore

# ✅ 좋은 예: 환경 변수로 관리
export NANOBANA_API_KEY=...
```

---

## 📞 나노바나나 지원

- 🌐 웹사이트: https://nanobana.com
- 📧 이메일: support@nanobana.com
- 💬 커뮤니티: https://nanobana.com/community
- 📚 API 문서: https://docs.nanobana.com

---

## 🎓 API 키 관리 팁

### 1. 여러 키 관리
```bash
# 개발용 키
NANOBANA_API_KEY_DEV=sk_dev_...

# 프로덕션용 키
NANOBANA_API_KEY_PROD=sk_prod_...
```

### 2. 정기적 회전
- 월 1회 새 키로 교체
- 나노바나나에서 구 키 삭제

### 3. 권한 제한
- 필요한 권한만 부여
- IP 화이트리스트 설정 (가능시)

---

## ✨ 다음 단계

1. ✅ API 키 발급
2. ✅ .env 파일 생성
3. ✅ 서버 실행
4. ✅ 헬스 체크 확인
5. ✅ 앱 사용 시작!

---

## 📝 참고

- **버전**: 1.0.0
- **업데이트**: 2024-11-20
- **상태**: ✓ 활성 (나노바나나 API만 사용)

---

**설정 완료! 나노바나나 API로 고급 스킨을 생성하세요!** 🚀✨

