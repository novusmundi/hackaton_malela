
import { useState } from 'react';
import useGenres from '../hooks/useGenres';
import { Link } from 'react-router-dom'; 
const GenresPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { genres, loading, error } = useGenres(searchQuery); 

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); 
  };


  if (loading) {
    return <p>Cargando géneros...</p>;
  }


  if (error) {
    return <p>{error}</p>;
  }


  const filteredGenres = genres.filter((genre) =>
    genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Géneros Musicales</h1>
      <input
        type="text"
        placeholder="Buscar género..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div>
        {filteredGenres.map((genre, index) => (
          <div key={index}>
            <Link to={`/genre/${genre}`}>{genre}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresPage;