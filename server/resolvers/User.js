export default {
  User: {
    messages: (parent, args, context) => {
      return context.prisma.user({ id: parent.id }).messages();
    },
    comments: (parent, args, context) => {
      return context.prisma.user({ id: parent.id }).comments();
    }
  }
};
