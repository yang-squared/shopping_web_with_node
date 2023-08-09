const express = require('express');

const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', 
[
    body('email')
      .isEmail()
      .withMessage('입력하신 아이디 정보가 없습니다. 다시 입력해주세요.')
      .normalizeEmail(),
    body('password', '비밀번호를 잘못 입력했습니다. 다시 입력해주세요.')
      .isLength({ min: 4 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
  );

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post(
    '/signup',
    [
     check('email')
     .isEmail()
     .withMessage('유효한 메세지를 입력하세요')
     .custom((value, { req }) => {
        return User.findOne({ email: value })
        .then(userDoc => {
            if (userDoc) {
                return Promise.reject('사용할 수 없는 이메일입니다.');
        } 
     })
    })
     .normalizeEmail(),

     body('password', '최소 4글자이상으로 비밀번호를 설정해주세요')
     .isLength({ min: 4 })
     .isAlphanumeric()
     .trim(),
     
     body('confirmpassword')
     .trim()
     .custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error('비밀번호가 다릅니다.');
        }
        return true;
     })
    ], 
    authController.postSignup
    );

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getUpdatepw);

router.post('/update-pw', authController.postUpdatepw);

module.exports = router;