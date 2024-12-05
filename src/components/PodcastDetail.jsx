import { useParams } from 'react-router-dom';
import usePodcasts from '../hooks/useEpisodes';
import { Card, Button, Typography, Spin, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const PodcastDetailPage = () => {
  const { podcastId } = useParams();
  const { podcastDetail, loading, error } = usePodcasts(null, podcastId);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        <p>Cargando detalles del podcast...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!podcastDetail) {
    return <p>No se encontraron detalles para este podcast.</p>;
  }

  const { name, description, images } = podcastDetail;

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Row gutter={16} justify="center" align="top">
      
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            cover={images && images[0] ? <img alt={name} src={images[0].url} style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }} /> : null}
            style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}
          >
            <Title level={3} style={{ textAlign: 'center' }}>{name}</Title>
            <Text strong>Descripción:</Text>
            <p style={{ textAlign: 'center' }}>{description}</p>
            <Button
              type="primary"
              href={`https://open.spotify.com/show/${podcastId}`}  
              target="_blank"
              rel="noopener noreferrer"
              block
            >
              Escuchar en Spotify
            </Button>
          </Card>
        </Col>

      
        <Col xs={24} sm={12} md={8}>
          <div style={{ textAlign: 'center' }}>
       
            <iframe
              src={`https://open.spotify.com/embed/show/${podcastId}`} // 
              width="300"
              height="80"
              frameBorder="0"
              allow="encrypted-media"
              title={`Spotify Player: ${name}`}
              style={{ marginTop: '20px' }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PodcastDetailPage;
