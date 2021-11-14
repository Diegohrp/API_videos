const express = require('express');
const MovieService = require('../services/movieService');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/MovieSchemas');
const validationHandler = require('../utils/middlewares/validationHandler');

//Importamos el servicio de movies.
const movieService = new MovieService();

//Cache
const cacheResponse = require('../utils/cache/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

//Para protejer las rutas
const protectRoutes = require('../utils/middlewares/protectRoutes');

//Recibe el parámetro app, el cual es la app de express.
const moviesAPI = (app) => {
  //Para crear nuestra ruta: URL donde se hace la petición GET
  const router = express.Router();
  //middleware para proteger las rutas
  app.use(protectRoutes);

  app.use('/api/movies', router);

  //Petición GET: desde el home / (o sea /api/movies)
  //Obtener todas las películas
  router.get('/', async (request, response, next) => {
    cacheResponse(response, FIVE_MINUTES_IN_SECONDS);
    const tags = request.query.tags;
    try {
      //Se ejecuta el método del servicio para obtener las películas.
      //Recordemos que se maneja asincronismo, por lo que se utiliza await.
      //Todos los métodos del servicio devuelven info, esa es data.
      const data = await movieService.getMovies({ tags });

      //Una vez obtenida la info se realiza la respuesta a la petición.
      //Status 200, todo OK
      response.status(200).json({
        //Como un JSON se manda la info (data) y un mensaje
        data: data,
        msg: 'Movies have been listed',
      });
    } catch (error) {
      //forma estandar de manejar errores en Express
      next(error);
    }
  });
  //Obtener una película)
  //El schema es {movieId:movieIdSchema}
  //se verifica si el Id obtenido de params cumple con le schema definido (moviIdSchema)
  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (request, response, next) => {
      cacheResponse(response, SIXTY_MINUTES_IN_SECONDS);
      //El id se pobtiene de la url
      const movieId = request.params.movieId;
      try {
        //Crea una promesa que se resuelve con los datos
        //de las películas (movies del mock)
        //Espera hasta que se resuelva la promesa.
        const data = await movieService.getMovie(movieId);
        response.status(200).json({
          data: data,
          msg: 'You got the movie',
        });
      } catch (error) {
        //forma estandar de manejar errores en Express
        next(error);
      }
    }
  );

  //Para crear una película
  //en createMovieSchema no es necesario el check, ya que por defecto es body.
  router.post(
    '/',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(createMovieSchema),
    async (request, response, next) => {
      //se obtiene el contenido del body por medio del request.
      //Contiene toda la info para la nueva película.
      const { body: movieContent } = request;
      try {
        const movie = await movieService.createMovie(movieContent);
        //Para creación de un registro, el status OK es 201
        response.status(201).json({
          data: movie,
          msg: 'Movie has been created',
        });
      } catch (error) {
        //forma estandar de manejar errores en Express
        next(error);
      }
    }
  );

  //Actualizar una película
  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async (request, response, next) => {
      //Se obtiene toda la info del body por medio del request
      const { body: movie } = request;
      //Se obtiene el Id por medio de la URL.
      const { movieId } = request.params;
      try {
        const updatedMovie = await movieService.updateMovie(movieId, movie);
        response.status(200).json({
          data: updatedMovie,
          msg: 'Movie updated',
        });
      } catch (error) {
        //forma estandar de manejar errores en Express
        next(error);
      }
    }
  );

  //Para eliminar una película.
  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (request, response, next) => {
      const { movieId } = request.params;
      try {
        const deletedMovie = await movieService.deleteMovie(movieId);
        response.status(200).json({
          data: deletedMovie,
          msg: 'Movie deleted',
        });
      } catch (error) {
        //forma estandar de manejar errores en Express
        next(error);
      }
    }
  );
};

module.exports = moviesAPI;
