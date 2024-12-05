// ArtistDetail.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtistDetail } from '../hooks/useArtist';

const ArtistDetail = () => {
  const { artistId } = useParams(); 
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const artistData = await fetchArtistDetail(artistId);
      setArtist(artistData);
    };

    fetchDetail();
  }, [artistId]);

  if (!artist) {
    return <p>Cargando detalles del artista...</p>;
  }

  return (
    <div>
      <h1>{artist.name}</h1>
      <img src={artist.images[0]?.url} alt={artist.name} width={200} />
      <p><strong>Género:</strong> {artist.genres.join(', ')}</p>
      <p><strong>Popularidad:</strong> {artist.popularity}</p>
      <p>{artist.biography || 'No hay biografía disponible.'}</p>
      <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer">Ver en Spotify</a>
    </div>
  );
};

export default ArtistDetail;
