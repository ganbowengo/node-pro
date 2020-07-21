/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-07-20 14:44:20
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-20 15:00:38
 */

module.exports = (req, res, next) => {
    let nullAuth = ['/users/login']
    if (req.session.uid || nullAuth.indexOf(req.originalUrl) > -1) {
        next()
    } else {
        res.redirect('/users/login')
    }
}