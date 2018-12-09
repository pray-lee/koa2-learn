const fn = function (ctx) {
  ctx.session.count++
}
module.exports = function () {
  return async function (ctx, next) {
    // 剥洋葱执行方式, 每个中间件执行完成，
    fn(ctx)
    await next()
  }
}
