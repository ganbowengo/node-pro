/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-06-24 15:25:57
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-21 10:31:58
 */
var express = require('express')
var router = express.Router()
var msgsRouter = require('./msgs')
var usersRouter = require('./users')
var uploadRouter = require('./upload')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' })
})

router.use('/users', usersRouter)
router.use('/msgs', msgsRouter)
router.use('/upload', uploadRouter)

module.exports = router
