const express = require('express');
const supertest = require('supertest');

//Se crea un pequeño servidor de pruebas
//Supertest es una librería que nos permite hacer peticiones GET,POST,PUT, etc.
function testServer(route) {
  //Creamos nuesta app de express
  const app = express();
  //Para que entienda JSON.
  app.use(express.json());

  //route es una función
  //Es MoviesAPI pero que en lugar de utilizar el servicio de MoviesService (peticiones a DB).
  //Utiliza el servcio de MockService.
  route(app);
  return supertest(app);
}

module.exports = testServer;
