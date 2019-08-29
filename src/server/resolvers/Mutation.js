import Helpers from "../lib/utils/helpers";
import { randomBytes } from "crypto";

const postmark = require("postmark");
const client = new postmark.ServerClient(
  "dd2d13aa-605a-4407-80ea-67ffd9c19e9c"
);

export default {
  Mutation: {
    // USER MUTATIONS
    signup: async (parent, args, context) => {
      const isRegistered = await context.prisma.user({
        email: args.email,
      });
      if (isRegistered) {
        throw Error("User already exists in the database");
      }
      const password = await Helpers.hassPassword(args.password);
      const user = await context.prisma.createUser({ ...args, password });
      const token = Helpers.generateToken(user.id);

      Helpers.setCookie(context, token);

      return {
        token,
        user,
      };
    },
    signin: async (parent, { email, password }, context) => {
      const user = await context.prisma.user({ email });
      if (!user) {
        throw Error("User not found");
      }
      const isValid = await Helpers.passwordIsValid(password, user.password);

      if (!isValid) {
        throw Error("Password is incorrect!");
      }

      const token = Helpers.generateToken(user.id);

      Helpers.setCookie(context, token);

      return {
        token,
        user,
      };
    },
    signout: (parent, args, context) => {
      context.res.clearCookie("token");
      return {
        message: "Bye",
      };
    },
    deleteUser: async (parent, { id }, context) => {
      await context.prisma.deleteUser({ id });
      return {
        message: `The user with id: ${id} has been successfully deleted.`,
      };
    },
    requestPasswordReset: async (parent, { email }, context) => {
      const user = await context.prisma.user({ email });
      if (!user) {
        throw new Error("This email address does not exist.");
      }

      const resetToken = randomBytes(20).toString("hex");
      const resetTokenExpiry = String(Date.now() + 3600000);

      const updatedUser = await context.prisma.updateUser({
        where: {
          email,
        },
        data: {
          resetToken,
          resetTokenExpiry,
        },
      });

      const url = `${process.env.FRONTEND_URL}/reset/resetToken=${resetToken}`;

      client.sendEmailWithTemplate({
        From: "hi@juliosoto.dev",
        To: email,
        TemplateAlias: "password-reset",
        TemplateModel: {
          name: user.name,
          action_url: url,
        },
      });

      return {
        message: "Email sent. Please check your mailbox.",
      };
    },
    passwordReset: async (
      parent,
      { password, resetToken, resetTokenExpiry },
      context
    ) => {
      const user = await context.prisma.user({ resetToken });
      if (!user) {
        throw new Error("User was not found!.");
      }

      const compareExpiration =
        parseFloat(user.resetTokenExpiry) - parseFloat(resetTokenExpiry);

      if (compareExpiration < 0) {
        throw new Error("Your token has expired. Please request a new token.");
      }

      const hassedPassword = await Helpers.hassPassword(password);

      await context.prisma.updateUser({
        where: { resetToken },
        data: {
          password: hassedPassword,
          resetToken: "",
          resetTokenExpiry: "",
        },
      });

      return {
        message: `Your Password has been reset. Please login now.`,
      };
    },
    // MESSAGE MUTATIONS
    createMessage: async (parent, { title, body }, context) => {
      const userId = Helpers.getUserId(context);
      if (!userId) {
        throw Error("You must be authenticated!");
      }
      const user = await context.prisma.user({ id: userId });
      if (!userId || !user) {
        throw Error("You must be authenticated!");
      }
      const email = user.email;
      return await context.prisma.createMessage({
        title,
        body,
        author: {
          connect: {
            email,
          },
        },
      });
    },

    // COMMENTS MUTATIONS
    createComment: async (parent, { text, messageId }, context) => {
      const userId = Helpers.getUserId(context);

      const comment = await context.prisma.createComment({
        text,
        postedBy: {
          connect: {
            id: userId,
          },
        },
        message: {
          connect: {
            id: messageId,
          },
        },
      });

      return comment;
    },

    // ONLY ADMIN ACCESS
    deleteAllUsers: async (parent, args, context) => {
      await context.prisma.deleteManyUsers();
      return {
        message: `All the users have been successfully deleted.`,
      };
    },
    deleteAllMessages: async (parent, args, context) => {
      await context.prisma.deleteManyMessages();
      return {
        message: `All the messages have been successfully deleted.`,
      };
    },
  },
};
