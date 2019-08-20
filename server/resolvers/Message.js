export default {
  Message: {
    author: (parent, args, context) => {
      return context.prisma.message({ id: parent.id }).author();
    },
    comments: (parent, args, context) => {
      return context.prisma.message({ id: parent.id }).comments();
    }
  }
};
