const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.get('/', controller.index);
