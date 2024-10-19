import jwt from "jsonwebtoken";

const SECRET_KEY = "AAAAàèé832AAZEAZEZEFDFODJFODF";  

export const generateToken = (email: string) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
