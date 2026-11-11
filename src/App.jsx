/*function App() {
  return (
    <main>
      <h1>Explorador de películas y series</h1>
      <p>Proyecto base listo para comenzar la implementación.</p>
    </main>
  )
}

export default App
*/
import movies from "./data/movies";

function App() {
  return (
    <main>
      <h1>Explorador de películas y series</h1>

      <p>Total de películas y series: {movies.length}</p>

      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.genre}</p>
          <p>{movie.type}</p>
        </div>
      ))}
    </main>
  );
}

export default App;