import { useState, useEffect } from 'react';
import { getAccessToken } from '../helpers/auth'; 
const useArtistsWithSongs = () => {
  const [artist, setArtist] = useState(null);
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewArtistAndSong = async () => {
    try {
      const accessToken = await getAccessToken();

    
      const response = await fetch('https://api.spotify.com/v1/search?q=artist&type=artist&limit=50', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      const randomArtist = data.artists.items[Math.floor(Math.random() * data.artists.items.length)];

    
      const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${randomArtist.id}/top-tracks?market=US`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const artistData = await artistResponse.json();
      const randomSong = artistData.tracks[Math.floor(Math.random() * artistData.tracks.length)];

      setArtist({
        name: randomArtist.name,
        image: randomArtist.images[0]?.url,
        followers: randomArtist.followers.total,
        genres: randomArtist.genres.join(', '),
      });

      setSong({
        name: randomSong.name,
        preview_url: randomSong.preview_url,
      });

      setLoading(false);
    } catch (err) {
      setError(err, 'Error al cargar el artista y la canción');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArtistAndSong(); 
  }, []);

  return { artist, song, loading, error, fetchNewArtistAndSong };
};

export default useArtistsWithSongs;
