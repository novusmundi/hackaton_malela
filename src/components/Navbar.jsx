import { Menu } from 'antd'; 
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  return (
    <Menu
      mode="horizontal"
      theme="dark"
      style={navbarStyle}
      defaultSelectedKeys={['home']}
    >
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="artists">
        <Link to="/artist">Artistas</Link>
      </Menu.Item>
      <Menu.Item key="podcasts">
        <Link to="/podcast">Podcasts</Link>
      </Menu.Item>
      <Menu.Item key="games">
        <Link to="/games">Juegos</Link>
      </Menu.Item>
    </Menu>
  );
};


const navbarStyle = {
  position: 'fixed', 
  top: 0,
  zIndex: 1,
  width: '100%',
};

export default Navbar;
