import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArtistCatalog from './pages/ArtistCatalogue'
import ArtistDetail from './components/ArtistDetail';
import './App.css'

function App() {


  return (
    <Router>
    <Routes>
      <Route path="/" element={<ArtistCatalog />} />
      <Route path="/artist/:artistId" element={<ArtistDetail />} />
    </Routes>
  </Router>
  )
}

export default App
