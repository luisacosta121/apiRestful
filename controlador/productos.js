import Servicio from "../servicio/productos.js";

class Controlador {
  #servicio;

  constructor(persistencia) {
    this.#servicio = new Servicio(persistencia);
  }

  obtenerProductos = async (req, res) => {
    const { id } = req.params;
    const productos = await this.#servicio.obtenerProductos(id);
    res.json(productos);
  };

  guardarProducto = async (req, res) => {
    try {
      const producto = req.body;
      if(!Object.keys(producto).length) throw new Error('El producto está vacio')
      const productoGuardado = await this.#servicio.guardarProducto(producto);
      res.json(productoGuardado);
    } catch (error) {
      //res.status(500).json({error: error.details[0].message})
      res.status(500).json({ error: error.message });
    }
  };

  actualizarProducto = async (req, res) => {
    const { id } = req.params; //OBTENER "ID"
    const producto = req.body; //PRODUCTO ES EL QUE VIAJA EN EL BODY
    const productoActualizado = await this.#servicio.actualizarProducto(
      id,
      producto
    );
    res
      .status(productoActualizado ? 200 : 404)
      .json(productoActualizado ? productoActualizado : {});
  };

  borrarProducto = async (req, res) => {
    const { id } = req.params;
    const productoEliminado = await this.#servicio.borrarProducto(id);
    res
      .status(productoEliminado ? 200 : 404)
      .json(productoEliminado ? productoEliminado : {});
  };

  obtenerEstadisticas = async (req, res) => {
    const { opcion } = req.params;
    const estadisticas = await this.#servicio.obtenerEstadisticas(opcion);
    res.json({estadisticas});
  };
}

//EN VEZ DE EXPORTAR CADA FUNCION, SE EXPORTA LA CLASE SOLA
export default Controlador;

/*
export default {
    obtenerProductos,
    guardarProducto,
    actualizarProducto,
    borrarProducto
}
 */
