const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

const client = new faunadb.Client({ secret: process.env.FAUNA });

const typeDefs = gql`
  type Query {
    swit: Switched!
  }
  typw Switched {
    switch: Boolean!
  }
  type Mutation {
    flipSwitch: Boolean!
  }
`;

const resolvers = {
  Query: {
    swit: async (parent, args) => {
        const results = await client.query(
            q.Get(q.Ref(q.collection("switcher", '307131765957328968')))
        )
        return results.data.status;
    }
  },
  Mutation: {
    filpSwtich: async (_) => {
        const results = await client.query(
            q.update(q.Ref(q.collection("switcher"),{
                data: {status: status? false: true}
            }))
        )
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    } else {
      return {};
    }
  },
});
exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
