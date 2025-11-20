/**
 * 이미지 처리 유틸리티
 * sharp 라이브러리를 사용하여 이미지 변환
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * 이미지에 LoL 스킨 스타일 적용
 * @param {string} inputPath - 입력 이미지 경로
 * @param {string} outputPath - 출력 이미지 경로
 * @param {object} options - 처리 옵션
 * @returns {Promise<Buffer>} - 처리된 이미지 버퍼
 */
async function applyLolSkinStyle(inputPath, outputPath, options = {}) {
    try {
        const {
            brightness = 1.1,  // 밝기 조정
            saturation = 1.3,  // 포화도 증가
            contrast = 1.2,    // 명암 증가
            hue = 20            // 색상 회전 (따뜻한 톤)
        } = options;

        // 이미지 처리
        let pipeline = sharp(inputPath);

        // 밝기 조정
        if (brightness !== 1) {
            pipeline = pipeline.modulate({ brightness });
        }

        // 색상 조정
        if (saturation !== 1 || hue !== 0) {
            pipeline = pipeline.modulate({ saturation, hue });
        }

        // 이미지 저장
        const buffer = await pipeline
            .resize(308, 560, {
                fit: 'cover',
                position: 'center'
            })
            .png()
            .toBuffer();

        if (outputPath) {
            await sharp(buffer).toFile(outputPath);
        }

        return buffer;
    } catch (error) {
        console.error('이미지 처리 오류:', error);
        throw new Error('이미지 처리 중 오류: ' + error.message);
    }
}

/**
 * 이미지에 LoL 테두리 및 텍스트 추가
 * @param {Buffer} imageBuffer - 이미지 버퍼
 * @param {string} championName - 챔피언 이름
 * @returns {Promise<Buffer>} - 처리된 이미지 버퍼
 */
async function addLolFrame(imageBuffer, championName) {
    try {
        // SVG로 오버레이 생성 (LoL 스타일 테두리)
        const svgOverlay = `
            <svg width="308" height="560" xmlns="http://www.w3.org/2000/svg">
                <!-- 황금색 테두리 -->
                <rect x="2" y="2" width="304" height="556" fill="none" stroke="#c8aa6e" stroke-width="2"/>
                
                <!-- 코너 장식 -->
                <line x1="2" y1="2" x2="15" y2="2" stroke="#c8aa6e" stroke-width="2"/>
                <line x1="2" y1="2" x2="2" y2="15" stroke="#c8aa6e" stroke-width="2"/>
                
                <line x1="306" y1="2" x2="293" y2="2" stroke="#c8aa6e" stroke-width="2"/>
                <line x1="306" y1="2" x2="306" y2="15" stroke="#c8aa6e" stroke-width="2"/>
                
                <line x1="2" y1="558" x2="15" y2="558" stroke="#c8aa6e" stroke-width="2"/>
                <line x1="2" y1="558" x2="2" y2="545" stroke="#c8aa6e" stroke-width="2"/>
                
                <line x1="306" y1="558" x2="293" y2="558" stroke="#c8aa6e" stroke-width="2"/>
                <line x1="306" y1="558" x2="306" y2="545" stroke="#c8aa6e" stroke-width="2"/>
                
                <!-- 하단 텍스트 배경 -->
                <rect x="0" y="480" width="308" height="80" fill="rgba(0, 0, 0, 0.6)"/>
                
                <!-- 텍스트 -->
                <text x="154" y="520" font-family="Arial, sans-serif" font-size="18" font-weight="bold" 
                      fill="#f0e6d2" text-anchor="middle">${championName}</text>
                <text x="154" y="545" font-family="Arial, sans-serif" font-size="12" 
                      fill="#c8aa6e" text-anchor="middle">CUSTOM SKIN</text>
            </svg>
        `;

        // 이미지에 SVG 오버레이 추가
        const buffer = await sharp(imageBuffer)
            .composite([{
                input: Buffer.from(svgOverlay),
                top: 0,
                left: 0
            }])
            .png()
            .toBuffer();

        return buffer;
    } catch (error) {
        console.error('테두리 추가 오류:', error);
        return imageBuffer; // 실패 시 원본 이미지 반환
    }
}

/**
 * 이미지 정규화 (파일 형식 변환, 크기 조정)
 * @param {string} inputPath - 입력 이미지 경로
 * @param {string} outputPath - 출력 이미지 경로
 * @returns {Promise<Buffer>} - 정규화된 이미지 버퍼
 */
async function normalizeImage(inputPath, outputPath) {
    try {
        const buffer = await sharp(inputPath)
            .resize(308, 560, {
                fit: 'cover',
                position: 'center'
            })
            .png()
            .toBuffer();

        if (outputPath) {
            await sharp(buffer).toFile(outputPath);
        }

        return buffer;
    } catch (error) {
        console.error('이미지 정규화 오류:', error);
        throw new Error('이미지 정규화 중 오류: ' + error.message);
    }
}

/**
 * 전체 스킨 생성 파이프라인
 * @param {string} inputPath - 입력 이미지 경로
 * @param {string} outputPath - 출력 이미지 경로
 * @param {string} championName - 챔피언 이름
 * @returns {Promise<Buffer>} - 최종 스킨 이미지
 */
async function generateCustomSkin(inputPath, outputPath, championName) {
    try {
        // 1. 이미지 정규화
        console.log('1단계: 이미지 정규화 중...');
        let skinImage = await normalizeImage(inputPath);

        // 2. LoL 스킨 스타일 적용
        console.log('2단계: LoL 스킨 스타일 적용 중...');
        // 참고: 현재는 정규화된 이미지를 사용하므로 직접 처리
        // 실제로는 sharp를 다시 체인으로 연결
        const tempPath = path.join(path.dirname(outputPath), `temp_${Date.now()}.png`);
        await sharp(skinImage)
            .modulate({
                brightness: 1.1,
                saturation: 1.3,
                hue: 20
            })
            .toFile(tempPath);

        skinImage = fs.readFileSync(tempPath);
        fs.unlinkSync(tempPath);

        // 3. LoL 테두리 및 텍스트 추가
        console.log('3단계: LoL 테마 적용 중...');
        skinImage = await addLolFrame(skinImage, championName);

        // 4. 최종 저장
        if (outputPath) {
            await sharp(skinImage).toFile(outputPath);
        }

        console.log('✓ 스킨 생성 완료:', outputPath);
        return skinImage;
    } catch (error) {
        console.error('스킨 생성 파이프라인 오류:', error);
        throw new Error('스킨 생성 중 오류: ' + error.message);
    }
}

module.exports = {
    applyLolSkinStyle,
    addLolFrame,
    normalizeImage,
    generateCustomSkin
};

