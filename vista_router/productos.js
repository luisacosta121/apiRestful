import express from "express";
import Controlador from "../controlador/productos.js";

//CLASE
class Router {
    #controlador
    //CONSTRUCTOR DE LA CLASE ROUTER()
  constructor(persistencia) {
    this.#controlador = new Controlador(persistencia);
  }

  //METODO start() DE LA CLASE ROUTER
  start() {
    const router = express.Router();
    //ACA NO SE PONE ASYNC AWAIT PORQUE EXPRESS LO DETECTA SOLO
    router.get("/:id?", this.#controlador.obtenerProductos);
    router.post("/", this.#controlador.guardarProducto);
    router.put("/:id", this.#controlador.actualizarProducto);
    router.delete("/:id", this.#controlador.borrarProducto);

    return router;
  }
}

//EXPORTACION DE CLASE
export default Router;
