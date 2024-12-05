import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArtistDetail } from '../hooks/useArtist';
import { Card, Button, Typography, Spin, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ArtistDetail = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const artistData = await fetchArtistDetail(artistId);
      setArtist(artistData);
    };

    fetchDetail();
  }, [artistId]);

  if (!artist) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        <p>Cargando detalles del artista...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16} align="top">
 
        <Col xs={24} sm={12} md={12}>
          <Card
            hoverable
            cover={<img alt={artist.name} src={artist.images[0]?.url} />}
            style={{ width: '100%' }}
          >
            <Title level={2}>{artist.name}</Title>
            <Text strong>Seguidores:</Text>
            <p>{artist.followers.toLocaleString()}</p>
            <Text strong>Género:</Text>
            <p>{artist.genres.join(', ')}</p>
            <Button
              type="primary"
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              block
            >
              Ver en Spotify
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={12}>
          <div>
            <Title level={3}>Escuchar las canciones populares</Title>
            {artist.top_tracks.map((track) => (
              <div key={track.id} style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h4>{track.name}</h4>
                <iframe
                  src={`https://open.spotify.com/embed/track/${track.id}`}
                  width="300"
                  height="80"
                  frameBorder="0"
                  allow="encrypted-media"
                  title={`Spotify Player: ${track.name}`}
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ArtistDetail;
