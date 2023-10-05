const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination(req, file, done) {
        const folderPath = `public/images/upload/`;

        fs.promises
            .access(folderPath)
            .then(() => {
                // uploads 폴더가 이미 존재하는 경우
                done(null, folderPath);
            })
            .catch(() => {
                // uploads 폴더가 없는 경우, 생성
                return fs.promises.mkdir(folderPath, { recursive: true });
            })
            .then(() => {
                done(null, folderPath);
            })
            .catch((err) => {
                done(err, null);
            });
    },
    filename(req, file, done) {
        const ext = path.extname(file.originalname);
        done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
});

const uploadDetail = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, done) {
        // 파일 유효성 검사 로직을 추가
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/png'
        ) {
            done(null, true);
        } else {
            done(new Error('File type not supported'), false);
        }
    },
});

module.exports = { uploadDetail };
