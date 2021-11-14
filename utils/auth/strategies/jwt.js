const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UserService = require('../../../services/userService');
//De las variables de entorno se obtiene el secret
//para cifrar el JWT
const { config } = require('../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      //el JWT se extrae del Header de la petición como Bearer Token
      //Un bearer token (token portador) es un tipo de token de auth
      //que dice: da acceso a la API a cualquiera que porte este bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (tokenPayload, done) => {
      const userService = new UserService();
      try {
        //El email de usuario se obtiene del payload del token
        const user = await userService.getUser({ email: tokenPayload.email });

        //se verfica si el usuario existe
        if (!user) {
          return done(boom.unauthorized(), false);
        }
        //si el usuario existe, se elimina el password del obj
        //para no tener data sensible en la app
        delete user.password;
        //se obtienen los scopes del tokenPayload (permisos de usuario )
        done(null, { ...user, scopes: tokenPayload.scopes });
      } catch (error) {
        return done(error);
      }
    }
  )
);
