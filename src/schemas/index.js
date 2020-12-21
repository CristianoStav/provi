import Joi from 'joi';

const commun = {
  access_token: Joi.string().required()
}

const login = Joi.object().keys({
  email: Joi.string().required().not(null).email({ minDomainSegments: 2, tlds: true }),
  password: Joi.string().required().max(20)
});

const full_name = Joi.object().keys({
  ...commun,
  full_name: Joi.string().required()
});

const cpf = Joi.object().keys({
  ...commun,
  cpf: Joi.string().min(11).required()
});

const phone = Joi.object().keys({
  ...commun,
  phone: Joi.number().required(),
});

const birthday = Joi.object().keys({
  ...commun,
  birthday: Joi.string().regex(/^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/).required()
});

const address = Joi.object().keys({
  ...commun,
  cep: Joi.number().required(),
  street: Joi.string().required(),
  number: Joi.number().required(),
  complement: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().length(2).required()
});

const request_amount = Joi.object().keys({
  ...commun,
  request_amount: Joi.number().required()
})

export { login, full_name, cpf, phone, birthday, address, request_amount };