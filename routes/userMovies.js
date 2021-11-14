const express = require('express');
//Importar los esquemas de validación y el manejador (validationHandler)
const {
  userMovieIdSchema,
  createUserMovieSchema,
} = require('../utils/schemas/userMovies');

const validationHandler = require('../utils/middlewares/validationHandler');
//Servicio de películas de usuario
const UserMoviesService = require('../services/userMoviesService');
const { userIdSchema } = require('../utils/schemas/userSchema');
const userMoviesService = new UserMoviesService();

//Para protejer las rutas
const protectRoutes = require('../utils/middlewares/protectRoutes');

const userMoviesAPI = (app) => {
  const router = express.Router();
  //middleware para proteger las rutas
  app.use(protectRoutes);

  app.use('/api/user-movies', router);

  //Petición get all movies
  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    async (req, res, next) => {
      const { userId } = req.query;
      try {
        const data = await userMoviesService.getUserMovies(userId);
        res.status(200).json({
          data: data,
          msg: 'user movies listed',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //Añadir película a la lista del usuario
  router.post(
    '/',
    validationHandler(createUserMovieSchema),
    async (req, res, next) => {
      const userMovie = req.body;
      try {
        const userMovieCreated = await userMoviesService.createUserMovie(
          userMovie
        );
        res.status(201).json({
          data: userMovieCreated,
          msg: 'Movie added to your list',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //eliminar película del usuario
  router.delete(
    '/:userMovieId',
    validationHandler({ userMovieId: userMovieIdSchema }, 'params'),
    async (req, res, next) => {
      const { userMovieId } = req.params;
      try {
        const userMovieDeleted = userMoviesService.deleteUserMovie(userMovieId);
        res.status(200).json({
          userMovieDeleted: userMovieDeleted,
          msg: 'The movie has been removed',
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = userMoviesAPI;
