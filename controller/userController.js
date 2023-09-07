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

// 로그인
exports.postLogin = async (req, res) => {
  const { user_id, user_pw } = req.body;
  const result = await User.findOne({
    where: { user_id: user_id }
  });
  if (result) {
    if (compareFunc(user_pw, result.user_pw) === true) {
      req.session.userInfo = {
      id: result.dataValues.id,
      user_name: result.dataValues.user_name,
      user_id: result.dataValues.user_id,
      user_pw: result.dataValues.user_pw,
      user_addr: result.dataValues.user_addr,
      user_email: result.dataValues.user_email,
      user_category: result.dataValues.user_category,
    }
    const data = req.session.userInfo;
      res.send({ result: true, data });
    } else{
        res.send({ result: false, message: '비밀번호가 틀렸습니다.' })
      }
    } else {
      res.send({ result: false, message: '존재하는 사용자가 없습니다.' })
      }
  }
  
//회원가입
exports.postSignup = async (req, res) => {
  const { user_id, user_pw } = req.body;
  const id_result = await User.findOne({
    where: { user_id: user_id }
  });
  if (id_result) {
    res.send({data: false})
    return ;
  } else {
    pw = bcryptPassword(pw);
    const result = await User.create({
      id,
      user_id: req.body.user_id,
      user_pw: req.body.user_pw,
      user_name: req.body.user_name,
      user_addr: req.body.user_addr,
      user_email: req.body.user_email,
      user_category: req.body.user_category,
    });
  }
  res.send({result});
};

// 회원 탈퇴
exports.patchProfile = async (req, res) => {
  const result = await User.update({
    user_id: req.body.user_id,
    user_pw: req.body.user_pw,
    user_name: req.body.user_name,
    user_addr: req.body.user_addr,
    user_email: req.body.user_email,
    user_category: req.body.user_category,
  }, {
    where: {user_id: req.body.user_id}
  });
  res.send({result: true})
};
  
exports.deleteUser = async (req, res) => {
  const result = await User.destroy({
    where: { userid: req.session.userInfo.user_id },
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