import Link from 'next/link';
import ALBUMS_QUERY from '../pages/api/ALBUMS_QUERY';
import { useQuery } from '@apollo/react-hooks';
import withApollo from './api/withApollo';

const Index = () => {
  const { loading, data } = useQuery(ALBUMS_QUERY);

  if (loading || !data) return <p>Carregando...</p>

  const { albums } = data;

  return (
    <div>
      <header>
        <Link href="/about">
          <a>about</a>
        </Link>
      </header>
      <div>
        {
          albums.map(album => (
            <h2>{album.name}</h2>
          ))
        }
      </div>
    </div>
  )
}

export default withApollo(Index);