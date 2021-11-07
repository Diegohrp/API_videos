const { config } = require('../../config');
const boom = require('@hapi/boom');

function withErrorStack(error, stack) {
  //Si nos encontramos en desarrollo, el error se presenta
  //con todo y stack
  if (config.dev) {
    return { ...error, stack };
  } else {
    return error;
  }
}

//Se maneja (err,req,res,next) aunue no todos los parámetros se usen,
//ya que de esta manera express identifica que se trata de un middleware de error

function logErrors(err, req, res, next) {
  console.error(err);
  //next(err) llama al siguiente middleware de error (wrapError)
  next(err);
}
//El error generado se cambia al formato de boom
function wrapError(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

/* eslint-disable */
function errorHandler(err, req, res, next) {
  //el error es de tipo boom, se obtiene el statusCode y el payload (contenido del error)
  const {
    output: { statusCode, payload },
  } = err;
  //En la respuesta se manda el status del error
  res.status(statusCode);
  //Dependiendo si se está en dev o prod, es cómo se imrpime
  //el error en la API
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapError,
  errorHandler,
};
