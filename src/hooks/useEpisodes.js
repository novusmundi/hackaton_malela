// usePodcasts.js
import { useState, useEffect } from 'react';
import { getAccessToken } from '../helpers/auth'; // Asegúrate de tener esta función

const usePodcasts = (query, podcastId = null) => {
  const [podcasts, setPodcasts] = useState([]);
  const [podcastDetail, setPodcastDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      if (podcastId) {

        try {
          const accessToken = await getAccessToken();
          const response = await fetch(`https://api.spotify.com/v1/shows/${podcastId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          const data = await response.json();
          setPodcastDetail(data);
          setLoading(false);
        } catch (error) {
          setError(error, 'Error al cargar los detalles del podcast');
          setLoading(false);
        }
      } else if (query) {

        try {
          const accessToken = await getAccessToken();
          const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=show&limit=10`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });

          const data = await response.json();

          if (data.shows && data.shows.items.length > 0) {
            setPodcasts(data.shows.items);
          } else {
            setError('No se encontraron podcasts con ese nombre.');
          }

          setLoading(false);
        } catch (error) {
          setError(error, 'Error al cargar los podcasts');
          setLoading(false);
        }
      }
    };

    fetchPodcasts();
  }, [query, podcastId]); 
  return { podcasts, podcastDetail, loading, error };
};

export default usePodcasts;
