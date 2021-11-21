const boom = require('@hapi/boom');

function scopesValidationHandler(requiredScopes) {
  return function (req, res, next) {
    //Verificar si el usuario existe  y tiene scopes
    //Si no existe o si existe pero no tiene scopes
    //no está autorizado.
    if (!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing scopes'));
    }

    //Por parámetros se pasa un array de scopes
    //Se quiere saber si el usuario cuenta con los scopes requeridos
    const Userscopes = requiredScopes.map((scope) =>
      req.user.scopes.includes(scope)
    );
    //Si falta alguno de los scopes requeridos, el usuario no tiene acceso
    const hasAccess = !Userscopes.includes(false);
    if (hasAccess) {
      next();
    } else {
      next(boom.unauthorized('insufficient scopes'));
    }
  };
}

module.exports = scopesValidationHandler;
