const { User, Sequelize } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt')

// login 페이지 렌더
exports.getLogin = (req, res) => {
  const data = req.session.userInfo;
  res.render('login');
};

// 회원가입 페이지 렌더
exports.getSignup = (req, res) => {
  res.render('signup');
};

exports.getSignin = async (req, res) => {
  const {name, id} = req.session.userInfo;
  const result = await User.findOne({
    where: { userid: id }
  });
  res.render('profile', {data: result.dataValues});
};

//회원가입
exports.postSignup = async (req, res) => {
  let { userid, pw, name } = req.body;
  pw = bcryptPassword(pw);
  const result = await User.create({
    userid,
    name,
    pw,
  });
  res.send({result: true});
};
  
exports.postLogin = async (req, res) => {
  const { userid, pw } = req.body;
  const result = await User.findOne({
    where: { userid: userid }
  });
  if (result) {
    if (compareFunc(pw, result.pw) === true) {
        req.session.userInfo = {
        name: result.dataValues.name,
        id: result.dataValues.userid,
      }
      const data = req.session.userInfo;
      res.send({ result: true, data });
    }
    else{
      res.send({ result: false, message: '비밀번호가 틀렸습니다.' })
    }
  } else {
    res.send({ result: false, message: '존재하는 사용자가 없습니다.' })
    }
}
  
exports.patchProfile = async (req, res) => {
  const result = await User.update({
    name: req.body.name,
    pw: req.body.pw,
  }, {
    where: {userid: req.body.userid}
  });
  res.send({result: true})
};
  
exports.deleteUser = async (req, res) => {
  console.log("req.body:", req.session.userInfo);
  const result = await User.destroy({
    where: { userid: req.session.userInfo.id },
  });
  req.session.destroy((err) =>{
    if (err) {
      return ;
    }
    res.send({result});
  })
};
  
// 비밀번호 암호화 함수
const saltRounds = 5;
function bcryptPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}
  
function compareFunc(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword); 
}