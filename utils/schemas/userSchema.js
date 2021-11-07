//Esquema de usuario, qué formato deben cumplir la
//informacion del usuario

const joi = require('joi');
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nameSchema = joi.string().max(100).required();
const emailSchema = joi.string().email().required();
const passwordSchema = joi.string().required();
const isAdminSchema = joi.bool();

const createUserSchema = {
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  isAdmin: isAdminSchema,
};

module.exports = {
  userIdSchema,
  createUserSchema,
};
