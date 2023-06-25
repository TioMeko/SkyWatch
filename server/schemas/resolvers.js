const { User, Search } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({}).populate("searches");
      return users;
    },
    user: async (parent, { email }) => {
      const user = await User.findOne({ email }).populate("searches");
      return user;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !await user.isCorrectPassword(password)) {
        throw new AuthenticationError("Error: Wrong email or password");
      }

      const token = signToken(user);
      console.log(`${user.email} has successfully logged in!`)

      return { token, user };
    },
    addSearch: async (parent, { city, state, country, email }) => {
      const search = await Search.create({ city, state, country });
      await User.findOneAndUpdate(
        { email: email },
        { $push: { searches: search._id } },
        { new: true }
      );
      return search;
    },
     deleteSearch: async (parent, { searchId }) => {
      const deletedSearch = await Search.findByIdAndDelete(searchId);
    
      if (!deletedSearch) {
        throw new Error("Search not found");
      }
    
      return deletedSearch;
    }
  }
};

module.exports = resolvers;
