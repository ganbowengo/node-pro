/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-07-17 17:48:54
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-17 18:38:34
 */
function message (req) {
    return (msg, type) => {
        type = type || 'info'
        let sess = req.session
        sess.messages = sess.messages || []
        sess.messages.push({ type: type, string: msg })
    }
}

module.exports = (req, res, next) => {
    res.message = message(req)
    res.error = msg => {
        return res.message(msg, 'error')
    }
    res.locals.messages = req.session.messages || []
    res.locals.removeMessages = () => { req.session.messages = [] }
    next()
}