import Helpers from "../utils/helpers";

export default {
  Mutation: {
    signup: async (parent, args, context, info) => {
      const isRegistered = await context.prisma.user({ email: args.email });
      if (isRegistered) {
        throw Error("User already exists in the database");
      }
      const password = await Helpers.hassPassword(args.password);
      const user = await context.prisma.createUser({ ...args, password });
      const token = "string";

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
    createMessage: async (parent, { title }, context) => {
      return await context.prisma.createMessage({
        title
      });
    }
  }
};
