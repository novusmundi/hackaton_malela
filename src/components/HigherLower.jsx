import { useState, useEffect } from 'react';
import { Card, Row, Col, Typography,Spin, Alert } from 'antd';
import useRandomArtists from '../hooks/userRandomArtist';

const { Title, Text } = Typography;

const RandomArtistGame = () => {
  const { artists, loading, error, refetch } = useRandomArtists();
  const [firstArtist, setFirstArtist] = useState(null);
  const [secondArtist, setSecondArtist] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (artists.length > 0) {
      setFirstArtist(artists[0]);
      setSecondArtist(artists[1]);
    }
  }, [artists]);

  const handleGuess = (chosenArtist) => {
    const correctAnswer =
      firstArtist.followers > secondArtist.followers ? firstArtist : secondArtist;

    if (chosenArtist === correctAnswer) {
      setResult('¡Correcto!');
      setScore(score + 1);
    } else {
      setResult(`¡Incorrecto! La respuesta correcta era ${correctAnswer.name}`);
      setScore(0); 
    }


    setTimeout(() => {
      refetch();
      setResult(null);
    }, 2000); 
  };

  if (loading) {
    return (
      <div style={centerStyle}>
        <Spin size="large" />
        <Text>Cargando artistas aleatorios...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={centerStyle}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div style={gameStyle}>
      <Title level={2}>¿Quién tiene más oyentes?</Title>
      <Row gutter={[16, 16]} justify="center" style={artistRowStyle}>
        {firstArtist && secondArtist && (
          <>
            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                cover={<img src={firstArtist.image} alt={firstArtist.name} style={imageStyle} />}
                onClick={() => handleGuess(firstArtist)}
              >
                <Card.Meta
                  title={firstArtist.name}
            
                />
              
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card
                hoverable
                cover={<img src={secondArtist.image} alt={secondArtist.name} style={imageStyle} />}
                onClick={() => handleGuess(secondArtist)}
              >
                <Card.Meta
                  title={secondArtist.name}
            
                />
             
              </Card>
            </Col>
          </>
        )}
      </Row>

      {result && (
        <div style={resultStyle}>
          <Alert
            message={result}
            type={result.includes('Correcto') ? 'success' : 'error'}
            showIcon
          />
          <Text strong>Puntaje: {score}</Text>
        </div>
      )}
    </div>
  );
};

// Estilos personalizados
const gameStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
};

const artistRowStyle = {
  marginTop: '20px',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
};

const resultStyle = {
  marginTop: '20px',
};

const centerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export default RandomArtistGame;
