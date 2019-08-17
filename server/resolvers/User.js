export default {
  User: {
    messages(parent, args, context) {
      return context.prisma.user({ id: parent.id }).messages();
    }
  }
};
