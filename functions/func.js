const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

const client = new faunadb.Client({ secret: process.env.FAUNA });

const typeDefs = gql`
  type Query {
    switch: [Switched]!
  }
  type Switched {
    status: Boolean!
  }
  type Mutation {
    flipSwtich: Switched!
  }
`;

const resolvers = {
  Query: {
    switch: async (parent, args) => {
        const results = await client.query(
            q.Get(q.Ref(q.collection("switcher", '307131765957328968')))
        )
        return results.data;
    }
  },
  Mutation: {
    flipSwtich: async (_) => {
        const results = await client.query(
            q.update(q.Ref(q.collection("switcher"),{
                data: {status: status? false: true}
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

exports.handler = server.createHandler();
// exports.handler = server.createHandler({
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });