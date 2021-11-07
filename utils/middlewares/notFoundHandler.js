const boom = require('@hapi/boom');
//Este middleware no requiere de next() ya que es el que se llama al final.
//Debido a que ya se ha pasado por todas las rutas existentes
function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;
