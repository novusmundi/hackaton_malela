// RandomArtistGame.jsx
import { useState } from 'react';
import useRandomArtists from '../hooks/userRandomArtist';

const RandomArtistGame = () => {
  const { artists, loading, error } = useRandomArtists(); 

  const [result, setResult] = useState(null); 
  const [score, setScore] = useState(0); 

  if (loading) {
    return <div>Cargando artistas aleatorios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

 
  const handleGuess = (chosenArtist) => {
    const correctAnswer = artists[0].followers > artists[1].followers ? artists[0] : artists[1];
    if (chosenArtist === correctAnswer) {
      setResult('¡Correcto!');
      setScore(score + 1); 
    } else {
      setResult('¡Incorrecto! La respuesta correcta era ' + correctAnswer.name);
    }

 
  };

  return (
    <div style={gameStyle}>
      <h1>¿Quién tiene más oyentes?</h1>

      <div style={artistStyle}>
        {artists && (
          <>
            <div>
              <img
                src={artists[0].image}
                alt={artists[0].name}
                style={imageStyle}
              />
              <h2>{artists[0].name}</h2>
              <p><strong>Géneros:</strong> {artists[0].genres}</p>
              <p><strong>Oyentes:</strong> {artists[0].followers.toLocaleString()}</p>
            </div>
            <p>vs</p>
            <div>
              <img
                src={artists[1].image}
                alt={artists[1].name}
                style={imageStyle}
              />
              <h2>{artists[1].name}</h2>
              <p><strong>Géneros:</strong> {artists[1].genres}</p>
              <p><strong>Oyentes:</strong> {artists[1].followers.toLocaleString()}</p>
            </div>

            <div>
              <button onClick={() => handleGuess(artists[0])}>Elegir {artists[0].name}</button>
              <button onClick={() => handleGuess(artists[1])}>Elegir {artists[1].name}</button>
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
