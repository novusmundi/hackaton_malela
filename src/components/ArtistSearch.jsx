import { useState } from 'react';
import { List, Spin, Card } from 'antd';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import PropTypes from 'prop-types';

// Algolia setup
const searchClient = algoliasearch('MJX6I9X1WO', '57391ee3c0f7d6d918685b944f611144');

const ArtistSearch = () => {
  const [loading, setLoading] = useState(false);

  // Hit component - used by Hits component
  const Hit = ({ hit }) => {
    if (!hit) return null; // Handle missing hit data

    return (
      <List.Item>
        <Card
          hoverable
          cover={<img alt={hit.name} src={hit.image_url} />}
        >
          <Card.Meta
            title={hit.name}
            description={`Born in ${hit.birth_city} (${hit.birth_year})`}
          />
        </Card>
      </List.Item>
    );
  };

  // Add PropTypes to validate the 'hit' prop
  Hit.propTypes = {
    hit: PropTypes.shape({
      name: PropTypes.string.isRequired,
      birth_year: PropTypes.number.isRequired,
      birth_city: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <div style={{ margin: '50px' }}>
      <h2>Search for Artists</h2>
      <InstantSearch searchClient={searchClient} indexName="artists">
        <div style={{ marginBottom: '20px' }}>
          <SearchBox
            translations={{
              placeholder: 'Search for artists...'
            }}
            onSearch={() => setLoading(true)}
            onChange={() => setLoading(true)}
          />
        </div>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Hits hitComponent={Hit} />
        )}
      </InstantSearch>
    </div>
  );
};

export default ArtistSearch;
