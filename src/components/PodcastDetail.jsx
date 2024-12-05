

import { useParams } from 'react-router-dom'; 
import usePodcasts from '../hooks/useEpisodes';

const PodcastDetailPage = () => {
  const { podcastId } = useParams(); 
  const { podcastDetail, loading, error } = usePodcasts(null, podcastId); // 

  if (loading) {
    return <p>Cargando detalles del podcast...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!podcastDetail) {
    return <p>No se encontraron detalles para este podcast.</p>;
  }


  const { name, description, images } = podcastDetail;

  return (
    <div>
      <h1>{name}</h1>
      {images && images[0] && (
        <img src={images[0].url} alt={name} style={{ width: '300px', height: '300px' }} />
      )}
      <p>{description}</p>
    </div>
  );
};

export default PodcastDetailPage;
