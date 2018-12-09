const fn = function () {
  console.log('middleware  test...')
}
module.exports = function () {
  return async function (ctx, next) {
    // 剥洋葱执行方式, 每个中间件执行完成，
    fn()
    await next()
  }
}
