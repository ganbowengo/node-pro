/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-06-24 15:25:57
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-20 14:45:45
 */
const express = require('express')
const router = express.Router()
const User = require('../models/users')
/* GET users listing. */


router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

// add
router.post('/save', function (req, res, next) {
    const data = req.body.user
    User.getByName(data.name, (err, user) => {
        if (err) return next(err)
        if (user.id) {
            res.error('用户名已存在！')
            res.redirect('back')
        } else {
            const user = new User({ name: data.name, pass: data.pass })
            user.save(err => {
                if (err) return next(err)
                req.session.uid = user.id
                res.redirect('back')
            })
        }
    })
})


router.get('/login', function (req, res, next) {
    res.render('login/login.ejs')
})

router.post('/login', function (req, res, next) {
    const data = req.body.user
    User.auth(data.name, data.pass, (err, user) => {
        if (err) return next(err)
        if (user) {
            req.session.uid = user.id
            res.render('sys/system.ejs', user)
        } else {
            res.error('用户名或密码不正确！')
            res.redirect('back')
        }
    })
})


router.get('/logout', function (req, res, next) {
    req.session.destroy(err => {
        if (err) throw err
        res.redirect('users/login')
    })
})

module.exports = router
