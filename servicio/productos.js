import ModelFactory from '../modelo/DAO/productosFactory.js';
import { validar } from './validaciones/productos.js';


class Servicio {
  #model;

  constructor(persistencia) {
    this.#model = ModelFactory.get(persistencia)
  }

  obtenerProductos = async (id) => {
    if (id) {
      const producto = await this.#model.obtenerProducto(id);
      return producto;
    } else {
      const productos = await this.#model.obtenerProductos();
      return productos;
    }
  };

  guardarProducto = async (producto) => {
    const res = validar(producto) //ACA VA SE VALIDA EN BASE A validar.js
    if(res.result){
      const productoGuardado = await this.#model.guardarProducto(producto);
    return productoGuardado;
    } else {
      //console.log(res.error);
      throw new Error(res.error.details[0].message)
    }
    
  };
  actualizarProducto = async (id, producto) => {
    const productoActualizado = await this.#model.actualizarProducto(id, producto);
    return productoActualizado;
  };

  borrarProducto = async (id) => {
    const productoEliminado = await this.#model.borrarProducto(id);
    return productoEliminado;
  };
}

export default Servicio;
