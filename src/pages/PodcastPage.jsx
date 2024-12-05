// PodcastPage.jsx
import { useState } from 'react';
import usePodcasts from '../hooks/useEpisodes';
import { Link } from 'react-router-dom'; 
const PodcastPage = () => {
  const [query, setQuery] = useState('');
  const { podcasts, loading, error } = usePodcasts(query);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h1>Buscar Podcasts</h1>
      <input
        type="text"
        placeholder="Busca un podcast"
        value={query}
        onChange={handleInputChange}
      />

      {loading && <p>Cargando podcasts...</p>}
      {error && <p>{error}</p>}

      <div>
        {podcasts.length > 0 ? (
          <ul>
            {podcasts.map((podcast) => (
              <div key={podcast.id}>
                <h3>{podcast.name}</h3>
                {podcast.images && podcast.images[0] && (
                  <img
                    src={podcast.images[0].url}
                    alt={podcast.name}
                    style={{ width: '150px', height: '150px' }}
                  />
                )}
                <br />
                <Link to={`/podcast/${podcast.id}`}>Ver detalles</Link>
              </div>
            ))}
          </ul>
        ) : (
          <p>No se encontraron podcasts.</p>
        )}
      </div>
    </div>
  );
};

export default PodcastPage;
