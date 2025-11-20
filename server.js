const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const dotenv = require('dotenv');
const imageProcessor = require('./image-processor');
const { GoogleGenAI } = require('@google/genai'); // SDK 추가

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// uploads 디렉토리 생성
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        // 이미지 파일만 허용
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('이미지 파일만 업로드 가능합니다.'));
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB 제한
});

// 정적 파일 제공
app.use(express.static(__dirname));
app.use(express.json());

/**
 * 나노바나나 (Google Gemini SDK)를 사용하여 새로운 스킨 이미지 생성
 * @param {string} imagePath - 업로드된 이미지 경로
 * @param {string} champion - 선택된 챔피언 이름
 * @returns {Promise<Buffer>} - 생성된 이미지 버퍼
 */
async function generateSkinWithNanobana(imagePath, champion) {
    try {
        const apiKey = process.env.NANOBANA_API_KEY;
        if (!apiKey) {
            throw new Error('나노바나나 API 키가 설정되지 않았습니다.');
        }

        console.log(`🍌 나노바나나(Gemini SDK)가 ${champion} 스킨을 생성 중...`);

        // SDK 초기화
        const ai = new GoogleGenAI({ apiKey: apiKey });

        // 이미지 파일 읽기 및 Base64 인코딩
        const imageBuffer = fs.readFileSync(imagePath);
        const base64Image = imageBuffer.toString('base64');
        
        // 프롬프트 구성
        const prompt = `Create a high-quality illustration of the League of Legends champion "${champion}" but with the face/features of the person in the input image.
        Style: Riot Games splash art, fantasy, cinematic lighting, highly detailed.
        The character should be wearing ${champion}'s costume and be in a dynamic pose characteristic of the champion.
        Ensure the face resembles the input person but adapted to the art style.`;

        console.log('모델 호출 중: gemini-2.5-flash-image (이미지 생성 시도)');

        // SDK를 사용한 콘텐츠 생성 (이미지 포함)
        const modelName = 'gemini-2.5-flash-image'; 

        const result = await ai.models.generateContent({
            model: modelName,
            contents: [
                { text: prompt },
                {
                    inlineData: {
                        mimeType: 'image/jpeg',
                        data: base64Image
                    }
                }
            ]
        });

        // 응답 구조 디버깅을 위한 로그
        console.log('AI 응답 키:', Object.keys(result));

        // 응답 파싱 (SDK 버전에 따라 구조가 다를 수 있음)
        // 1. 사용자가 제공한 예제 방식 (result 자체가 response)
        let response = result;
        
        // 2. 일반적인 Google SDK 방식 (result.response 안에 실제 데이터)
        if (result.response) {
            response = result.response;
        }

        // parts 찾기
        let parts = response.parts;
        
        // candidates 안에 parts가 있는 경우 (텍스트 생성 모델의 일반적 구조)
        if (!parts && response.candidates && response.candidates.length > 0) {
            parts = response.candidates[0].content.parts;
        }

        if (!parts) {
            console.error('전체 응답 객체:', JSON.stringify(result, null, 2));
            throw new Error('AI 응답에서 parts를 찾을 수 없습니다.');
        }

        for (const part of parts) {
            if (part.inlineData) {
                console.log('✨ AI가 이미지를 생성했습니다!');
                return Buffer.from(part.inlineData.data, 'base64');
            }
            
            // 텍스트 응답인 경우
            if (part.text) {
                console.warn('⚠ AI가 텍스트로 응답했습니다:', part.text.substring(0, 100) + '...');
            }
        }

        throw new Error('AI가 이미지를 생성하지 않았습니다. (텍스트 응답만 수신됨)');

    } catch (error) {
        console.error('나노바나나 SDK 오류:', error.message);
        
        if (error.message.includes('not found') || error.message.includes('404')) {
            console.log('💡 팁: 모델명이 정확한지, API 키에 해당 모델 접근 권한이 있는지 확인해주세요.');
        }
        
        throw error;
    }
}

/**
 * 캔버스 기반 스킨 생성 (백업 방식)
 * 이미지를 단순 변환하여 LoL 스타일 적용
 */
async function generateSkinWithCanvasStyle(imagePath) {
    try {
        // 이미지 파일 읽기
        const imageBuffer = fs.readFileSync(imagePath);
        
        // 간단한 변환: 이미지 필터 적용
        // 실제 구현에서는 sharp 라이브러리를 사용하여 이미지 처리
        return imageBuffer;
    } catch (error) {
        console.error('캔버스 기반 생성 오류:', error);
        throw error;
    }
}

/**
 * 스킨 생성 엔드포인트 (통합)
 */
app.post('/api/generate-skin', upload.single('image'), async (req, res) => {
    let inputPath = null;
    let outputPath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                error: '이미지 파일이 업로드되지 않았습니다.' 
            });
        }

        const { champion } = req.body;
        if (!champion) {
            return res.status(400).json({ 
                success: false, 
                error: '챔피언 이름이 필요합니다.' 
            });
        }

        inputPath = req.file.path;
        const outputFilename = `skin_${Date.now()}_${champion}.png`;
        outputPath = path.join(uploadDir, outputFilename);

        console.log(`\n스킨 생성 시작: ${champion}`);
        console.log(`입력: ${inputPath}`);
        console.log(`출력: ${outputPath}`);

        // 스킨 생성 프로세스
        let skinImageBuffer;

        // ✓ 나노바나 API를 사용하여 스킨 생성
        console.log('나노바나 API로 스킨 생성 중...');
        
        if (!process.env.NANOBANA_API_KEY) {
            throw new Error('나노바나 API 키가 설정되지 않았습니다. .env 파일에 NANOBANA_API_KEY를 추가해주세요.');
        }

        try {
            skinImageBuffer = await generateSkinWithNanobana(inputPath, champion);
            console.log('✓ 나노바나 API 스킨 생성 성공');
            
            // 나노바나 API로 생성된 이미지 저장
            fs.writeFileSync(outputPath, skinImageBuffer);
        } catch (apiError) {
            console.error('⚠ 나노바나 API 오류:', apiError.message);
            throw apiError;
        }

        // 파일 크기 확인
        const stats = fs.statSync(outputPath);
        
        // 응답
        res.json({
            success: true,
            message: '스킨이 성공적으로 생성되었습니다.',
            filename: outputFilename,
            url: `/uploads/${outputFilename}`,
            size: stats.size,
            champion: champion,
            timestamp: new Date().toISOString()
        });

        console.log(`✓ 스킨 생성 완료: ${outputFilename} (${stats.size} bytes)\n`);

        // 임시 파일 삭제 (비동기)
        setTimeout(() => {
            try {
                if (inputPath && fs.existsSync(inputPath)) {
                    fs.unlinkSync(inputPath);
                    console.log(`삭제: ${inputPath}`);
                }
            } catch (err) {
                console.warn('임시 파일 삭제 실패:', err);
            }
        }, 5000);

    } catch (error) {
        console.error('스킨 생성 중 오류:', error);
        
        // 업로드된 파일 정리
        if (inputPath && fs.existsSync(inputPath)) {
            try {
                fs.unlinkSync(inputPath);
            } catch (err) {
                console.warn('파일 삭제 실패:', err);
            }
        }

        // 출력 파일 정리
        if (outputPath && fs.existsSync(outputPath)) {
            try {
                fs.unlinkSync(outputPath);
            } catch (err) {
                console.warn('출력 파일 삭제 실패:', err);
            }
        }

        res.status(500).json({
            success: false,
            error: error.message || '스킨 생성 중 오류가 발생했습니다.',
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * 업로드된 이미지 조회
 */
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(uploadDir, filename);

    // 보안: 경로 검증
    if (!filepath.startsWith(uploadDir)) {
        return res.status(403).json({ error: '접근 거부' });
    }

    res.sendFile(filepath);
});

/**
 * 헬스 체크
 */
app.get('/api/health', (req, res) => {
    const apiKeyStatus = process.env.NANOBANA_API_KEY ? '✓ 설정됨' : '✗ 미설정 (필수)';
    const status = process.env.NANOBANA_API_KEY ? 'ok' : 'error';
    
    res.status(process.env.NANOBANA_API_KEY ? 200 : 400).json({ 
        status: status,
        nanobanaApiKey: apiKeyStatus,
        mode: 'Nanobanana API Only',
        timestamp: new Date().toISOString()
    });
});

/**
 * 에러 핸들링 미들웨어
 */
app.use((err, req, res, next) => {
    console.error('에러:', err);
    
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                success: false, 
                error: '파일 크기가 너무 큽니다. (최대 10MB)' 
            });
        }
    }

    res.status(500).json({
        success: false,
        error: err.message || '서버 오류가 발생했습니다.'
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`
╔════════════════════════════════════╗
║   LoL Skin Maker 서버 시작        ║
╠════════════════════════════════════╣
║ 포트: ${port}                    
║ 주소: http://localhost:${port}
║ API 키: ${process.env.NANOBANA_API_KEY ? '✓ 설정됨' : '✗ 미설정'}
╚════════════════════════════════════╝
    `);
});

