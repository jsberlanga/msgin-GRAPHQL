export default {
  Query: {
    getUser: async (parent, { id }, context) => {
      return await context.prisma.user({ id });
    },
    getUsers: async (parent, args, context) => {
      return await context.prisma.users();
    },
    getMessages: async (parent, args, context) => {
      return await context.prisma.messages();
    }
  }
};
