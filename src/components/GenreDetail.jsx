// GenreDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para acceder a los parámetros de la URL
import { getAccessToken } from '../helpers/auth';

const GenreDetailPage = () => {
  const { genreName } = useParams(); // Obtiene el nombre del género de la URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {
        const accessToken = await getAccessToken();

        // Realizamos el fetch de artistas para obtener los artistas más populares de ese género
        const response = await fetch(`https://api.spotify.com/v1/search?q=${genreName}&type=artist&limit=50`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();

        if (data.artists && data.artists.items.length > 0) {
          // Filtramos y ordenamos por popularidad
          const artistsWithPopularity = data.artists.items
            .filter(artist => artist.popularity > 0) // Filtrar artistas con popularidad
            .sort((a, b) => b.popularity - a.popularity) // Ordenamos por popularidad descendente

          // Solo tomamos los 10 más populares
          setTopArtists(artistsWithPopularity.slice(0, 10));
        } else {
          setError('No se encontraron artistas para este género.');
        }

        setLoading(false);
      } catch (error) {
        setError(error, 'Error al cargar los detalles del género');
        setLoading(false);
      }
    };

    fetchGenreDetails();
  }, [genreName]);

  if (loading) {
    return <p>Cargando detalles del género...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Top 10 artistas de {genreName}</h1>
      {topArtists.length > 0 ? (
        <div className="artists-list">
          {topArtists.map((artist, index) => (
            <div key={index} className="artist-item">
              <h3>{artist.name}</h3>
              <p>Popularidad: {artist.popularity}</p>
              <p>Géneros: {artist.genres.join(', ')}</p>
              <img src={artist.images[0]?.url} alt={artist.name} width="100" />
              <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">Ver en Spotify</a>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron artistas populares para este género.</p>
      )}
    </div>
  );
};

export default GenreDetailPage;
