const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).send({
        status: false,
        message: "Access denied !",
      });
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    jwt.verify(token, jwtSecretKey);

    next();
  } catch (error) {
    return res.status(400).send({
      status: false,
      message: "Invalid token !",
    });
  }
};
