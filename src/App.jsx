import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtistCatalog from './pages/ArtistCatalogue'
import ArtistDetail from './components/ArtistDetail';
import GenresPage from './pages/GenresPage';
import PodcastPage from './pages/PodcastPage';

import './App.css'
import PodcastDetailPage from './components/PodcastDetail';

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<ArtistCatalog />} />
      <Route path="/artist/:artistId" element={<ArtistDetail />} />
      <Route path="/genres" element={<GenresPage />} /> 
      <Route path="/podcast" element={<PodcastPage />} />
      <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
    </Routes>
  </Router>
  )
}

export default App
