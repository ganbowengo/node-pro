/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-06-24 15:25:57
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-16 14:37:00
 */
var express = require('express')
var router = express.Router()
var msgsRouter = require('./msgs')
var usersRouter = require('./users')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

router.use('/users', usersRouter)
router.use('/msgs', msgsRouter)

module.exports = router
