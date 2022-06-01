import { IResolvers } from "mercurius";
import { api } from "./api";
import { Config } from "./config";

export const resolvers: IResolvers = {
  Query: {
    users: async () => {
      const users = await api({
        url: `${Config.USERS_URI}/users`,
        method: "GET",
        body: null,
      });
      return users;
    },
  },
  Mutation: {
    createUser: async (_, args: { email: string; password: string }) => {
      const { email, password } = args;
      const user = await api({
        url: `${Config.USERS_URI}/users`,
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      return user;
    },
  },
};
