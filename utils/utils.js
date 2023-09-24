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

module.exports = { uploadDetail };
