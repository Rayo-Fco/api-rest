import Joi from '@hapi/joi'

const RegistroValidacion = (data : any) => {
    let Schema = Joi.object().keys({
        'nombre': Joi.string()
        .min(4)
        .max(40)
        .pattern(/^[a-zA-Z]+$/)
        .required()
        .messages({
            'string.base': 'El nombre tiene que ser solo texto',
            'string.empty': 'El nombre no puede ser un campo vacio',
            'string.min':  'El nombre tiene que tener {#limit} caracteres como minimo ',
            'string.max': 'El nombre tiene que tener {#limit} caracteres como maximo ',
            'string.pattern.base' : 'El nombre tiene que tener solo texto',
            'any.required': 'El nombre es requerido'
          }),

        'apellido': Joi.string()
        .min(4)
        .max(40)
        .pattern(/^[a-zA-Z]+$/)
        .required()
        .messages({
            'string.base': 'El apellido tiene que ser solo texto',
            'string.empty': 'El apellido no puede ser un campo vacio',
            'string.min':  'El apellido tiene que tener {#limit} caracteres como minimo ',
            'string.max': 'El apellido tiene que tener {#limit} caracteres como maximo ',
            'string.pattern.base' : 'El apellido tiene que tener solo texto',
            'any.required': 'El apellido es requerido'
          }),

          'email' : Joi.string()
          .min(6)
          .max(120)
          .email()
          .required()
          .messages({
            'string.base': 'El email tiene que ser solo texto',
            'string.empty': 'El email no puede ser un campo vacio',
            'string.min':  'El email tiene que tener {#limit} caracteres como minimo ',
            'string.max': 'El email tiene que tener {#limit} caracteres como maximo ',
            'string.email' : 'El email tiene que ser valido',
            'any.required': 'El email es requerido'
          }),

          'password': Joi.string()
          .min(6)
          .max(255)
          .required()
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
          .messages({
            'string.base': 'La password tiene que ser solo texto',
            'string.empty': 'La password no puede ser un campo vacio',
            'string.min':  'La password tiene que tener {#limit} caracteres como minimo ',
            'string.max': 'La password tiene que tener {#limit} caracteres como maximo ',
            'string.pattern.base' : 'La password tiene que tener al menos una letra mayuscula, una letra minuscula y un numero',
            'any.required': 'La password es requerido'
          }),

          'usuario': Joi.string()
          .min(4)
          .max(30)
          .empty()
          .trim()
          .required()
          .messages({
            'string.base': 'El usuario tiene que ser solo texto',
            'string.empty': 'El usuario no puede ser un campo vacio',
            'string.min':  'El usuario tiene que tener {#limit} caracteres como minimo ',
            'string.max': 'El usuario tiene que tener {#limit} caracteres como maximo ',
            'any.required': 'El usuario es requerido'
          })


    })
    return Schema.validate(data, { abortEarly: false })
}

const LoginValidacion = (data : any) => {
  let Schema = Joi.object().keys({
    'usuario': Joi.string()
        .min(4)
        .max(30)
        .empty()
        .trim()
        .required()
        .messages({
          'string.base': 'El usuario tiene que ser solo texto',
          'string.empty': 'El usuario no puede ser un campo vacio',
          'string.min':  'El usuario tiene que tener {#limit} caracteres como minimo ',
          'string.max': 'El usuario tiene que tener {#limit} caracteres como maximo ',
          'any.required': 'El usuario es requerido'
        }),

        'password': Joi.string()
        .min(6)
        .max(255)
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
        .messages({
          'string.base': 'La password tiene que ser solo texto',
          'string.empty': 'La password no puede ser un campo vacio',
          'string.min':  'La password tiene que tener {#limit} caracteres como minimo ',
          'string.pattern.base' : 'La password tiene que tener al menos una letra mayuscula, una letra minuscula y un numero',
          'string.max': 'La password tiene que tener {#limit} caracteres como maximo ',
          'any.required': 'La password es requerido'
        })     


  })
  return Schema.validate(data, { abortEarly: false })
}

const AgregarProductoValidacion = (data : any) => {
  let Schema = Joi.object().keys({
        'nombre': Joi.string()
        .min(4)
        .max(40)
        .required()
        .messages({
          'string.base': 'El nombre tiene que ser solo texto',
          'string.empty': 'El nombre no puede ser un campo vacio',
          'string.min':  'El nombre tiene que tener {#limit} caracteres como minimo ',
          'string.max': 'El nombre tiene que tener {#limit} caracteres como maximo ',
          'any.required': 'El nombre es requerido'
        }),
        'stock' : Joi.string()
          .empty()
          .trim()
          .required()
          .pattern(/^[0-9]+$/)
          .messages({
            'string.base': 'El stock tiene que ser solo numeros',
            'string.pattern.base' : 'El stock tiene que ser solo numeros',
            'string.empty': 'El stock no puede ser un campo vacio',
            'any.required': 'El stock es requerido'
          }),
          'codigo' : Joi.string()
          .empty()
          .trim()
          .required()
          .pattern(/^[0-9]+$/)
          .messages({
            'string.base': 'El codigo tiene que ser solo numeros',
            'string.pattern.base' : 'El codigo tiene que ser solo numeros',
            'string.empty': 'El codigo no puede ser un campo vacio',
            'any.required': 'El codigo es requerido'
          }),


  })
  return Schema.validate(data, { abortEarly: false })
}

const StockValidacion = (data : any) => {
  let Schema = Joi.object().keys({
        'stock' : Joi.string()
          .empty()
          .trim()
          .required()
          .pattern(/^[0-9]+$/)
          .messages({
            'string.base': 'El stock tiene que ser solo numeros',
            'string.pattern.base' : 'El stock tiene que ser solo numeros',
            'string.empty': 'El stock no puede ser un campo vacio',
            'any.required': 'El stock es requerido'
          }),
  })
  return Schema.validate(data, { abortEarly: false })
}

export default { 
  RegistroValidacion,
  LoginValidacion, 
  AgregarProductoValidacion,
  StockValidacion,
}