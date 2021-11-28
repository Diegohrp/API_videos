const joi = require('joi');
const { userIdSchema } = require('./userSchema');
const { movieIdSchema } = require('./MovieSchemas');

//Esquema de Id de la película pero como parte de la lista de un usuario
const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserMovieSchema = joi.object({
  userId: userIdSchema,
  movieId: movieIdSchema,
});

module.exports = {
  userMovieIdSchema,
  createUserMovieSchema,
};
