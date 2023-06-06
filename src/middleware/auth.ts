import jwt from "jsonwebtoken";

const jwtSecretKey: any = process.env.JWT_SECRET_KEY ?? null;

const auth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).send({
        status: false,
        message: "Access denied !",
      });
    }

    jwt.verify(token, jwtSecretKey);

    next();
  } catch (error) {
    return res.status(400).send({
      status: false,
      message: "Invalid token !",
    });
  }
};

export default auth;
