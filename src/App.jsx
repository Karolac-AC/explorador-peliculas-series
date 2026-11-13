import { useEffect, useMemo, useState } from "react";
import movies from "./data/movies";

const logoUrl = import.meta.glob("./assets/now-movie-logo.png", {
  eager: true,
  query: "?url",
  import: "default",
})["./assets/now-movie-logo.png"];

function NavigationIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "explorar" ? (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 3v6M15 3v6M10 13l5 3-5 3z" />
        </>
      ) : (
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      )}
    </svg>
  );
}

function MoviePoster({ movie }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="movie-poster">
      {movie.image && !imageFailed ? (
        <img
          src={movie.image}
          alt={`Póster de ${movie.title}`}
          width="400"
          height="600"
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="movie-poster-fallback">
          <strong>{movie.title}</strong>
          <span>Póster no disponible</span>
        </div>
      )}
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("explorar");
  const [logoFailed, setLogoFailed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("now-movie-favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("now-movie-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const genres = useMemo(
    () => ["Todos", ...new Set(movies.map((movie) => movie.genre))],
    []
  );

  const filteredMovies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(normalizedSearch);
      const matchesType =
        selectedType === "Todos" || movie.type === selectedType;
      const matchesGenre =
        selectedGenre === "Todos" || movie.genre === selectedGenre;

      return matchesSearch && matchesType && matchesGenre;
    });
  }, [searchTerm, selectedType, selectedGenre]);

  const favoriteMovies = useMemo(
    () => movies.filter((movie) => favorites.includes(movie.id)),
    [favorites]
  );

  const isFavorite = (movieId) => favorites.includes(movieId);

  const toggleFavorite = (movieId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(movieId)
        ? currentFavorites.filter((id) => id !== movieId)
        : [...currentFavorites, movieId]
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className={logoUrl && !logoFailed ? "brand brand-with-logo" : "brand"}>
          {logoUrl && !logoFailed ? (
            <img
              className="brand-logo"
              src={logoUrl}
              alt="NOW MOVIE — Películas y series"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <div className="brand-text">
              <h1>NOW MOVIE</h1>
              <p>PELÍCULAS Y SERIES</p>
            </div>
          )}
        </div>

        <nav className="main-navigation" aria-label="Navegación principal">
          <button
            type="button"
            className="nav-item"
            aria-current={activeSection === "explorar" ? "page" : undefined}
            aria-controls="explorar"
            onClick={() => setActiveSection("explorar")}
          >
            <NavigationIcon name="explorar" />
            <span>Explorar</span>
          </button>

          <button
            type="button"
            className="nav-item"
            aria-current={activeSection === "favoritos" ? "page" : undefined}
            aria-controls="favoritos"
            onClick={() => setActiveSection("favoritos")}
          >
            <NavigationIcon name="favoritos" />
            <span>Favoritos</span>
          </button>
        </nav>

        <p className="header-label">Tu próxima historia empieza aquí</p>
      </header>

      <main className="catalog">
        <section
          id="explorar"
          aria-labelledby="explorar-title"
          hidden={activeSection !== "explorar"}
        >
          <div className="catalog-heading">
            <div>
              <p className="eyebrow">EXPLORA EL CATÁLOGO</p>
              <h2 id="explorar-title">Descubre qué ver</h2>
              <p>Encuentra películas y series para tu próxima historia.</p>
            </div>
            <span className="catalog-count">{filteredMovies.length} títulos</span>
          </div>

          <section className="controls" aria-label="Búsqueda y filtros">
            <label className="search-field">
              <span>Buscar por título</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Ej. Interstellar"
              />
            </label>

            <label className="filter-field">
              <span>Tipo</span>
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Película">Películas</option>
                <option value="Serie">Series</option>
              </select>
            </label>

            <label className="filter-field">
              <span>Género</span>
              <select
                value={selectedGenre}
                onChange={(event) => setSelectedGenre(event.target.value)}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>
          </section>

          {filteredMovies.length > 0 ? (
            <section className="movie-grid" aria-label="Catálogo de películas y series">
              {filteredMovies.map((movie) => (
                <article className="movie-card" key={movie.id}>
                  <MoviePoster key={movie.image} movie={movie} />

                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-type">{movie.type}</p>
                    <p>
                      {movie.genre} · {movie.year}
                    </p>

                    <div className="movie-actions">
                      <button
                        type="button"
                        className="details-button"
                        onClick={() => setSelectedMovie(movie)}
                      >
                        Ver detalles
                      </button>
                      <button
                        type="button"
                        className="favorite-button"
                        aria-pressed={isFavorite(movie.id)}
                        onClick={() => toggleFavorite(movie.id)}
                      >
                        {isFavorite(movie.id) ? "★ Favorito" : "☆ Favorito"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <div className="empty-state">
              <h3>No encontramos resultados</h3>
              <p>Prueba con otro título, género o tipo de contenido.</p>
            </div>
          )}
        </section>

        <section
          id="favoritos"
          aria-labelledby="favoritos-title"
          hidden={activeSection !== "favoritos"}
        >
          <div className="catalog-heading">
            <div>
              <p className="eyebrow">TU LISTA</p>
              <h2 id="favoritos-title">Mis favoritos</h2>
              <p>Contenido que marcaste para encontrarlo fácilmente después.</p>
            </div>
            <span className="catalog-count">{favoriteMovies.length} favoritos</span>
          </div>

          {favoriteMovies.length > 0 ? (
            <section className="movie-grid" aria-label="Películas y series favoritas">
              {favoriteMovies.map((movie) => (
                <article className="movie-card" key={movie.id}>
                  <MoviePoster key={movie.image} movie={movie} />

                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="movie-type">{movie.type}</p>
                    <p>
                      {movie.genre} · {movie.year}
                    </p>

                    <div className="movie-actions">
                      <button
                        type="button"
                        className="details-button"
                        onClick={() => setSelectedMovie(movie)}
                      >
                        Ver detalles
                      </button>
                      <button
                        type="button"
                        className="favorite-button"
                        aria-pressed="true"
                        onClick={() => toggleFavorite(movie.id)}
                      >
                        ★ Quitar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <div className="empty-state">
              <h3>Aún no tienes favoritos</h3>
              <p>Marca una película o serie como favorita desde la sección Explorar.</p>
            </div>
          )}
        </section>
      </main>

      {selectedMovie && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelectedMovie(null)}
        >
          <section
            className="movie-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="movie-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Cerrar detalles"
              onClick={() => setSelectedMovie(null)}
            >
              ×
            </button>

            <div className="modal-poster">
              <MoviePoster key={selectedMovie.image} movie={selectedMovie} />
            </div>

            <div className="modal-content">
              <p className="movie-type">{selectedMovie.type}</p>
              <h2 id="movie-modal-title">{selectedMovie.title}</h2>
              <p className="modal-meta">
                {selectedMovie.genre} · {selectedMovie.year}
              </p>
              <p className="modal-synopsis">{selectedMovie.synopsis}</p>
              <p className="modal-duration">
                {selectedMovie.type === "Serie"
                  ? `${selectedMovie.seasons} temporada${selectedMovie.seasons === 1 ? "" : "s"}`
                  : selectedMovie.duration}
              </p>

              <button
                type="button"
                className="favorite-button modal-favorite"
                aria-pressed={isFavorite(selectedMovie.id)}
                onClick={() => toggleFavorite(selectedMovie.id)}
              >
                {isFavorite(selectedMovie.id)
                  ? "★ Quitar de favoritos"
                  : "☆ Agregar a favoritos"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
