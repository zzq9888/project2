const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const session = require('express-session')
const fs = require('fs')
const path = require('path')

//创建服务器
const app = express()

//配置cors解决跨域
app.use(cors())

//配置session中间件
app.use(
  session({
    secret: 'zzq',
    resave: false,
    saveUninitialized: true
  })
)

// axios的请求拦截器里加上token config.headers.Authorization =“Bearer token”

//解析body表单数据的中间件 解析json格式的数据 如果不配置解析表单的中间件  req.body默认等于undefined
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static('./page'))

app.post('/api/login', (req, res) => {
  if (req.body.username == 'admin' && req.body.password == 123456) {
    req.session.name = req.body.username
    req.session.password = req.body.password
    res.send({ status: 0, msg: '登录成功' })
  }
})

app.get('/api/getusername', (req, res) => {
  if (req.session.name == 'admin') {
    res.send({ status: 0, msg: '已登陆' })
  } else {
    res.send({ status: 1, msg: '未登陆' })
  }
})

app.post('/api/logout', (req, res) => {
  req.session.destroy()
  res.send({
    status: 0,
    msg: '退出登录'
  })
})

//添加一个路由测试git合并分支
app.get('/zzq', (req, res) => {
  res.send({
    name: 'zzq',
    age: 25
  })
})

//在主分支上修改
app.get('/xiugai', (req, res) => {
  res.send('主分支的修改')
})

//在logout上的修改
// app.get('/api666', (req, res) => {
//   res.send('logout分支上的修改')
// })

app.listen(80, function () {
  console.log('Express server running at http://127.0.0.1:80')
})
