// multer 관련 설정
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// multer 세부 설정
const uploadDetail = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            //Directory 존재 여부 체크
            const directory = fs.existsSync(
                `./public/images/upload/${req.params.path}`
            ); //디렉토리 경로 입력

            //보통 Directory가 없다면 새로 만들어야 한다면 아래와 같은 코드를 만들어 사용할 수 있다.
            if (!directory)
                fs.mkdirSync(`./public/images/upload/${req.params.path}`);
            done(null, `public/images/upload/${req.params.path}`);
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

module.exports = uploadDetail;
