const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const { config } = require('../config');
//Para el sign up
const UserService = require('../services/userService');
const { createUserSchema } = require('../utils/schemas/userSchema');
const validationHandler = require('../utils/middlewares/validationHandler');

//Basic Strategy
//Es como copiar ese segmento de código y pegarlo aquí
require('../utils/auth/strategies/basic');

const authAPI = (app) => {
  const router = express.Router();
  app.use('/api/auth', router);
  //Instancias el ApiKeysService
  const apiKeysService = new ApiKeysService();
  const userService = new UserService();

  //Qué hacer en una petición post, (sign In)
  router.post('/sign-in', async (req, res, next) => {
    //Se obtiene el apiKeyToken del body
    const { apiKeyToken } = req.body;
    //Se verifica si existe ese apiKeyToken
    if (!apiKeyToken) {
      return next(boom.unauthorized('Api Key Token is required'));
    }
    //Si existe el apiKeyToken
    //Se autentica con la estrategia basic que implementamos
    //En el string se indica que se utilice basic
    //En basic.js le dijimos a passport que usara nuestro código como BasicStrategy
    //Se utiliza un custom callback
    passport.authenticate('basic', (error, user) => {
      //basic.js (Basic Strategy) retorna o un usuario
      //o un error, verificamos qué es lo que retorna
      try {
        if (error || !user) {
          return next(error);
        }
        //Se loggea al usuario, no se va a hacer uso de
        //Sesiones, por eso se indica como false
        req.login(user, { session: false }, async (error) => {
          if (error) {
            return next(error);
          }

          //Se obtiene el apiKey a partir del token
          //el apiKey es un objeto que contiene los scopes (permisos)
          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });
          if (!apiKey) {
            return next(boom.unauthorized("There's no Api Key"));
          }
          //extraemos los atributos del objeto usuario
          const { _id: id, name, email } = user;
          //Creamos el payload del JWT
          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };
          //Se firma el token, payload y secret para encriptarlo
          const token = jwt.sign(payload, config.authJwtSecret, {
            //El token expira en 15minutos
            expiresIn: '15m',
          });
          //se retorna el token y el usuario en el response
          return res.status(200).json({ token, user });
        });
      } catch (error) {
        next(error);
      }
      //Ya que se usó un custom callback, se utiliza un closure
      //Para acceder a req,res, y next
    })(req, res, next);
  });

  //Sign up
  router.post(
    '/sign-up',
    validationHandler(createUserSchema),
    async (req, res, next) => {
      //const userService = new UserService();
      //Los datos del usuario se obtienen del body del request
      const user = req.body;
      try {
        const userExists = await userService.getUser({ email: user.email });
        if (userExists) {
          next(boom.badRequest('this email already exists'));
        } else {
          const userCreatedId = await userService.createUser({ user });
          res.status(201).json({
            msg: 'User created succesfully',
            data: userCreatedId,
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = authAPI;
