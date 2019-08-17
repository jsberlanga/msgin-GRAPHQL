export default {
  Message: {
    author(parent, args, context) {
      return context.prisma.createMessage({ id: parent.id }).author();
    }
  }
};
