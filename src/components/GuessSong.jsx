import { useState, useEffect } from 'react';
import { getAccessToken } from '../helpers/auth'; 

const SongGuessGame = () => {
  const [song, setSong] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {

    const fetchSong = async () => {
      try {
        const accessToken = await getAccessToken();

     
        const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=1`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        const track = data.items[0]; 
        setSong(track); 
        setLoading(false);

      } catch (error) {
        setError(error, 'Error al cargar la canción');
        setLoading(false);
      }
    };

    fetchSong();
  }, []); 

  const handleGuess = () => {
    if (userGuess.toLowerCase() === song.name.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handlePlaySong = () => {
    setIsPlaying(true);
    const audio = new Audio(song.preview_url);
    audio.play();

  
    setTimeout(() => {
      audio.pause();
      setIsPlaying(false);
    }, 3000);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={gameStyle}>
      <h1>¡Adivina el título de la canción!</h1>

      <div>
        {song && (
          <>
            <p><strong>Artista:</strong> {song.artists[0].name}</p>
            <p><strong>¿Cuál es el título de la canción?</strong></p>
            
            <button onClick={handlePlaySong} disabled={isPlaying}>
              {isPlaying ? 'Reproduciendo...' : 'Escuchar Fragmento'}
            </button>
            
            <input
              type="text"
              placeholder="Ingresa tu respuesta"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
            />
            <button onClick={handleGuess}>Adivinar</button>
          </>
        )}
      </div>


      {isCorrect !== null && (
        <div style={resultStyle}>
          {isCorrect ? (
            <p>¡Correcto! La canción es: {song.name}</p>
          ) : (
            <p>¡Incorrecto! La respuesta correcta era: {song.name}</p>
          )}
        </div>
      )}
    </div>
  );
};


const gameStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#f5f5f5',
};

const resultStyle = {
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#e0ffe0',
  border: '1px solid green',
  borderRadius: '5px',
};

export default SongGuessGame;
