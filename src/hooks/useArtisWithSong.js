import { useState, useEffect } from 'react';
import { getAccessToken } from '../helpers/auth';

const useArtistsWithSongs = () => {
  const [artist, setArtist] = useState(null);
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewSong(); 

  }, []);

  const fetchNewSong = async () => {
    try {
      const accessToken = await getAccessToken();

  
      const artistResponse = await fetch('https://api.spotify.com/v1/artists?limit=50', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const artistData = await artistResponse.json();
      const randomArtist = artistData.artists[Math.floor(Math.random() * artistData.artists.length)];

 
      const songsResponse = await fetch(`https://api.spotify.com/v1/artists/${randomArtist.id}/top-tracks?market=US`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const songsData = await songsResponse.json();
      const randomSong = songsData.tracks[Math.floor(Math.random() * songsData.tracks.length)];


      setArtist({
        name: randomArtist.name,
        image: randomArtist.images[0]?.url,
      });

      setSong({
        name: randomSong.name,
        previewUrl: randomSong.preview_url,
      });

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { artist, song, loading, error, fetchNewSong };
};

export default useArtistsWithSongs;
