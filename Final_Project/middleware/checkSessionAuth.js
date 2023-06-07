async function checkSessionAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}
module.exports = checkSessionAuth;
