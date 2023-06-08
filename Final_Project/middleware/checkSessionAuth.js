async function checkSessionAuth(req, res, next) {
  console.log("from session auth middleware", req.session.user);
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

module.exports = checkSessionAuth;
