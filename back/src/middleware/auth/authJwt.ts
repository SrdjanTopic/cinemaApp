import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config";
import { ROLE } from "../../models/Role";

const generateAccessToken = (
  username: string,
  email: string,
  role: string
): string => {
  return jwt.sign(
    { username: username, email: email, role: role },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

const authorizeToken = (roles: ROLE[]) => {
  return (req: any, res: any, next: any) => {
    if (roles.includes(req.user.role)) return next();
    return res.status(403).send("Forbidden");
  };
};

const auth = {
  generateAccessToken,
  authenticateToken,
  authorizeToken,
};

export default auth;
