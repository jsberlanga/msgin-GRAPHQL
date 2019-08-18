import bcrypt from "bcrypt";

const Helpers = {
  hassPassword: async pass => {
    const saltRounds = 10;
    return await bcrypt.hash(pass, saltRounds);
  }
};

export default Helpers;
