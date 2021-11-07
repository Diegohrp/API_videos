const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoMocks');

const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', () => {
  //En los servicios service/movieService se intercepta
  //el llamado a la lib/mongo.js y se reemplaza por
  //el MongoLibMock (nuestro stub de la librería de llamado a BD)
  const MovieService = proxyquire('../services/movieService.js', {
    '../lib/mongo.js': MongoLibMock,
  });
  //Se crea una instancia del MovieService
  //Recordemos que se han reemplazado los métodos de la lib
  //por los del stub MongoLibMock (para simular)
  const movieService = new MovieService();

  describe('When getMovies method is called', async () => {
    //Se quiere probar que se hacen los llamados a los métodos.
    it('should call the getall MongoLib method', async () => {
      //El servicio llama al método getMovies() del Mock que reemplazó a la lib
      await movieService.getMovies({});
      //Con assert comparamos si getAllStub.called = true
      //getAllStub es un stub del método getAll de lib/mongo.js
      //getAllStub fue creado con sinon en MongoLibMock
      //Sinon nos ayuda a saber si el método fue llamado
      //Cuando se hizo movieService.getMovies({}) el servicio ejecutó
      //su método getMovies() el cuál llama al método getAll()
      //que para este caso debió llamar al stub de getAll (getAllStub())
      //Sinon nos dice si ese llamado fue hecho.
      //Si fue así, el test se pasa. Funcionalidad correcta.
      assert.deepStrictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async () => {
      const result = await movieService.getMovies({});
      //Verificar si la respuesta del método es la lista (moviesMock)
      assert.deepStrictEqual(result, moviesMock);
    });
  });
});
