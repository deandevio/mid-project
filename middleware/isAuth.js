import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({ status: `failed, a token is required for authentication` });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    return res.status(401).json({ status: `failed, invalid token` });
  }
  next();
};

const createToken = (id) => {
  return jwt.sign(
    {
      user_id: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

export { verifyToken, createToken };
