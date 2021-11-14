const passport = require('passport');
const boom = require('@hapi/boom');

require('../auth/strategies/jwt');

//middleware para proteger las rutas
//sólo se puede acceder a ellas si se está autenticado
//(si se cuenta con un token válido)
const protectRoutes = (req, res, next) => {
  passport.authenticate('jwt', (error, user) => {
    if (error || !user) {
      next(boom.unauthorized());
    } else {
      req.login(user, { session: false }, async (error) => {
        if (error) {
          next(error);
        } else {
          next();
        }
      });
    }
  })(req, res, next);
};

module.exports = protectRoutes;
