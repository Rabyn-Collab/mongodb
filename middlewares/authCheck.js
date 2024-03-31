const jwt = require('jsonwebtoken');


module.exports.authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decode = jwt.decode(token, 'jwtsecret');
    if (!decode) return res.status(401).json({ status: 'error', message: 'you are not authorised' });
    req.userId = decode.id;
    next();
  } else {
    return res.status(401).json({
      status: 'error',
      message: 'you are not authorised'
    });
  }


}