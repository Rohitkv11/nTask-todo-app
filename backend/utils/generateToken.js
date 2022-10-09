import jwt from "jsonwebtoken";
//jwt token generate
const generateToken = (id,user) =>
  jwt.sign({ id , user }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

export default generateToken;
