/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-07-21 10:26:03
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-21 15:06:17
 */
const express = require('express')
const router = express.Router()
const xlsx = require('xlsx')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

let resultShow = null
router.get('/upload', (req, res) => {
    res.render('upload/index.ejs', { result: resultShow })
})

router.post('/upload', upload.any(), (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        res.error('请选择文件上传')
        return res.redirect('back')
    }
    const { originalname, buffer } = req.files[0]
    if (!originalname.endsWith('xls') && !originalname.endsWith('xlsx')) {
        res.error('请上传xls或xlsx格式的文件')
        return res.redirect('back')
    }
    // 解析excel文件
    const workbook = xlsx.read(buffer, { type: "buffer" }) // 返回 ['sheet1', 'sheet2']
    const data = parseExcel(workbook)
    const { first, second } = req.body
    const result = completeCol(data, first, second)
    resultShow = { result, originalname, removeRes: () => { resultShow = null } }
    return res.redirect('back')
})

function parseExcel (workbook) {
    const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
    const list = sheetNames.map(item => {
        const worksheet = workbook.Sheets[item]
        return xlsx.utils.sheet_to_json(worksheet)
    })
    const obj = {}
    list.map(item => {
        item.forEach(it => {
            for (let key in it) {
                if (obj[key]) {
                    obj[key].push(it[key])
                } else {
                    obj[key] = []
                    obj[key].push(it[key])
                }
            }
        })
    })
    return obj
}

function completeCol (obj, col1, col2) {
    let result = []
    obj[col1].forEach((item, index) => {
        if (item !== obj[col2][index]) {
            result.push(`${col1}与${col2},第${index + 2}行不一致！`)
        }
    })
    return result
}
module.exports = router