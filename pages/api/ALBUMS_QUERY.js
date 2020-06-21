import gql from 'graphql-tag';

const ALBUMS_QUERY = gql`
  query Albums {
    albums {
      id
      name
    }
  }
`;

export default ALBUMS_QUERY;