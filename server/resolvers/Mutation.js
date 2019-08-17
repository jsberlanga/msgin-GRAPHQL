export default {
  Mutation: {
    signup: async (parent, { name }, context, info) => {
      return await context.prisma.createUser({ name });
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
