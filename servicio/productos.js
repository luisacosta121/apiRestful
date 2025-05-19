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

  obtenerEstadisticas = async opcion => {
    const productos = await this.#model.obtenerProductos()
    switch(opcion){
      case 'cantidad':
        return { cantidad: productos.length }

      case 'avg-precio':
        return { 'precio promedio': +(productos.reduce((acc, p) => acc + p.precio, 0) / productos.length).toFixed(2) }

      case 'min-precio':
        return { 'precio minimo': +Math.min(...productos.map(p => p.precio)).toFixed(2) }

      case 'max-precio':
        return { 'precio maximo': +Math.max(...productos.map(p => p.precio)).toFixed(2) }

      default:
          return { error: `opcion estadistica "${opcion}" no soportada`}
    }
  }
}

export default Servicio;
