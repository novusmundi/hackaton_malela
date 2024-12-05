import backgroundImage from '../assets/Spotify-x-TV_Own-the-Living-Room-Project_FTR-Header_1440x820_02-1440x733.jpg'

const Home = () => {
  return (
    <div style={homeStyle}>
    
     
    </div>
  );
};
const homeStyle = {
  textAlign: 'center',
  backgroundImage: `url(${backgroundImage})`, 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  margin: 0,
  padding: 0,
  color: 'white',
};
export default Home;
