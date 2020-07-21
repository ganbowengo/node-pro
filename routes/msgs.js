/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-07-16 11:14:13
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-21 10:26:24
 */
const express = require('express')
const router = express.Router()
const Entry = require('../models/entry')
const validate = require('../middleware/validate')

router.get('/', function (req, res, next) {
    res.render('post.ejs', { title: 'post' })
})

router.get('/list', function (req, res, next) {
    Entry.getRange(0, -1, (err, entries) => {
        if (err) return next(err)
        res.render('entries.ejs', { title: 'IsList', entries: entries })
    })
})

router.post('/post', validate.required('entry[title]'), function (req, res, next) {
    const data = req.body.entry
    const user = res.locals.user || {}
    const userName = user.name || null
    const entry = new Entry({ username: userName, title: data.title, body: data.body })
    entry.save(err => {
        if (err) return next(err)
        res.redirect('back')
    })
})

module.exports = router;
