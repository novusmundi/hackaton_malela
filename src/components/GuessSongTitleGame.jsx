import { useState, useEffect } from 'react';
import useArtistsWithSongs from '../hooks/useArtisWithSong';
const GuessSongTitleGame = () => {
    const { artist, song, loading, error, fetchNewSong } = useArtistsWithSongs(); 
  
    const [guessedTitle, setGuessedTitle] = useState('');
    const [maskedTitle, setMaskedTitle] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
  
    useEffect(() => {
      if (song) {
       
        const titleLength = song.name.length;
        const visiblePart = song.name.slice(0, Math.ceil(titleLength / 2)); 
        const hiddenPart = song.name.slice(Math.ceil(titleLength / 2)); 
   
        const mixedTitleArray = [
          ...visiblePart.split(''), 
          ...hiddenPart.split('').map(() => '_') 
        ];
  
  
        for (let i = mixedTitleArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [mixedTitleArray[i], mixedTitleArray[j]] = [mixedTitleArray[j], mixedTitleArray[i]]; 
        }
  

        setMaskedTitle(mixedTitleArray.join(''));
      }
    }, [song]);
  
    if (loading) {
      return <div>Cargando artista y canción...</div>;
    }
  
    if (error) {
      return <div>{`Error: ${error.message}`}</div>;
    }
  
    const handleGuess = () => {
      if (guessedTitle.toLowerCase() === song.name.toLowerCase()) {
        setIsCorrect(true);
        setScore(score + 1);
        fetchNewSong(); 
      } else {
        setIsCorrect(false);
      }
    };
  
    const handleInputChange = (e) => {
      setGuessedTitle(e.target.value);
    };
  
    return (
      <div style={gameStyle}>
        <h1>¡Adivina el título de la canción!</h1>
  
        <div style={gameContentStyle}>
          <h2>Artista: {artist.name}</h2>
          <p>¿Cuál es el título de la canción de {artist.name}?</p>
  
          <div style={maskedTitleStyle}>
            <p>{maskedTitle}</p>
          </div>
  
          <input
            type="text"
            placeholder="Ingresa tu respuesta"
            value={guessedTitle}
            onChange={handleInputChange}
          />
          <button onClick={handleGuess}>Adivinar</button>
  
          {isCorrect !== null && (
            <div style={resultStyle}>
              {isCorrect ? (
                <p>¡Correcto! El título es: {song.name}</p>
              ) : (
                <p>¡Incorrecto! La respuesta correcta era: {song.name}</p>
              )}
              <p>Puntaje: {score}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const gameStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  };
  
  const gameContentStyle = {
    marginTop: '20px',
  };
  
  const maskedTitleStyle = {
    fontSize: '24px',
    letterSpacing: '5px',
    marginBottom: '20px',
  };
  
  const resultStyle = {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#e0ffe0',
    border: '1px solid green',
    borderRadius: '5px',
  };
  
  export default GuessSongTitleGame;