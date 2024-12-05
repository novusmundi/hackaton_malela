
import PropTypes from 'prop-types'; // Importar PropTypes
import { Link } from 'react-router-dom';
// Componente que muestra cada artista
const ArtistHit = ({ hit }) => (
  <div key={hit.objectID}>
    <Link to={`/artist/${hit.objectID}`}>
      <img src={hit.imageUrl} alt={hit.name} width={100} />
      <p>{hit.name}</p>
    </Link>
  </div>
);

// Validación de props utilizando PropTypes
ArtistHit.propTypes = {
  hit: PropTypes.shape({
    objectID: PropTypes.string.isRequired, // Validamos que objectID sea una cadena
    name: PropTypes.string.isRequired,      // Validamos que name sea una cadena
    imageUrl: PropTypes.string.isRequired,  // Validamos que imageUrl sea una cadena
  }).isRequired, // hit es un objeto obligatorio
};

export default ArtistHit;
