const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

const client = new faunadb.Client({ 
domain: 'db.us.fauna.com',
scheme: 'https',
secret: process.env.FAUNA
});

const typeDefs = gql`
  type Query {
    switch: Switched!
  }
  type Switched {
    status: Boolean!
  }
  type Mutation {
    flipSwtich(status: Boolean!): Switched!
  }
`;

const resolvers = {
  Query: {
    switch: async (parent, args, context) => {
        const results = await client.query(
            q.Get(q.Ref(q.Collection("switcher"), "307251878625804359"))
        )
        return results.data;
    },
  },
  Mutation: {
    flipSwtich: async (_, {status}) => {
        const results = await client.query(
            q.Update(q.Ref(q.Collection("switcher"), "307251878625804359"),{
                data: {status}
            })
        )
        return results.data;
    },
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
