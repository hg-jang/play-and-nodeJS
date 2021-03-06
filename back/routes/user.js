const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const passport = require('passport');

const router = express.Router();

// middleware 확장
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.error(err);
      return next(err);
    }
    if(info) {
      return res.status(401).send(info.reason);
    }
    // passport로 login
    return req.login(user, async (loginErr) => {
      if(loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.post('/', async (req, res, next) => {
  try {
    // 중복 찾기
    // 조건은 where 안에서
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if(exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
  
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
  
    res.status(201).send('ok');

  } catch(err) {
    console.error(err);
    next(err);  // status 500
  }
});

module.exports = router;