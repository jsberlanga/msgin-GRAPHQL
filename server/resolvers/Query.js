import Helpers from "../lib/utils/helpers";

export default {
  Query: {
    me: async (parent, args, context) => {
      if (!context.req.userId) {
        return null;
      }
      const user = await context.prisma.user({ id: context.req.userId });
      return user;
    },
    getUser: async (parent, { id }, context) => {
      return await context.prisma.user({ id });
    },
    getUsers: async (parent, args, context) => {
      return await context.prisma.users();
    },
    getMessages: async (parent, args, context) => {
      return await context.prisma.messages();
    },
    getMessage: async (parent, { id }, context) => {
      return await context.prisma.message({ id });
    },
    getComments: async (parent, args, context) => {
      return await context.prisma.comments();
    }
  }
};
