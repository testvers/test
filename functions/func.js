const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

const client = new faunadb.Client({ secret: process.env.FAUNA });

const typeDefs = gql`
  type Query {
    switch: String!
  }
  type Mutation {
    flipSwtich(status: Boolean!): Boolean!
  }
`;

const resolvers = {
  Query: {
    switch: async (parent, args, context) => {
      console.log("context");
        const results = await client.query(
            q.Get(q.Ref("307251878625804359"))
        )
        console.log(results);
        return 'hi';
    }
  },
  Mutation: {
    flipSwtich: async (_, {status}) => {
        const results = await client.query(
            q.Update(q.Ref(q.Collection("switcher", "307251878625804359"),{
                data: {status}
            }))
        )
        return results.data.status;
    }
  },
};

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ context }) => {
//     if (context.clientContext.user) {
//       return { user: context.clientContext.user.sub };
//     } else {
//       return {};
//     }
//   },
// });


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// exports.handler = server.createHandler();
exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});