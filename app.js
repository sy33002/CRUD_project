const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views/pages'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

const mainRouter = require('./routes/main');
app.use('/', mainRouter);

const conferenceRouter = require('./routes/conference');
app.use('/conference', conferenceRouter);

app.get('*', (req, res) => {
    res.render('404');
});

// localhost:PORT로 express 앱이 실행
app.listen(PORT, () => {
    console.log(`${PORT} start `);
});
