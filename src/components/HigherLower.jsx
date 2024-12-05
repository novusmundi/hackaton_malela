// RandomArtistGame.jsx
import { useState, useEffect } from 'react';
import useRandomArtists from '../hooks/userRandomArtist';

const RandomArtistGame = () => {
  const { artists, loading, error, refetch } = useRandomArtists(); // Usamos el hook para obtener artistas

  const [firstArtist, setFirstArtist] = useState(null); // Artista inicial
  const [secondArtist, setSecondArtist] = useState(null); // Artista que se actualizará
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (artists.length > 0) {
      // Si tenemos los artistas, asignamos el primer y segundo artista
      setFirstArtist(artists[0]);
      setSecondArtist(artists[1]);
    }
  }, [artists]); // Solo se ejecuta cuando artistas se actualiza

  if (loading) {
    return <div>Cargando artistas aleatorios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleGuess = (chosenArtist) => {
    // Definir cuál es la respuesta correcta
    const correctAnswer = firstArtist.followers > secondArtist.followers ? firstArtist : secondArtist;

    // Si la respuesta es correcta, aumentamos el puntaje y mostramos el resultado
    if (chosenArtist === correctAnswer) {
      setResult('¡Correcto!');
      setScore(score + 1);
      // Solo actualizamos el segundo artista si se acierta
      refetch(); // Traemos un nuevo segundo artista para la comparación
    } else {
      setResult('¡Incorrecto! La respuesta correcta era ' + correctAnswer.name);
    }
  };

  return (
    <div style={gameStyle}>
      <h1>¿Quién tiene más oyentes?</h1>

      <div style={artistStyle}>
        {firstArtist && secondArtist && (
          <>
            <div>
              <img
                src={firstArtist.image}
                alt={firstArtist.name}
                style={imageStyle}
              />
              <h2>{firstArtist.name}</h2>
              <p><strong>Géneros:</strong> {firstArtist.genres}</p>
              <p><strong>Oyentes:</strong> {firstArtist.followers.toLocaleString()}</p>
            </div>
            <p>vs</p>
            <div>
              <img
                src={secondArtist.image}
                alt={secondArtist.name}
                style={imageStyle}
              />
              <h2>{secondArtist.name}</h2>
              <p><strong>Géneros:</strong> {secondArtist.genres}</p>
              <p><strong>Oyentes:</strong> {secondArtist.followers.toLocaleString()}</p>
            </div>

            <div>
              <button onClick={() => handleGuess(firstArtist)}>Elegir {firstArtist.name}</button>
              <button onClick={() => handleGuess(secondArtist)}>Elegir {secondArtist.name}</button>
            </div>

            {result && (
              <div style={resultStyle}>
                <p>{result}</p>
                <p>Puntaje: {score}</p>
              </div>
            )}
          </>
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

const artistStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-around',
};

const imageStyle = {
  width: '150px',
  height: '150px',
  borderRadius: '50%',
};

const resultStyle = {
  marginTop: '20px',
  padding: '10px',
  backgroundColor: '#e0ffe0',
  border: '1px solid green',
  borderRadius: '5px',
};

export default RandomArtistGame;
