import { ApolloServer, gql } from 'apollo-server-micro';
import Knex from 'knex';
import Dataloader from 'dataloader';

const db = new Knex({
  client: "pg",
  connection: {
      host : '127.0.0.1',
      user : 'beniciodanielbarreto',
      password : '',
      database : 'next-graphql'
    },
})

const typeDefs = gql`
  type Query {
    albums(first: Int = 25, skip: Int = 0): [Album!]!
  }

  type Album {
    id: ID!
    name: String!
    year: String!
    artist: Artist!
  }

  type Artist {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    albums: (_parent, args, _context) => {
      return db
        .select("*")
        .from("albums")
        .orderBy("year", "asc")
        .limit(Math.min(args.first, 50))
        .offset(args.skip);
    }
  },

  Album: {
    id: (album, _args, _context) => album.id,
    artist: (album, _args, { loader }) => {
      // return db
      //   .select("*")
      //   .from("artists")
      //   .where({ id: album.artist_id })
      //   .first();
      return loader.artist.load(album.artist_id);
    }
  },

  Artist: {
    id: (artist, _args, _context) => artist.id
  }
};

const loader = {
  artist: new Dataloader(ids => {
    return db
      .select("*")
      .from("artists")
      .whereIn("id", ids)
      .then(rows => ids.map(id => rows.find(row => row.id === id)));
  })
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { loader }
  }
});

const handler = apolloServer.createHandler({
  path: "/api/graphql"
});

export default handler; //deal with req and response

export const config = {
  api: {
    bodyParser: false // necessary to work fine in next
  }
}
