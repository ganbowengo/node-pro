/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-06-24 15:25:57
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-17 18:34:53
 */
const express = require('express')
const router = express.Router()
const User = require('../models/users')
/* GET users listing. */


router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

// get
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
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

module.exports = router
