const movies = [
  {
    id: 1,
    title: "Interstellar",
    type: "Película",
    genre: "Ciencia ficción",
    image: "/images/interstellar.jpg",
    synopsis:
      "Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.",
    year: 2014,
    duration: "2 h 49 min",
  },
  {
    id: 2,
    title: "Coco",
    type: "Película",
    genre: "Animación",
    image: "/images/coco.jpg",
    synopsis:
      "Miguel viaja accidentalmente al mundo de los muertos y busca descubrir la historia de su familia.",
    year: 2017,
    duration: "1 h 45 min",
  },
  {
    id: 3,
    title: "Stranger Things",
    type: "Serie",
    genre: "Misterio",
    image: "/images/stranger-things.jpg",
    synopsis:
      "Un grupo de amigos descubre sucesos sobrenaturales y secretos relacionados con su pequeño pueblo.",
    year: 2016,
    seasons: 4,
  },
  {
    id: 4,
    title: "The Batman",
    type: "Película",
    genre: "Acción",
    image: "/images/the-batman.jpg",
    synopsis:
      "Batman investiga una serie de crímenes mientras descubre secretos relacionados con Gotham.",
    year: 2022,
    duration: "2 h 56 min",
  },
  {
    id: 5,
    title: "Breaking Bad",
    type: "Serie",
    genre: "Drama",
    image: "/images/breaking-bad.jpg",
    synopsis:
      "Un profesor de química comienza a fabricar drogas para asegurar el futuro económico de su familia.",
    year: 2008,
    seasons: 5,
  },
  {
    id: 6,
    title: "Spider-Man: No Way Home",
    type: "Película",
    genre: "Acción",
    image: "/images/spiderman-no-way-home.jpg",
    synopsis:
      "Peter Parker enfrenta las consecuencias de que su identidad como Spider-Man sea revelada.",
    year: 2021,
    duration: "2 h 28 min",
  },
  {
    id: 7,
    title: "Wednesday",
    type: "Serie",
    genre: "Comedia",
    image: "/images/wednesday.jpg",
    synopsis:
      "Wednesday Addams investiga una serie de misterios mientras estudia en la Academia Nevermore.",
    year: 2022,
    seasons: 1,
  },
  {
    id: 8,
    title: "Avatar",
    type: "Película",
    genre: "Ciencia ficción",
    image: "/images/avatar.jpg",
    synopsis:
      "Un exmarine viaja al planeta Pandora y se involucra con una civilización extraterrestre.",
    year: 2009,
    duration: "2 h 42 min",
  },
  {
    id: 9,
    title: "The Last of Us",
    type: "Serie",
    genre: "Drama",
    image: "/images/the-last-of-us.jpg",
    synopsis:
      "Un hombre debe transportar a una joven a través de un mundo destruido por una infección.",
    year: 2023,
    seasons: 2,
  },
  {
    id: 10,
    title: "Toy Story",
    type: "Película",
    genre: "Animación",
    image: "/images/toy-story.jpg",
    synopsis:
      "Los juguetes de un niño cobran vida cuando los humanos no están presentes.",
    year: 1995,
    duration: "1 h 21 min",
  },
  {
    id: 11,
    title: "Dark",
    type: "Serie",
    genre: "Ciencia ficción",
    image: "/images/dark.jpg",
    synopsis:
      "La desaparición de un niño revela secretos y conexiones entre varias familias de un pequeño pueblo.",
    year: 2017,
    seasons: 3,
  },
  {
    id: 12,
    title: "Joker",
    type: "Película",
    genre: "Drama",
    image: "/images/joker.jpg",
    synopsis:
      "Arthur Fleck enfrenta una vida difícil que poco a poco lo transforma en una figura criminal.",
    year: 2019,
    duration: "2 h 2 min",
  },
  {
    id: 13,
    title: "The Mandalorian",
    type: "Serie",
    genre: "Ciencia ficción",
    image: "/images/the-mandalorian.jpg",
    synopsis:
      "Un cazarrecompensas viaja por diferentes planetas mientras protege a un misterioso niño.",
    year: 2019,
    seasons: 3,
  },
  {
    id: 14,
    title: "Shrek",
    type: "Película",
    genre: "Animación",
    image: "/images/shrek.jpg",
    synopsis:
      "Un ogro acepta rescatar a una princesa para recuperar la tranquilidad de su pantano.",
    year: 2001,
    duration: "1 h 30 min",
  },
  {
    id: 15,
    title: "Peaky Blinders",
    type: "Serie",
    genre: "Drama",
    image: "/images/peaky-blinders.jpg",
    synopsis:
      "Una familia criminal intenta aumentar su poder en Birmingham después de la Primera Guerra Mundial.",
    year: 2013,
    seasons: 6,
  },
  {
    id: 16,
    title: "Dune",
    type: "Película",
    genre: "Ciencia ficción",
    image: "/images/dune.jpg",
    synopsis:
      "Paul Atreides llega a un peligroso planeta que contiene el recurso más importante del universo.",
    year: 2021,
    duration: "2 h 35 min",
  },
  {
    id: 17,
    title: "The Boys",
    type: "Serie",
    genre: "Acción",
    image: "/images/the-boys.jpg",
    synopsis:
      "Un grupo intenta detener a superhéroes corruptos que utilizan sus poderes de manera irresponsable.",
    year: 2019,
    seasons: 4,
  },
  {
    id: 18,
    title: "Inside Out",
    type: "Película",
    genre: "Animación",
    image: "/images/inside-out.jpg",
    synopsis:
      "Las emociones de una niña intentan ayudarla a adaptarse a importantes cambios en su vida.",
    year: 2015,
    duration: "1 h 35 min",
  },
  {
    id: 19,
    title: "Squid Game",
    type: "Serie",
    genre: "Suspenso",
    image: "/images/squid-game.jpg",
    synopsis:
      "Personas con problemas económicos participan en juegos infantiles con consecuencias mortales.",
    year: 2021,
    seasons: 2,
  },
  {
    id: 20,
    title: "Avengers: Endgame",
    type: "Película",
    genre: "Acción",
    image: "/images/avengers-endgame.jpg",
    synopsis:
      "Los Vengadores intentan revertir las consecuencias provocadas por Thanos.",
    year: 2019,
    duration: "3 h 1 min",
  },
];

export default movies;