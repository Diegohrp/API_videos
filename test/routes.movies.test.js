//Aquí se realizan pruebas de las rutas.
//Que las rutas funcionen adecuada mente (archivo routes/movies.js)

const assert = require('assert');
const proxyquire = require('proxyquire');

//Mocsk (contenido) y MockService
const { moviesMock, MockService } = require('../utils/mocks/movies');

//Servidor de pruebas.
const testServer = require('../utils/testServer');

//describe tiene la función de decir de qué trata la prueba
//es decir, de qué prueba se trata.
//Su primer parámetro es un string con un mensaje (se imprime en consola)
//Su segundo parámetro es una función con lo que se debe realizar.
//Se pueden anidar varios describe.

//Prueba de las rutas de movies
describe('routes - movies', () => {
  //Proxyrequire nos ayuda a interceptar el require de MoviService
  //y reemplazarlo por MockService en el archivo de /routes/movie.js (En nuestras rutas)
  const route = proxyquire('../routes/movies.js', {
    '../services/movieService': MockService,
  });
  //Al test server le pasamos la ruta, para levantar el servidor.
  //Request es el servidor ya levantado listo para recibir peticiones.
  const request = testServer(route);
  //Nueva descripción, prueba de obtener movies.
  describe('GET /movies', () => {
    //it es para decir qué es lo que se debe obtener como "correcto", en la prueba.
    it('should respond with a status 200', (done) => {
      //se realiza la petición (get) a la ruta "/api/movies"
      //.expect() indica lo que se espera obtener, en este caso un
      //status 200 (todo OK), done es un parámetro se se recibe e indica que
      //La prueba ha finalizado, se coloca en expect para finalizar esta prueba.
      request.get('/api/movies').expect(200, done);
    });

    it('should respond with the list of movies', (done) => {
      // .end() recibe un callback
      request.get('/api/movies').end((err, res) => {
        //res es la respuesta de la petición
        //se comprueba si la respuesta es recibida con el formato adecuado.
        //assert es una librería que nos ayuda a comparrar objetos.
        //se compara que el response.body, que el cuerpo de la respuesta
        //cumpla con que sea la lista de películas tal y como está en el Mock
        //Y el mensaje sea el adecuado, exactamente el que se indica.
        //Esto no ayuda a probar que la información solicitada se envía y recibe
        //tal y como se espera.
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          msg: 'Movies have been listed',
        });
        //Si se cumple con lo anterior, la prueca es exitosa, done() para finalizarla.
        done();
      });
    });
  });
});
