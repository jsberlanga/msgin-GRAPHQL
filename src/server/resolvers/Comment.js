export default {
  Comment: {
    postedBy: (parent, args, context) => {
      return context.prisma.comment({ id: parent.id }).postedBy();
    },
    message: (parent, args, context) => {
      return context.prisma.comment({ id: parent.id }).message();
    }
  }
};
