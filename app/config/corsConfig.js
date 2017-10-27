exports.config = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", " Content-Type, auth-token");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
}
