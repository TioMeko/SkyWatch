const { User, Search } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
      users: async () => {
        const users = await User.find({}).populate("searches");
        return users;
      },
      user: async (parent, { username }) => {
        const user = await User.findOne({ username })
          .populate("searches")
        return user;
      },
    },
};

module.exports = resolvers;