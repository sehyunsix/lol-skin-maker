# 🚀 LoL Skin Maker - 빠른 시작 (1분)

## 한 줄 요약
사진을 업로드하면 롤 스킨으로 변환해주는 AI 기반 웹앱입니다.

![예시 이미지](assets/example_result.png)

---

## ⚡ 5분 안에 시작하기

### 1️⃣ 터미널 열기
```bash
cd /Users/yuksehyun/project/lol-skin-maker
```

### 2️⃣ 패키지 설치
```bash
npm install
```
💾 약 2-3분 소요

### 3️⃣ 서버 실행
```bash
npm run dev
```

### 4️⃣ 브라우저 열기
```
http://localhost:3000
```

---

## 🎮 사용 방법

| 순서 | 단계 | 설명 |
|------|------|------|
| 1️⃣ | **챔피언 선택** | 왼쪽 패널에서 챔피언 클릭 |
| 2️⃣ | **사진 업로드** | "클릭하여 사진 선택" 영역 클릭 |
| 3️⃣ | **미리보기** | 슬라이더로 효과 조절 |
| 4️⃣ | **생성** | "스킨 생성하기" 클릭 |
| 5️⃣ | **다운로드** | "이미지 저장" 클릭 |

---

## ✨ 핵심 기능

✅ **챔피언 검색** - 원하는 챔피언 빠르게 찾기
✅ **실시간 미리보기** - 효과 조절하며 즉시 확인
✅ **AI 스킨 생성** - 자동으로 LoL 스타일 적용
✅ **원클릭 다운로드** - PNG 이미지로 저장

---

## 📋 필수 요구사항

- ✅ Node.js 14+
- ✅ npm 또는 yarn
- ✅ 인터넷 연결

---

## 🚨 문제 해결

### ❌ "포트 3000이 이미 사용 중입니다"
```bash
PORT=3001 npm run dev
```

### ❌ "Sharp 설치 오류"
```bash
npm install --build-from-source
```

### ❌ "uploads 폴더가 없습니다"
서버가 자동으로 생성합니다. 그냥 실행하세요.

---

## 🔑 (선택) API 키 추가

고급 이미지 처리를 위해 나노바나 API 사용 가능:

```bash
# .env 파일 생성
echo "NANOBANA_API_KEY=your_key_here" > .env
```

없어도 기본 기능은 완벽하게 작동합니다! ✨

---

## 📁 생성되는 파일들

- `uploads/` - 생성된 스킨 이미지 저장
- `.env` - API 키 (선택사항)
- `node_modules/` - 설치된 패키지

---

## 🎯 다음 단계

### 기본 기능 확인 후:
1. [`README.md`](README.md) - 전체 기능 설명
2. [`SETUP.md`](SETUP.md) - 상세 설정 가이드
3. [`PROJECT_SUMMARY.md`](PROJECT_SUMMARY.md) - 기술 아키텍처

---

## 🔗 유용한 링크

- 🌐 [League of Legends](https://www.leagueoflegends.com/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🖼️ [Sharp Documentation](https://sharp.pixelplumbing.com/)
- 📚 [Express.js](https://expressjs.com/)

---

## 💡 팁

### 더 나은 결과를 위해:
1. **명확한 사진 사용** - 정면 사진 권장
2. **고해상도 이미지** - 500x500px 이상
3. **명확한 조명** - 어두운 사진은 피하기
4. **배경 제거** - 배경이 없는 사진이 더 나음

### 여러 스킨 만들기:
- 같은 챔피언으로 여러 사진 시도
- 다른 챔피언들도 시험해보기
- 슬라이더로 강도 조절

---

## 📞 문제가 있나요?

```bash
# 서버 로그 확인
npm run dev

# 해당 포트의 프로세스 확인
lsof -i :3000

# 모든 캐시 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

---

## 🎓 코드 구조 (간단버전)

```
사용자 (브라우저)
    ↓
index.html (사진 업로드)
    ↓
server.js (이미지 처리)
    ↓
image-processor.js (Sharp로 변환)
    ↓
uploads/ (스킨 저장)
    ↓
다운로드! 🎉
```

---

**준비되셨나요? 이제 스킨을 만들어보세요!** 🚀✨

시작: `npm run dev` 👈 여기 클릭!

