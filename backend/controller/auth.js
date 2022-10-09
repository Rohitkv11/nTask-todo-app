import User from "../model/user.js";
import generateToken from "../utils/generateToken.js";
import CryptoJS from "crypto-js";

//user signin
const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ status: false, error: "wrong email" });
    } else {
      let hashedPassword = CryptoJS.AES.decrypt(                    //password hashing
        user.password,
        "secret key 123"
      );

      const PassCode = hashedPassword.toString(CryptoJS.enc.Utf8);

      const { password, ...others } = user._doc;
      if (PassCode != req.body.password) {
        res.status(200).json({ status: false, error: "wrong email" });
      }
      const token = generateToken(user._id, user.username);       //jwt token generating
      res.status(200).json({ ...others, token, created: true });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default signin;
