const boom = require('@hapi/boom');
const joi = require('joi');

function validateData(data, schema) {
  // Si el schema no es un joi schema, entonces conviértelo a jois schema, de lo contrario
  //retorna el schema.
  schema = !joi.isSchema(schema) ? joi.object(schema) : schema;
  const { error } = schema.validate(data);
  return error;
}
//Como parámetros se tiene un schema, que es una serie de
//reglas que debe cumplir la informacion que se manda
//check, es qué parte del HTML se debe validar, para este
//caso es el body
function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    //Tomamos el body del request, lo validamos con el
    //schema, y si no cumple se crea un error.
    const error = validateData(req[check], schema);
    //Si hay error, deja que express maneje el error con
    //un middleware de error (además el error creado es de formato boom),
    //de lo contrario ejecuta otro middleware
    error ? next(boom.badRequest(error)) : next();
  };
}
module.exports = validationHandler;
