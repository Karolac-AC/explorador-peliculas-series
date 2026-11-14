import { useEffect, useMemo, useRef, useState } from "react";
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

function TrailerPoster({ movie, active, onStart, onStop }) {
  const timer = useRef();
  const trailerId = movie.trailerId;

  useEffect(() => () => clearTimeout(timer.current), []);

  const stop = () => {
    clearTimeout(timer.current);
    onStop();
  };

  return (
    <div
      className="trailer-poster"
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse" || !trailerId ||
          !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;

        timer.current = setTimeout(onStart, 650);
      }}
      onPointerLeave={stop}
      onKeyDown={(event) => {
        if (event.key === "Escape") stop();
      }}
    >
      <MoviePoster movie={movie} />
      {active && (
        <iframe
          className="trailer-preview"
          title={`Avance de ${movie.title}`}
          src={`https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&start=12&end=27`}
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
        />
      )}
      {trailerId && (
        <button
          className="trailer-toggle"
          type="button"
          aria-label={`Vista previa de ${movie.title}`}
          aria-pressed={active}
          onClick={() => {
            clearTimeout(timer.current);
            if (active) onStop();
            else onStart();
          }}
        >
          {active ? "■" : "▶"}
        </button>
      )}
    </div>
  );
}

function RevealCard({ children }) {
  const card = useRef(null);

  useEffect(() => {
    const element = card.current;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.classList.remove("awaiting-reveal");
      observer.disconnect();
    }, { threshold: 0.12 });

    element.classList.add("awaiting-reveal");
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.classList.remove("awaiting-reveal");
    };
  }, []);

  return <article ref={card} className="movie-card">{children}</article>;
}

const catalogRows = [
  { title: "Noche de cine", items: movies.filter((movie) => movie.type === "Película" && movie.genre !== "Animación") },
  { title: "Historias por episodios", items: movies.filter((movie) => movie.type === "Serie") },
  { title: "Mundos animados", items: movies.filter((movie) => movie.type === "Película" && movie.genre === "Animación") },
];

