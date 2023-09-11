exports.index = (req, res) => {
    const data = req.session.userInfo;
    res.render('index');
};
