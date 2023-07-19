const express = require('express');

const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post(
    '/signup',
    [
     check('email')
     .isEmail()
     .withMessage('유효한 메세지를 입력하세요'),
     
     body('password', '최소 4글자이상으로 비밀번호를 설정해주세요')
     .isLength({ min: 4 })
     .isAlphanumeric(),
     
     body('confirmpassword').custom((value, { req }) => {
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