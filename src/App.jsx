import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArtistCatalog from './pages/ArtistCatalogue'
import ArtistDetail from './components/ArtistDetail';
import GenresPage from './pages/GenresPage';
import PodcastPage from './pages/PodcastPage';
import Home from './pages/Home';
import './App.css'
import PodcastDetailPage from './components/PodcastDetail';
import SongGuessGame from './components/GuessSong';


function App() {


  return (
    <Router>
      <Navbar />
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/artist" element={<ArtistCatalog />} />
      <Route path="/artist/:artistId" element={<ArtistDetail />} />
      <Route path="/genres" element={<GenresPage />} /> 
      <Route path="/podcast" element={<PodcastPage />} />
      <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
      <Route path="/game" element={<SongGuessGame />} />
    
    </Routes>
  </Router>
  )
}

export default App
