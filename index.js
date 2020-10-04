const { ApolloServer } = require("apollo-server");
const Feed = require("rss-to-json");
const fs = require("fs", "utf8");

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const resolvers = {
  Query: {
    rss: async (_, { page }) => {
      var rss = await Feed.load(
        `https://rss.nytimes.com/services/xml/rss/nyt/${
          page === "SundayReview" ? "Sunday-Review" : page || "HomePage"
        }.xml`
      );
      return rss.items;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen({
    port: process.env.PORT || 4000,
  })
  .then(({ url }) => {
    console.log(`🚀  Server is running!
📭  Query at https://studio.apollographql.com/dev
🔉  Listening at ${url}`);
  });
