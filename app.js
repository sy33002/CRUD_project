const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('/view', 'views');
app.set('/static', 'static');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('*', (req, res) => {
    res.render('404');
});

// localhost:PORT로 express 앱이 실행
app.listen(PORT, () => {
    console.log(`${PORT} start `);
});
