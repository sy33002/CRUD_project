const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController');
const { uploadDetail } = require('../utils/utils');
const sharp = require('sharp');
const fs = require('fs');

router.get('/', controller.index);

router.post(
    '/upload/:path',
    uploadDetail.single('conferenceFile'), // 수정
    (req, res) => {
        // 업로드 미들웨어 이후의 코드는 이전과 동일
        const tempFilePath = req.file.path; // 임시 파일 경로
        const outputPath = `public/images/upload/${req.params.path}`;

        let newImagePath = '';
        if (outputPath.startsWith('public/')) {
            // 맥용
            newImagePath = outputPath.replace('public/', '/static/'); // public 경로를 static으로 변경
        }

        if (outputPath.startsWith('public\\')) {
            // 윈도우 용
            newImagePath = outputPath.replace(`public\\`, `\\static\\`); // public 경로를 static으로 변경
        }

        try {
            fs.readdir(outputPath, (err) => {
                // uploads 폴더 없으면 생성
                if (err) {
                    fs.mkdirSync(outputPath, { recursive: true });
                }
                sharp(tempFilePath) // 리사이징할 파일의 경로
                    .resize({ width: 1920, height: 1080 }) // 원본 비율 유지하면서 width 크기만 설정
                    .withMetadata()
                    .toFile(`${outputPath}/${req.file.filename}`, (err) => {
                        if (err) throw err;
                        fs.unlink(tempFilePath, (err) => {
                            // 원본파일은 삭제해줍니다
                            // 원본파일을 삭제하지 않을거면 생략해줍니다
                            if (err) throw err;
                        });
                        res.send({
                            result: true,
                            file: `${newImagePath}/${req.file.filename}`,
                        });
                    });
            });
        } catch (err) {
            console.log(err);
        }
    }
);

module.exports = router;
