import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Helpers = {
  hassPassword: async pass => {
    const saltRounds = 10;
    return await bcrypt.hash(pass, saltRounds);
  },
  passwordIsValid: async (passPassed, passInDB) => {
    return await bcrypt.compare(passPassed, passInDB);
  },
  generateToken: userId => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7 days"
    });
    return token;
  },
  setCookie: (context, token) => {
    context.res.cookie("token", token, {
      httpOnly: true,
      maxAge: 604800
    });
  },
  getUserId: context => {
    const { token } = context.req.cookies;
    if (!token) {
      throw Error("You must be authenticated!");
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);

    return user.userId;
  }
};

export default Helpers;
