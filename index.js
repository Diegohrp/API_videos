const express = require('express');
const app = express();
//const debug = require('debug')('app:server');
const { config } = require('./config/index');
//middlewares de error
const {
  logErrors,
  errorHandler,
  wrapError,
} = require('./utils/middlewares/errorHandlers');

//middleware not found 404
const notFoundHandler = require('./utils/middlewares/notFoundHandler');

//Se importa nuestro controlador moviesAPI /routes
const moviesAPI = require('./routes/movies');

//API para películas de usuario
const userMoviesAPI = require('./routes/userMovies');

//body parser, para que pueda comprender JSON. (middleware)
app.use(express.json());
//La función se encarga de gestionar las peticiones, sólo le pasamos app.
//(middleware)
moviesAPI(app);
userMoviesAPI(app);

//Los middlewares de error van al final del que realiza las peticiones
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

//notFound handler
app.use(notFoundHandler);

app.listen(config.port, () => {
  console.log(`Listening: http://localhost:${config.port}`);
});
