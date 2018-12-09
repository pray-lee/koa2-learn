const fn = function () {
  console.log('middleware  test...')
}
module.exports = function () {
  return async function (ctx, next) {
    // 剥洋葱执行方式
    fn()
    await next()
  }
}
