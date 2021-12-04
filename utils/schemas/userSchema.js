//Esquema de usuario, qué formato deben cumplir la
//informacion del usuario

const joi = require('joi');
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const nameSchema = joi.string().required();
const emailSchema = joi.string().email().required();
const passwordSchema = joi.string().required();
const isAdminSchema = joi.bool();

const createUserSchema = joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
const createProviderUserSchema = joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  apiKeyToken: joi.string().required(),
});
module.exports = {
  userIdSchema,
  createUserSchema,
  createProviderUserSchema,
};
