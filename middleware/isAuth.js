import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      res.redirect("/login");
    } else {
      console.log(decodedToken);
      next();
    }
  });
  if (token) {
  } else {
    res.redirect("/login");
  }
};

export { verifyToken };
