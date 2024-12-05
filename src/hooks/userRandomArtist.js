// useRandomArtist.js
import { useState, useEffect, useCallback } from 'react';
import { getAccessToken } from '../helpers/auth';

const useRandomArtists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomArtists = useCallback(async () => {
    try {
      const accessToken = await getAccessToken();

      const response = await fetch('https://api.spotify.com/v1/search?q=artist&type=artist&limit=50', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      // Elegimos dos artistas aleatorios
      const randomArtists = [
        data.artists.items[Math.floor(Math.random() * data.artists.items.length)],
        data.artists.items[Math.floor(Math.random() * data.artists.items.length)],
      ];

      // Obtener más información de estos artistas
      const artistsData = await Promise.all(
        randomArtists.map(async (artist) => {
          const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artist.id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          const artistDetails = await artistResponse.json();

          return {
            name: artistDetails.name,
            image: artistDetails.images[0]?.url,
            followers: artistDetails.followers.total,
            genres: artistDetails.genres.join(', '),
          };
        })
      );

      setArtists(artistsData);
      setLoading(false);
    } catch (error) {
      setError(error, 'Error al cargar los artistas aleatorios');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomArtists();
  }, [fetchRandomArtists]);

  return { artists, loading, error, refetch: fetchRandomArtists };
};

export default useRandomArtists;
