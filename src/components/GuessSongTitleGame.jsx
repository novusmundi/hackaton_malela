import { useState, useEffect } from 'react';
import { Input, Button, Typography, Card, Row, Col, Spin, message } from 'antd';
import useArtistsWithSongs from '../hooks/useArtisWithSong';

const { Title, Text } = Typography;

const GuessSongTitleGame = () => {
  const { artist, song, loading, error, fetchNewArtistAndSong } = useArtistsWithSongs();
  
  const [guessedTitle, setGuessedTitle] = useState('');
  const [maskedTitle, setMaskedTitle] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (song) {
      const titleLength = song.name.length;
      const visiblePart = song.name.slice(0, Math.ceil(titleLength / 2));
      const hiddenPart = song.name.slice(Math.ceil(titleLength / 2));
      const masked = visiblePart + hiddenPart.replace(/./g, '_');

      setMaskedTitle(masked);
    }
  }, [song]);

  if (loading) {
    return (
      <div style={centerStyle}>
        <Spin size="large" />
        <Text>Cargando artista y canción...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={centerStyle}>
        <Text type="danger">Error: {error}</Text>
      </div>
    );
  }

  const handleGuess = () => {
    const normalizedGuessedTitle = guessedTitle.replace(/\s+/g, '').toLowerCase();
    const normalizedSongTitle = song.name.replace(/\s+/g, '').toLowerCase();

    if (normalizedGuessedTitle === normalizedSongTitle) {
      setIsCorrect(true);
      setScore(score + 1);
      fetchNewArtistAndSong(); 
      message.success('¡Correcto!'); // Mostrar mensaje de éxito
    } else {
      setIsCorrect(false);
      message.error(`¡Incorrecto! La respuesta correcta era: ${song.name}`); // Mostrar mensaje de error
    }
  };

  const handleInputChange = (e) => {
    setGuessedTitle(e.target.value);
  };

  return (
    <div style={gameStyle}>
      <Title level={2}>¡Adivina el título de la canción!</Title>

      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={20} lg={12}>
          <Card bordered={false}>
            <Text strong>Artista: {artist.name}</Text>
            <p>¿Cuál es el título de la canción de {artist.name}?</p>

            <div style={maskedTitleStyle}>
              <Title level={3}>{maskedTitle}</Title>
            </div>

            <Input
              placeholder="Ingresa tu respuesta"
              value={guessedTitle}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <Button type="primary" onClick={handleGuess} style={buttonStyle}>
              Adivinar
            </Button>

            {isCorrect !== null && (
              <div style={resultStyle}>
                {isCorrect ? (
                  <Text type="success">¡Correcto! </Text>
                ) : (
                  <Text type="danger">¡Incorrecto! </Text>
                )}
                <Text>Puntuación: {score}</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const gameStyle = {
  textAlign: 'center',
  padding: '40px 20px',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const maskedTitleStyle = {
  fontSize: '28px',
  letterSpacing: '3px',
  marginBottom: '20px',
};

const resultStyle = {
  marginTop: '20px',
  padding: '10px',
  borderRadius: '5px',
};

const inputStyle = {
  width: '100%',
  marginBottom: '20px',
};

const buttonStyle = {
  width: '100%',
};

const centerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export default GuessSongTitleGame;
