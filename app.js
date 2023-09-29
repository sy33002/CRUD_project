const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const config = require('./config/config.json');

const path = require('path');
const app = express();
const PORT = 8000;
const { sequelize } = require('./models');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views/pages'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

const MySessionSecretKey = config.sessionSecretKey;

// 세션 옵션 객체
app.use(
    session({
        secret: 'MySessionSecretKey',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 3 * 60 * 60 * 1000, // 3시간
            name: 'random-session-cookie-name',
        },
    })
);

// header session을 넣는 미들웨어
app.use((req, res, next) => {
    res.locals.Id = 0;
    res.locals.userId = '';
    res.locals.userName = '';
    res.locals.userIsManager = 0;
    if (req.session.userInfo) {
        const userInfo = req.session.userInfo;
        res.locals.Id = userInfo.id;
        res.locals.userId = userInfo.userId;
        res.locals.userName = userInfo.userName;
        res.locals.userIsManager = userInfo.userIsManager;
    }
    next();
});
const crawlingRouter = require('./routes/crawling');
app.use('/', crawlingRouter);

const mainRouter = require('./routes/main');
app.use('/', mainRouter);

const userRouter = require('./routes/user');
app.use('/', userRouter);

const conferenceRouter = require('./routes/conference');
app.use('/', conferenceRouter);

const reviewRouter = require('./routes/review');
app.use('/', reviewRouter);

app.get('*', (req, res) => {
    res.render('404');
});

sequelize.sync({ force: false }).then(
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT} start `);
    })
);