function CatalogRow({ title, children }) {
  const track = useRef(null);

  const scroll = (direction) => {
    const element = track.current;
    element.scrollBy({
      left: direction * element.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section className="catalog-row" aria-label={title}>
      <div className="row-heading">
        <h3>{title}</h3>
        <div className="row-controls">
          <button type="button" aria-label={`Retroceder en ${title}`} onClick={() => scroll(-1)}>‹</button>
          <button type="button" aria-label={`Avanzar en ${title}`} onClick={() => scroll(1)}>›</button>
        </div>
      </div>
      <div className="movie-grid row-track" ref={track}>{children}</div>
    </section>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("explorar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [featuredFocused, setFeaturedFocused] = useState(false);
  const menuButton = useRef(null);
  const searchInput = useRef(null);
  const searchRequested = useRef(false);
  const featuredMovie = movies[featuredIndex];
  const [logoFailed, setLogoFailed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [preview, setPreview] = useState(null);
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

  useEffect(() => {
    if (rotationPaused || featuredFocused || menuOpen || selectedMovie || activeSection !== "explorar") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!reducedMotion.matches && !document.hidden) {
        setFeaturedIndex((index) => (index + 1) % movies.length);
      }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [activeSection, featuredFocused, featuredIndex, menuOpen, rotationPaused, selectedMovie]);

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
  const hasFilters = searchTerm.trim() !== "" || selectedType !== "Todos" || selectedGenre !== "Todos";

  useEffect(() => {
    if (activeSection === "explorar" && searchRequested.current) {
      searchRequested.current = false;
      searchInput.current?.focus();
    }
  }, [activeSection]);

  const openSearch = () => {
    setMenuOpen(false);
    setPreview(null);
    if (activeSection === "explorar") searchInput.current?.focus();
    else {
      searchRequested.current = true;
      setActiveSection("explorar");
    }
  };

  const navigate = (section) => {
    setPreview(null);
    setActiveSection(section);
    setMenuOpen(false);
    menuButton.current?.focus();
    window.scrollTo(0, 0);
  };

  const changeFeatured = (direction) => {
    setFeaturedIndex((index) => (index + direction + movies.length) % movies.length);
  };

  const toggleFavorite = (movieId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(movieId)
        ? currentFavorites.filter((id) => id !== movieId)
        : [...currentFavorites, movieId]
    );
  };

  const renderPoster = (movie, section) => {
    const key = `${section}-${movie.id}`;
    return (
      <TrailerPoster
        movie={movie}
        active={preview === key && activeSection === section && !selectedMovie}
        onStart={() => setPreview(key)}
        onStop={() => setPreview((current) => current === key ? null : current)}
      />
    );
  };

  const renderCatalogCard = (movie) => (
      <RevealCard key={movie.id}>
        {renderPoster(movie, "explorar")}
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
              onClick={() => {
                setPreview(null);
                setSelectedMovie(movie);
              }}
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
      </RevealCard>
  );

  return (
    <div className="app">
      <header
        className="app-header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
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



        <div className="header-actions">
          <button className="menu-toggle" type="button" onClick={openSearch}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6" />
              <path d="m15 15 5 5" />
            </svg>
            Buscar
          </button>
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-controls="main-navigation"
            aria-expanded={menuOpen}
            onClick={() => {
              setPreview(null);
              setMenuOpen((open) => !open);
            }}
          >
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
            Menú
          </button>
        </div>

        <nav id="main-navigation" className="main-navigation" aria-label="Navegación principal" hidden={!menuOpen}>
          <button
            type="button"
            className="nav-item"
            aria-current={activeSection === "explorar" ? "page" : undefined}
            aria-controls="explorar"
            onClick={() => navigate("explorar")}
          >
            <NavigationIcon name="explorar" />
            <span>Explorar</span>
          </button>

          <button
            type="button"
            className="nav-item"
            aria-current={activeSection === "favoritos" ? "page" : undefined}
            aria-controls="favoritos"
            onClick={() => navigate("favoritos")}
          >
            <NavigationIcon name="favoritos" />
            <span>Favoritos</span>
          </button>
        </nav>

      </header>

      <main className="catalog">
        <section
          id="explorar"
          aria-labelledby="explorar-title"
          hidden={activeSection !== "explorar"}
        >
          <div className="featured">
            <img key={featuredMovie.image} className="featured-art" src={featuredMovie.image} alt="" />
            <div
              key={featuredMovie.id}
              className="featured-content"
              onFocus={() => setFeaturedFocused(true)}
              onBlur={() => setFeaturedFocused(false)}
            >
              <p className="eyebrow">{featuredMovie.type} destacada</p>
              <h2>{featuredMovie.title}</h2>
              <p className="featured-meta">
                {featuredMovie.year} · {featuredMovie.genre} ·{" "}
                {featuredMovie.type === "Serie"
                  ? `${featuredMovie.seasons} ${featuredMovie.seasons === 1 ? "temporada" : "temporadas"}`
                  : featuredMovie.duration}
              </p>
              <p className="featured-synopsis">{featuredMovie.synopsis}</p>
              <button
                type="button"
                className="details-button featured-button"
                onClick={() => {
                  setPreview(null);
                  setSelectedMovie(featuredMovie);
                }}
              >
                Ver detalles de {featuredMovie.title}
              </button>
            </div>
            <div className="featured-controls">
              <a href="#explorar-title">Ver catálogo <span aria-hidden="true">↓</span></a>
              <div className="featured-pagination">
                <button type="button" aria-label="Portada anterior" onClick={() => changeFeatured(-1)}>‹</button>
                <span>{featuredIndex + 1} / {movies.length}</span>
                <button type="button" aria-label="Siguiente portada" onClick={() => changeFeatured(1)}>›</button>
                <button
                  type="button"
                  className="rotation-toggle"
                  aria-label={rotationPaused ? "Reanudar rotación de portadas" : "Pausar rotación de portadas"}
                  onClick={() => setRotationPaused(!rotationPaused)}
                >
                  {rotationPaused ? "▶" : "Ⅱ"}
                </button>
              </div>
            </div>
          </div>

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
                ref={searchInput}
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  setPreview(null);
                  setSearchTerm(event.target.value);
                }}
                placeholder="Ej. Interstellar"
              />
            </label>

            <label className="filter-field">
              <span>Tipo</span>
              <select
                value={selectedType}
                onChange={(event) => {
                  setPreview(null);
                  setSelectedType(event.target.value);
                }}
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
                onChange={(event) => {
                  setPreview(null);
                  setSelectedGenre(event.target.value);
                }}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>
          </section>

          {!hasFilters ? (
            <div className="catalog-rows">
              {catalogRows.map(({ title, items }) => (
                <CatalogRow key={title} title={title}>
                  {items.map(renderCatalogCard)}
                </CatalogRow>
              ))}
            </div>
          ) : filteredMovies.length > 0 ? (
            <section className="movie-grid" aria-label="Catálogo de películas y series">
              {filteredMovies.map(renderCatalogCard)}
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
                <RevealCard key={movie.id}>
                  {renderPoster(movie, "favoritos")}

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
                        onClick={() => {
                          setPreview(null);
                          setSelectedMovie(movie);
                        }}
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
                </RevealCard>
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
