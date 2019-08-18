import Helpers from "../utils/helpers";

export default {
  Mutation: {
    signup: async (parent, args, context, info) => {
      const user = await context.prisma.user({ email: args.email });
      if (user) {
        throw Error("User already exists in the database");
      }
      const password = await Helpers.hassPassword(args.password);
      return await context.prisma.createUser({ ...args, password });
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
