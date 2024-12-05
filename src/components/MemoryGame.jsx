import { useState, useEffect } from "react";

const MemoryGame = () => {
  // Constantes para las imágenes de los artistas
  const AGUILERA = "../assets/memory /aguilera.jpeg";
  const BEYONCE = "../assets/memory /beyoncé.jpg"
  const BURNA = "../assets/memory /burna.jpg"
  const JORJA = "../assets/memory/jorja.jpg"
  const KENDRICK = "../assets/memory/kendrick.jpg"
  const RIHANNA = "../assets/memory /riri.avif"
  const TASH = "../assets/memory /tash.jpeg"
  const TYLER = "../assets/memory /tyler.webp"
  const LIN_MANUEL = "../assets/memory /lin-manuel-miranda-hamilton.webp"

  // Lista de artistas con las rutas de las imágenes
  const artistData = [
    { id: 1, name: "Christina Aguilera", imageUrl: AGUILERA },
    { id: 2, name: "Beyoncé", imageUrl: BEYONCE },
    { id: 3, name: "Burna Boy", imageUrl: BURNA },
    { id: 4, name: "Jorja Smith", imageUrl: JORJA },
    { id: 5, name: "Kendrick Lamar", imageUrl: KENDRICK },
    { id: 6, name: "Rihanna", imageUrl: RIHANNA },
    { id: 7, name: "Tash Sultana", imageUrl: TASH },
    { id: 8, name: "Tyler, the Creator", imageUrl: TYLER },
    { id: 9, name: "Lin-Manuel Miranda", imageUrl: LIN_MANUEL },
  ];

  const [artists, setArtists] = useState([]);
  const [flipped, setFlipped] = useState([]); // Cartas volteadas
  const [matches, setMatches] = useState([]); // Coincidencias
  const [gameOver, setGameOver] = useState(false); // Si el juego terminó
  const [loading, setLoading] = useState(false); // Estado de carga

  // Inicializar los artistas en el juego
  useEffect(() => {
    const shuffledArtists = shuffleArtists(artistData);
    setArtists(shuffledArtists);
    setLoading(false);
  }, []);

  // Función para manejar el clic en una carta
  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || gameOver) {
      return; // Si ya hay dos cartas volteadas o el juego terminó, no hacer nada
    }

    setFlipped((prevFlipped) => [...prevFlipped, index]);

    // Comprobar si hay un match
    if (flipped.length === 1 && artists[flipped[0]].id === artists[index].id) {
      setMatches((prevMatches) => [...prevMatches, artists[index].id]);
    }
  };

  // Verificar si el juego ha terminado
  useEffect(() => {
    if (matches.length === artistData.length) {
      setGameOver(true); // El juego termina si se encuentran todos los pares
    }
  }, [matches, artistData.length]);

  // Función para mezclar las cartas (duplicar los artistas para pares)
  const shuffleArtists = (array) => {
    let shuffledArray = [...array, ...array]; // Duplicamos los artistas para crear pares
    // Mezclamos el array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Mostrar el juego
  return (
    <div>
      <h1>Juego de Memoria - Artistas</h1>
      {loading && <p>Cargando artistas...</p>}
      {!loading && !gameOver && (
        <div className="game-container">
          {/* Mostrar 3 filas de 3 cartas */}
          {artists.map((artist, index) => {
            const isFlipped = flipped.includes(index) || matches.includes(artist.id);
            return (
              <div
                key={index}
                className={`card ${isFlipped ? "flipped" : ""}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="card-content">
                  {isFlipped ? (
                    <img src={artist.imageUrl} alt={artist.name} className="artist-image" />
                  ) : (
                    <p>?</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {gameOver && <p>¡Juego terminado! Has encontrado todos los pares.</p>}
    </div>
  );
};

export default MemoryGame;
