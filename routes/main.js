const express = require('express');
const router = express.Router();
const controller = require('../controller/mainController');
const uploadDetail = require('../utils');

router.get('/', controller.index);

router.post(
    '/upload/:path',
    uploadDetail.single('conferenceFile'),
    (req, res) => {
        res.send({ result: true, file: req.file });
    }
);

module.exports = router;
