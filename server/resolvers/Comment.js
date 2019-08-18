export default {
  Comment: {
    postedBy: (parent, args, context) => {
      return context.prisma.comment({ id: args.id }).user();
    }
  }
};
