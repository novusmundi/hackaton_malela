import { Card, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import higherLowerImage from '../assets/unnamed.png';
import guessSongTitleImage from '../assets/images (2).jpeg';


const { Meta } = Card;
const Games = () => {
    return (
      <div style={{ padding: '190px', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
        <Row gutter={16} justify="center">
  
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={<img alt="Higher or Lower" src={higherLowerImage} />} 
              style={{ width: '100%', maxWidth: '300px', margin: '10px' }}
            >
              <Meta title="Higher or Lower" description="Adivina si el siguiente artista es más o menos popular." />
              <Link to="/games/higherlower">
                <Button type="primary" block style={{ marginTop: '10px' }}>
                  Jugar
                </Button>
              </Link>
            </Card>
          </Col>
  
      
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={<img alt="Guess Song Title" src={guessSongTitleImage} />} 
              style={{ width: '100%', maxWidth: '300px', margin: '10px' }}
            >
              <Meta title="Guess Song Title" description="Adivina el título de la canción a partir de la letra." />
              <Link to="/games/guesssongtitle">
                <Button type="primary" block style={{ marginTop: '10px' }}>
                  Jugar
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };
  
  export default Games;