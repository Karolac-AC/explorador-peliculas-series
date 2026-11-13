
import movies from "./data/movies";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <h1>NOW MOVIE</h1>
          <p>PELÍCULAS Y SERIES</p>
        </div>

        <span className="header-label">Tu próxima historia empieza aquí</span>
      </header>

      <main className="catalog">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">EXPLORA EL CATÁLOGO</p>
            <h2>Descubre qué ver</h2>
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
      </main>
    </div>
  );
}

export default App;
