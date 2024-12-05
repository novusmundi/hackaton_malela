// ArtistCatalog.jsx
import  { useState, useEffect } from 'react';
import { fetchArtists } from '../hooks/useArtist';

const ArtistCatalog = () => {
  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        setLoading(true);
        const artistsData = await fetchArtists(query);
        setArtists(artistsData);
        setLoading(false);
      };

      fetchData();
    }
  }, [query]);

  return (
    <div>
      <h1>Catálogo de Artistas</h1>
      <input
        type="text"
        placeholder="Buscar artista"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          {artists.length > 0 ? (
            artists.map((artist) => (
              <div key={artist.id}>
                <img src={artist.images[0]?.url} alt={artist.name} width={100} />
                <p>{artist.name}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron artistas</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArtistCatalog;
