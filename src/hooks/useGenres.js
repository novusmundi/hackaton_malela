// useGenres.js
import { useState, useEffect } from 'react';
import { getAccessToken } from '../helpers/auth'; 
const useGenres = (query) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const accessToken = await getAccessToken();

        // Realizamos el fetch de artistas para obtener los géneros
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=50`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        if (data.artists) {
          const allGenres = new Set();

          // Extraemos los géneros de los artistas
          data.artists.items.forEach((artist) => {
            artist.genres.forEach((genre) => {
              allGenres.add(genre); // Usamos un Set para evitar duplicados
            });
          });

          setGenres([...allGenres]); // Convertimos el Set a un array
        }

        setLoading(false);
      } catch (error) {
        setError(error, 'Error al cargar los géneros');
        setLoading(false);
      }
    };

    fetchGenres();
  }, [query]); // El efecto se ejecutará cada vez que cambie la consulta (query)

  return { genres, loading, error };
};

export default useGenres;
