# 🚀 나노바나나 (Google Gemini) API 설정 가이드

## 📌 개요

LoL Skin Maker는 이제 **Google Gemini API**를 "나노바나나"로 사용하여 이미지를 분석하고 스킨을 생성합니다.
`api.nanobana.com` 대신 `generativelanguage.googleapis.com`을 사용합니다.

---

## 🔑 Google API 키 발급 (나노바나나 키)

### Step 1: Google AI Studio 방문
```
https://aistudio.google.com/app/apikey
```

### Step 2: API 키 생성
1. Google 계정으로 로그인
2. "Create API key" 클릭
3. "Create API key in new project" 선택
4. 생성된 키 복사 (이것이 `NANOBANA_API_KEY` 입니다)

---

## 🔧 설정 방법

### Option 1: .env 파일로 설정 (권장) ⭐

1. 프로젝트 루트에서 `.env` 파일 생성 또는 수정

```bash
cd /Users/yuksehyun/project/lol-skin-maker
# .env 파일 내용:
NANOBANA_API_KEY=AIzaSy... (복사한 Google API 키)
PORT=3000
NODE_ENV=development
```

### Option 2: 환경 변수로 직접 설정

```bash
# macOS/Linux
export NANOBANA_API_KEY=AIzaSy...
npm run dev
```

---

## 🔄 작동 원리

1. **사용자**가 사진을 업로드하고 챔피언을 선택합니다.
2. **서버**는 사진과 챔피언 이름을 **Google Gemini Vision API**로 전송합니다.
3. **Google AI**는 다음을 수행합니다:
   - 사진의 특징 분석
   - 챔피언의 색감 및 스타일 분석
   - 최적의 밝기, 채도, 색조, 대비 값 제안
4. **서버**는 제안된 값을 사용하여 이미지를 **로컬에서 변환**합니다.
5. **결과**: 챔피언의 분위기가 입혀진 나만의 스킨 탄생! ✨

---

## 🚨 문제 해결

### ❌ "Google API 호출 실패: Request failed with status code 400"

**원인**: API 키가 없거나 잘못되었습니다.
**해결**: `.env` 파일의 `NANOBANA_API_KEY`가 올바른 Google API 키인지 확인하세요.

### ❌ "Google API 호출 실패: 403 Forbidden"

**원인**: API 키가 활성화되지 않았거나 결제 계정 문제일 수 있습니다.
**해결**: Google AI Studio에서 API 키 상태를 확인하세요.

---

## 📝 참고

나노바나나 API는 Google Gemini 1.5 Flash 모델을 사용합니다.
- 빠르고 효율적입니다.
- 이미지 분석에 최적화되어 있습니다.
- 무료 티어에서도 사용 가능합니다.

---

**이제 Google의 강력한 AI로 스킨을 만들어보세요!** 🚀✨

