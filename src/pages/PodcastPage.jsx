import { useState } from 'react';
import { Input, Card, Typography, Row, Col } from 'antd'; 
import { Link } from 'react-router-dom';
import usePodcasts from '../hooks/useEpisodes';

const { Search } = Input;
const { Title, Text } = Typography;

const PodcastPage = () => {
  const [query, setQuery] = useState('');
  const { podcasts, loading,  } = usePodcasts(query);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div style={containerStyle}>
      <Title level={2} style={titleStyle}>Buscar Podcasts</Title>
      <Search
        placeholder="Busca un podcast"
        enterButton="Buscar"
        size="large"
        value={query}
        onChange={handleInputChange}
        style={searchStyle}
      />
{/* 
      {loading && (
        <div style={spinnerStyle}>
          <Spin size="large" />
        </div>
      )}
      {error && <Text type="danger">{error}</Text>} */}

      <div style={gridStyle}>
        {podcasts.length > 0 ? (
          <Row gutter={[16, 16]}>
            {podcasts.map((podcast) => (
              <Col key={podcast.id} xs={24} sm={12} md={8} lg={6}>
                <Link to={`/podcast/${podcast.id}`}>
                  <Card
                    hoverable
                    cover={
                      podcast.images && podcast.images[0] ? (
                        <img
                          src={podcast.images[0].url}
                          alt={podcast.name}
                          style={cardImageStyle}
                        />
                      ) : null
                    }
                  >
                    <Card.Meta title={podcast.name} />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        ) : (
          !loading && <Text>Introduce el nombre de un podcast</Text>
        )}
      </div>
    </div>
  );
};


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

// const spinnerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '200px',
// };

const gridStyle = {
  marginTop: '20px',
};

const cardImageStyle = {
  height: '200px',
  objectFit: 'cover',
};

export default PodcastPage;
