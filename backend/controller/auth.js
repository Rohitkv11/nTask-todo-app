import User from "../model/user.js";
import generateToken from "../utils/generateToken.js";
import CryptoJS from "crypto-js";

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ status:false, error: "wrong email" });
    } else {
      let hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        "secret key 123"
      );
      console.log(hashedPassword);
      const PassCode = hashedPassword.toString(CryptoJS.enc.Utf8);
      console.log(PassCode);

      const { password, ...others } = user._doc;
      if (PassCode != req.body.password) {
        res.status(200).json({ status:false, error: "wrong email" });
      }
      const token = generateToken(user._id);
      res.status(200).json({ ...others, token, created: true });
    }
  } catch (error) {
    return  res.status(500).json(error);
  }
};

export default signin;
