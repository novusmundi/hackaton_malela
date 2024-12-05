import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Spin, Card, Row, Col, Typography } from 'antd'; 
import { fetchArtists } from '../hooks/useArtist';

const { Search } = Input;
const { Title, Text } = Typography;

const ArtistCatalog = () => {
  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        setLoading(true);
        const artistsData = await fetchArtists(query);
        setArtists(artistsData);
        setLoading(false);
      };

      fetchData();
    }
  }, [query]);

  return (
    <div style={containerStyle}>
      <Title level={2} style={titleStyle}>
        Catálogo de Artistas
      </Title>
      <Search
        placeholder="Buscar artista"
        enterButton="Buscar"
        size="large"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={searchStyle}
      />
      {loading ? (
        <Spin size="large" style={spinnerStyle} />
      ) : (
        <Row gutter={[16, 16]} style={gridStyle}>
          {artists.length > 0 ? (
            artists.map((artist) => (
              <Col key={artist.id} xs={24} sm={12} md={8} lg={6}>
                <Link to={`/artist/${artist.id}`}>
                  <Card
                    hoverable
                    cover={
                      <img
                        src={artist.images[0]?.url}
                        alt={artist.name}
                        style={cardImageStyle}
                      />
                    }
                  >
                    <Card.Meta title={artist.name} />
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <Text></Text>
          )}
        </Row>
      )}
    </div>
  );
};

// Estilos personalizados
const containerStyle = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '20px',
};

const searchStyle = {
  marginBottom: '20px',
};

const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
};

const gridStyle = {
  marginTop: '20px',
};

const cardImageStyle = {
  height: '200px',
  objectFit: 'cover',
};

export default ArtistCatalog;
