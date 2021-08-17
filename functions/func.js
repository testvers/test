const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

const client = new faunadb.Client({ secret: process.env.FAUNA });

const typeDefs = gql`
  type Query {
    status: [Switch]!
  }
  type Switch {
    status: Boolean!
  }
  type Mutation {

  }
`;

const resolvers = {
  Query: {
    // status: async (parent, args, { user }) => {
    //     const results = await client.query(
    //       q.Paginate(q.Match(q.Index("todo_list"), user))
    //     );
    // },
    switch: async (parent, args) => {
        const results = await client.query(
            q.paginate()
        )
    }
  },
  Mutation: {
    filpSwtich: async (_) => {
        const results = await client.query(
            q.update(q.Ref(q.collection("switcher"),{
                status: status!
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
