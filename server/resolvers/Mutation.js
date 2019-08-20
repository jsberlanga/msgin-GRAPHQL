import Helpers from "../lib/utils/helpers";

export default {
  Mutation: {
    // USER MUTATIONS
    signup: async (parent, args, context, info) => {
      const isRegistered = await context.prisma.user({ email: args.email });
      if (isRegistered) {
        throw Error("User already exists in the database");
      }
      const password = await Helpers.hassPassword(args.password);
      const user = await context.prisma.createUser({ ...args, password });
      const token = Helpers.generateToken(user.id);

      Helpers.setCookie(context, token);

      return {
        token,
        user
      };
    },
    signin: async (parent, { email, password }, context) => {
      const user = await context.prisma.user({ email });
      if (!user) {
        throw Error("User not found");
      }
      const isValid = await Helpers.passwordIsValid(password, user.password);

      if (!isValid) {
        throw Error("Password is incorrect!");
      }

      const token = Helpers.generateToken(user.id);

      Helpers.setCookie(context, token);

      return {
        token,
        user
      };
    },
    signout: async (parent, args, context) => {
      await context.res.clearCookie("token");
      return {
        message: "Bye"
      };
    },
    deleteUser: async (parent, { id }, context) => {
      await context.prisma.deleteUser({ id });
      return {
        message: `The user with id: ${id} has been successfully deleted.`
      };
    },
    // MESSAGE MUTATIONS
    createMessage: async (parent, { title }, context) => {
      const userId = Helpers.getUserId(context);
      if (!userId) {
        throw Error("You must be authenticated!");
      }
      const user = await context.prisma.user({ id: userId });
      if (!userId || !user) {
        throw Error("You must be authenticated!");
      }
      const email = user.email;
      return await context.prisma.createMessage({
        title,
        author: {
          connect: {
            email
          }
        }
      });
    },
    // ONLY ADMIN ACCESS
    deleteAllUsers: async (parent, args, context) => {
      await context.prisma.deleteManyUsers();
      return {
        message: `All the users have been successfully deleted.`
      };
    },
    deleteAllMessages: async (parent, args, context) => {
      await context.prisma.deleteManyMessages();
      return {
        message: `All the messages have been successfully deleted.`
      };
    }
  }
};
