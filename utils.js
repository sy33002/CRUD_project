// multer 관련 설정
const multer = require('multer');
const path = require('path');

// multer 세부 설정
const uploadDetail = multer({

    storage: multer.diskStorage({
        destination(req, file, done) { 
            done(null,`public/images/upload/${req.params.path}`); 
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5* 1024 * 1024},
});

module.exports = uploadDetail;
