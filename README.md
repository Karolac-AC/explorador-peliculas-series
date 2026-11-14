# Explorador de películas y series

Proyecto del **Tema 3: Programación del lado del cliente - Manejo de Frameworks**.

La aplicación permite explorar un catálogo de películas y series utilizando **React**, componentes, manejo de estado y renderizado dinámico.

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

El catálogo y los pósters se guardan dentro del proyecto. Los favoritos se conservan en el navegador con `localStorage`. Los avances opcionales se reproducen mediante videos incrustados de YouTube y requieren internet.

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

### Nickte - Diseño/UI
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

## Componentes

Los componentes de la interfaz están en `src/App.jsx`.

- `App` coordina la portada, el menú, la búsqueda, los filtros, los detalles y la lista de favoritos. Usa el estado de React para actualizar la interfaz en respuesta a las acciones del usuario.
- `CatalogRow` organiza los títulos en filas con desplazamiento horizontal. `RevealCard` anima la entrada de cada tarjeta al aparecer en pantalla.
- `MoviePoster` muestra la carátula y ofrece una alternativa si la imagen falla. `TrailerPoster` añade la vista previa del tráiler.
- `NavigationIcon` muestra los íconos de Explorar y Favoritos.

El arreglo de 20 títulos está en `src/data/movies.js` y las carátulas están en `public/images`.

## Instalación y ejecución

Con Node.js y npm instalados, abre una terminal en la carpeta del proyecto:

```bash
npm ci
npm run dev
```

Abre la dirección que indique Vite en la terminal. Para generar la versión de producción, ejecuta `npm run build`.

## Forma de trabajo

1. Tomar una issue.
2. Trabajarla en la rama correspondiente.
3. Realizar commits claros.
4. Subir los cambios.
5. Crear un Pull Request hacia `develop`.
6. Revisar e integrar los cambios.
7. Al finalizar el proyecto, integrar `develop` en `main`.
