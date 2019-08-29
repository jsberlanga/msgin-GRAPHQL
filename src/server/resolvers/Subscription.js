const commentAddedSubscribe = (parent, args, context) => {
  return context.prisma.$subscribe
    .comment({
      mutation_in: ["CREATED"]
    })
    .node();
};

export default {
  Subscription: {
    commentAdded: {
      subscribe: commentAddedSubscribe,
      resolve: payload => {
        return payload;
      }
    }
  }
};
