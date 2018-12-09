const router = require('koa-router')()
const Person = require('../dbs/model/person')

//创建redis客户端
const Redis = require('koa-redis')
const Store = new Redis().client

// 给路由加前缀
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

//
router.get('/fix', async (ctx, next) => {
  await Store.hset('fix', 'name', Math.random())
  ctx.body = {
    code: 0,
    result: 'set redis key-value success'
  }
})

//测试mongodb数据库接口, 写数据,使用的是新增的person实例
router.post('/addPerson', async function (ctx, next) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    await person.save()
    code = 0
  } catch (e) {
    code = -1
  }
  ctx.body = {
    code
  }
})

// mongodb 读数据, 使用Person的静态方法
router.post('/getPerson', async (ctx, next) => {
  const result = await Person.findOne({name: ctx.request.body.name})
  const results = await Person.find({name: ctx.request.body.name})
  ctx.body = {
    code: 0,
    result,
    results
  }
})

//mongodb 修改数据
router.post('/updatePerson', async (ctx, next) => {
  console.log(Person.where({name: ctx.request.body.name}))
  await Person.where({
    name: ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  })
  ctx.body = {
    code: 0,
    result:"update success"
  }
})

// mongodb 删除数据
router.post('/removePerson', async (ctx, next) => {
  await Person.where({
    name: ctx.request.body.name
  }).remove()

  ctx.body = {
  code: 0,
  result:"remove success"
  }
})
module.exports = router
