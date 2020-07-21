/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-07-16 17:59:57
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-20 11:05:26
 */
function parseField (field) {
    return field.split(/\[|\]/).filter(s => s)
}

function getFeild (req, field) {
    let val = req.body
    field.forEach(key => {
        val = val[key]
    })
    return val
}

exports.required = field => {
    field = parseField(field)
    return (req, res, next) => {
        if (getFeild(req, field)) {
            next()
        } else {
            res.error(`${field.join('.')} is required`)
            res.redirect('back')
        }
    }
}