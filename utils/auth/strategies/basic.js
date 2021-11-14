const passport = require('passport');
const { BasicStrategy } = require('passport-http');
//Se utiliza boom para desplegar los errores.
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/userService');

passport.use(
  new BasicStrategy(async (email, password, done) => {
    //instancia del servicio de usuario
    const userService = new UserService();
    try {
      //Se obtiene el usuario correspondiente a ese email
      const user = await userService.getUser({ email });

      //Se verifica si el usuario exite
      if (!user) {
        //done(error,user)
        //done es un callback que recibe un error si lo hay y al usuario
        //Es un requisito de la librería
        return done(boom.unauthorized('Usuario no existe'), false);
      }
      //Si el usuario existe, se comparan las contraseñas
      if (!(await bcrypt.compare(password, user.password))) {
        //Si no coinciden contraseñas, lanza error al usuario
        return done(boom.unauthorized(), false);
      }
      //Si coinciden contraseñas, eliminamos esa parte
      //para que no quede en la aplicación ya que no se
      //requiere más y es un dato sensible
      delete user.password;
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
