// multer 관련 설정
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// multer 세부 설정
const uploadDetail = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            const folderPath = `public/images/upload/`;

            fs.readdir(folderPath, (err) => {
                // uploads 폴더 없으면 생성
                if (err) {
                    fs.mkdirSync(folderPath, { recursive: true });
                }

                done(null, `public/images/upload/`);
            });
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(
                null,
                path.basename(file.originalname, ext) + Date.now() + ext
            );
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

function getIdFromUrl(url) {
    const parts = url.split('/'); // URL을 '/'로 분할
    const idIndex = parts.indexOf('event'); // 'event' 부분의 인덱스
    if (idIndex !== -1 && idIndex < parts.length - 1) {
        return parts[idIndex + 1]; // :id 값을 추출
    }
    return null; // :id 값을 찾지 못한 경우
}

module.exports = { getIdFromUrl, uploadDetail };
