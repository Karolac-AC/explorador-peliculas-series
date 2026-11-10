# Explorador de películas y series

Proyecto del **Tema 3: Programación del lado del cliente - Manejo de Frameworks**.

La aplicación permitirá explorar un catálogo de películas y series utilizando **React**, componentes, manejo de estado y renderizado dinámico.

## Objetivo

Desarrollar una aplicación web interactiva que permita consultar, buscar, filtrar y guardar como favoritos películas y series.

## Requisitos funcionales

- Mostrar un catálogo de al menos 20 películas o series mediante un arreglo de objetos.
- Mostrar cada elemento en una tarjeta con imagen, título y género.
- Buscar contenido por título.
- Filtrar por género.
- Filtrar por tipo: película o serie.
- Mostrar información detallada: sinopsis, año, duración o temporadas.
- Marcar y desmarcar contenido como favorito.
- Mostrar una sección especial con los favoritos.
- Diseñar una interfaz sencilla y adaptable a diferentes pantallas.

> No se utilizará backend, base de datos ni API. Los datos estarán almacenados localmente dentro del proyecto.

## Tecnología

- React
- Vite
- JavaScript
- CSS

## Organización del equipo

### Karol - Lógica y React
Responsable principalmente de:
- Configuración inicial.
- Datos del catálogo.
- Estado y eventos.
- Búsqueda.
- Filtros.
- Detalles.
- Favoritos.
- Integración de componentes.

### Compañera - Diseño/UI
Responsable principalmente de:
- Diseño general de la interfaz.
- Header.
- Tarjetas.
- Buscador y filtros visuales.
- Vista visual de detalles.
- Vista visual de favoritos.
- CSS.
- Diseño adaptable.

## Flujo de ramas

- `main`: versión estable.
- `develop`: integración del trabajo.
- `feature/logica-react`: trabajo de lógica y funcionalidad.
- `feature/diseno-ui`: trabajo de interfaz y estilos.

Los cambios de las ramas `feature/*` deberán integrarse primero en `develop`. Cuando la aplicación esté estable, `develop` se integrará en `main`.

## Estructura propuesta

```
src/
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── Filters.jsx
│   ├── MovieCard.jsx
│   ├── MovieDetails.jsx
│   └── Favorites.jsx
├── data/
│   └── movies.js
├── App.jsx
├── App.css
└── main.jsx
```

## Ejecución

Cuando el proyecto React esté inicializado:

```bash
npm install
npm run dev
```

## Forma de trabajo

1. Tomar una issue.
2. Trabajarla en la rama correspondiente.
3. Realizar commits claros.
4. Subir los cambios.
5. Crear un Pull Request hacia `develop`.
6. Revisar e integrar los cambios.
7. Al finalizar el proyecto, integrar `develop` en `main`.
