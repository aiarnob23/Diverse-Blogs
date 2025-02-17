import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: String },
  secret: string,
  expiresIn: string
) => {
  let token = jwt.sign(jwtPayload, secret, { expiresIn });
  return `Bearer ${token}`;
};