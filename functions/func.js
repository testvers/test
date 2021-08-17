const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;
require("dotenv").config();

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

const typeDefs = gql`
  type Query {
    status: [Switch]!
  }
  type Switch {
    switch: Boolean!
  }
  type Mutation {

  }
`;

const resolvers = {
  Query: {
    // status: async (parent, args, { user }) => {
    //   if (!user) {
    //     return [];
    //   } else {
    //     const results = await client.query(
    //       q.Paginate(q.Match(q.Index("todo_list"), user))
    //     );
    //     return results.data.map(([ref, task, status, date]) => {
    //       return {
    //         id: ref.id,
    //         task,
    //         status,
    //         date,
    //       };
    //     });
    //   }
    // },
  },
  Mutation: {
    // checkTodo: async (_, { id, status }, { user }) => {
    //   if (!user) {
    //     throw new Error("Must be authenticated to add todos");
    //   }
    //   const results = await client.query(
    //     q.Update(q.Ref(q.Collection("switch"), id), {
    //       data: {
    //         status
    //       },
    //     })
    //   );
    //   return {
    //     ...results.data,
    //     id: results.ref.id,
    //   };
    // },
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
