//sinon es una librería que nos ayuda a crear un stub
const sinon = require('sinon');

const { moviesMock, filterMockMovies } = require('./movies');

//Los métodos de lib/mongo.js serán reemplazados por los Stubs
//creados con sinon.
//Lo que hacen los stubs es simular el comportamiento
//Con .resolves() se indica qué es lo que se debe hacer
//En los casos siguientes, se devuelve la lista de películas
//O se devuelve el id de la primera en la lista de mocks
//Que sería lo que se devolvería en una ejecución del método real.

//Stub del método getAll de la librería de mongo
const getAllStub = sinon.stub();
//withArgs indica cómo actua ("cómo se resuelve"), cuando
//se el envían esos argumentos.
getAllStub.withArgs('movies').resolves(moviesMock);

//Stub del método getAll de la librería de mongoDB (creada por nosostros)
//cuando se filtra por tags
const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filterMockMovies);

//Stub del método create de la librería de mongoDB (creada por nosotros)
const createStub = sinon.stub();
createStub.withArgs('collection', 'data').resolves(moviesMock[0].id);

//Un mock de la lib/mongo.js. Simula su comportamiento.
//Contiene algunos de sus métodos (los que se van a probar)
class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = { MongoLibMock, getAllStub, createStub };
