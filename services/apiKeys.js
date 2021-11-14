const MongoLib = require('../lib/mongo');

class ApiKeysService {
  constructor() {
    this.collection = 'api-keys';
    this.mongoDB = new MongoLib();
  }

  async getApiKey({ token }) {
    //obten el objeto apiKey de la base, cuyo atributo token sea el
    //token se se pasa por parámetros.
    //getAll develve un array, aquí como se obtiene un solo elemento
    //Se tiene un array de objetos de tamaño 1, entonces mejor se
    //extrae el elemento del array [apiKey]
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });

    return apiKey;
  }
}

module.exports = ApiKeysService;
