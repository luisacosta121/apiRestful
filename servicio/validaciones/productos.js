//https://joi.dev/
//https://joi.dev/api/?v=17.13.3
//LA VALIDACION CON JOI SE HACE EN EL SERVICIO
import Joi from "joi";

export const validar = (producto) => {
  const productosSchema = Joi.object({
    nombre: Joi.string().alphanum().required(),
    precio: Joi.number().min(0).max(10000).required(),
    stock: Joi.number().integer().min(0).max(999).required(),
  });
  const { error } = productosSchema.validate(producto);
  if (error) {
    return { result: false, error };
  }
  return { result: true };
};

//console.log(validar({nombre: 'avion', precio: 55, stock: 50}));