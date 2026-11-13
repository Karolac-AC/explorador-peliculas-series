
import { useState } from "react";
import movies from "./data/movies";

const logoUrl = import.meta.glob("./assets/now-movie-logo.png", {
  eager: true,
  query: "?url",
  import: "default",
})["./assets/now-movie-logo.png"];

function NavigationIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === "explorar" ? (
        <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 3v6M15 3v6M10 13l5 3-5 3z" /></>
      ) : (
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
      )}
    </svg>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("explorar");
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <div className={logoUrl && !logoFailed ? "brand brand-with-logo" : "brand"}>
          {/* Conserva la identidad textual si la imagen falta o falla al cargar. */}
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
          <button type="button" className="nav-item" aria-current={activeSection === "explorar" ? "page" : undefined} aria-controls="explorar" onClick={() => setActiveSection("explorar")}>
            <NavigationIcon name="explorar" />
            <span>Explorar</span>
          </button>
          <button type="button" className="nav-item" aria-current={activeSection === "favoritos" ? "page" : undefined} aria-controls="favoritos" onClick={() => setActiveSection("favoritos")}>
            <NavigationIcon name="favoritos" />
            <span>Favoritos</span>
          </button>
        </nav>
        <p className="header-label">Tu próxima historia empieza aquí</p>
      </header>

      <main className="catalog">
        <section id="explorar" aria-labelledby="explorar-title" hidden={activeSection !== "explorar"}>
          <div className="catalog-heading">
            <div>
              <p className="eyebrow">EXPLORA EL CATÁLOGO</p>
              <h2 id="explorar-title">Descubre qué ver</h2>
              <p>Encuentra películas y series para tu próxima historia.</p>
            </div>
            <span className="catalog-count">{movies.length} títulos</span>
          </div>

          <section className="movie-grid" aria-label="Catálogo de películas y series">
            {movies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <div className="movie-poster">
                  <span>{movie.type}</span>
                  <strong>{movie.title}</strong>
                </div>

                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.genre} · {movie.year}</p>
                </div>
              </article>
            ))}
          </section>
        </section>
        <section id="favoritos" aria-labelledby="favoritos-title" hidden={activeSection !== "favoritos"}>
          <div className="catalog-heading">
            <div>
              <h2 id="favoritos-title">Mis favoritos</h2>
              <p>Esta funcionalidad estará disponible próximamente.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
