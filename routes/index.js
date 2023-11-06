/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-06-24 15:25:57
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-10-13 18:20:34
 */
var fs = require('fs')
var express = require('express')
var router = express.Router()
// var msgsRouter = require('./msgs')
// var usersRouter = require('./users')
// var uploadRouter = require('./upload')


router.get('/', function (req, res, next) {
    res.render('pdf/index.ejs')
})

router.get('/error', function (req, res, next) {
    res.render('error.ejs')
})

router.get('/api', (req, res, next) => {
    let result = fs.readFileSync('./headerbg.png')
    // res.redirect('/error');
    res.send(result);
})
/* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', { title: 'Express' })
// })

// router.use('/users', usersRouter)
// router.use('/msgs', msgsRouter)
// router.use('/upload', uploadRouter)

module.exports = router
