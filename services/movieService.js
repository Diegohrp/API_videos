const MongoLib = require('../lib/mongo');

class MovieService {
  constructor() {
    //Nombre de la colección en la base de datos
    this.collection = 'movies';
    //Creamos un objeto de la clase MongoLib que fue importada, para acceder a los métodos
    //del CRUD.
    this.MongoDB = new MongoLib();
  }
  //Recordemos que la conexión con la base es asíncrona y se utilizaron promesas en la librería
  //Por ello todos los métodos de los servicios son asíncornos (async/await)

  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.MongoDB.getAll(this.collection, query);
    return movies || [];
  }
  async getMovie(movieId) {
    //Únicamente se ejecutan los métodos de la librería y se
    //Devuelve la data obtenida de la DB, o vacío en caso de que no exista info.
    const movie = await this.MongoDB.getOne(this.collection, movieId);
    return movie || {};
  }
  async createMovie(movie) {
    const newMovie = await this.MongoDB.create(this.collection, movie);
    return newMovie;
  }
  async updateMovie(movieId, movie) {
    const newMovie = await this.MongoDB.update(this.collection, movieId, movie);
    return newMovie;
  }
  async deleteMovie(movieId) {
    const deletedMovie = await this.MongoDB.delete(this.collection, movieId);
    return deletedMovie;
  }
}

module.exports = MovieService;
