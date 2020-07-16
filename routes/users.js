/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-06-24 15:25:57
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-16 14:37:21
 */
const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})

router.get('/ss', function (req, res, next) {
    res.send('respond with a resource zhangsan')
})

module.exports = router
