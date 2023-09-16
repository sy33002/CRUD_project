const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

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

// 임시 키
const MySessionSecretKey = '1234';
// 세션 옵션 객체
app.use(
    session({
        secret: 'MySessionSecretKey',
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24시간
        },
    })
);

// 모든 페이지에 session을 넣는 미들웨어
app.use((req, res, next) => {
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
