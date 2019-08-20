import Helpers from "../lib/utils/helpers";

export default {
  Mutation: {
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
    deleteUser: async (parent, { id }, context) => {
      await context.prisma.deleteUser({ id });
      return {
        message: `The user with id: ${id} has been successfully deleted.`
      };
    },
    deleteAllUsers: async (parent, args, context) => {
      // access to only ADMIN
      await context.prisma.deleteManyUsers();
      return {
        message: `All the users have been successfully deleted.`
      };
    },
    createMessage: async (parent, { title }, context) => {
      const user = Helpers.getUserId(context);
      console.log(user);
      const email = "test@test.com";
      return await context.prisma.createMessage({
        title,
        author: {
          connect: {
            email
          }
        }
      });
    }
  }
};
