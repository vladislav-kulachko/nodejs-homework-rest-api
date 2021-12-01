const controllersWrapper = controller => {
  const middleware = async (req, res, next) => {
    try {
      await controller(req, res, next)
    } catch (err) {
      next(err)
    }
  }
  return middleware
}
module.exports = controllersWrapper
