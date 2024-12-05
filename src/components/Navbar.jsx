// Navbar.jsx

import { Link } from 'react-router-dom'; // Para usar enlaces de navegación

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <ul style={listStyle}>
      <li style={listItemStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/artist" style={linkStyle}>Artistas</Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/podcast" style={linkStyle}>Podcasts</Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/games/higherlower" style={linkStyle}>Juegos</Link>
        </li>
       
      </ul>
    </nav>
  );
};

// Estilos sencillos para la barra de navegación
const navbarStyle = {
  backgroundColor: '#333',
  padding: '10px',
};

const listStyle = {
  listStyleType: 'none',
  display: 'flex',
  justifyContent: 'space-around',
  padding: 0,
};

const listItemStyle = {
  margin: '0 10px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '18px',
};

export default Navbar;
