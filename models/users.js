/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-07-17 15:19:53
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-17 17:24:05
 */
const redis = require('redis')
const bcrypt = require('bcrypt')
const db = redis.createClient()

class User {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key]
        }
    }

    save (cb) {
        if (this.id) {
            this.update(cb)
        } else {
            db.incr('users:ids', (err, id) => {
                if (err) return cb(err)
                this.id = id
                this.hashPassword(err => {
                    if (err) return cb(err)
                    this.update(cb)
                })
            })
        }
    }

    update (cb) {
        const id = this.id
        db.set(`user:id:${this.name}`, id, err => {
            if (err) return cb(err)
            db.hmset(`user:${id}`, this, err => {
                cb(err)
            })
        })
    }

    hashPassword (cb) {
        // 生成12位的盐
        bcrypt.genSalt(12, (err, salt) => {
            if (err) return cb(err)
            // 保存salt
            this.salt = salt
            // 12位的盐与密码做hash处理
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if (err) return cb(err)
                // 保存salt后的值
                this.pass = hash
                cb()
            })
        })
    }

    static auth (name, pass, cb) {
        User.getByName(name, (err, user) => {
            if (err) return cb(err)
            if (!user.id) return cb()
            // 利用已保存salt + 输入pass 做hash
            bcrypt.hash(pass, user.salt, (err, hash) => {
                if (err) return cb(err)
                // 比较处理后的hash和设置hash 是否相同
                if (hash === user.pass) return cb(null, user)
                cb()
            })
        })
    }

    static getByName (name, cb) {
        User.getId(name, (err, id) => {
            if (err) return cb(err)
            User.get(id, cb)
        })
    }

    static getId (name, cb) {
        db.get(`user:id:${name}`, cb)
    }

    static get (id, cb) {
        db.hgetall(`user:${id}`, (err, user) => {
            if (err) return cb(err)
            cb(null, new User(user))
        })
    }
}

module.exports = User
