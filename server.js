import express from "express";
import RouterProductos from "./vista_router/productos.js";

class Server {
  #port
  #persistencia
constructor(port, persistencia) {
  this.#port = port
  this.#persistencia = persistencia

}

  start() {
    //**********************************
    //      APLICACION EXPRESS
    //**********************************
    const app = express();

    //**********************************
    //       MIDDLEWARES EXPRESS
    //**********************************
    app.use("/", express.static("public")); //MIDDLEWARE PARA USOS ESTATICOS DE CARPETA RAIZ
    app.use(express.json()); //PARA PODER AGREGAR MEDIANTE POST
    app.use(express.urlencoded({ extended: true })); //PARA ENVIAR LOS DATOS DESDE EL FORMULARIO HTML

    //**********************************
    //    APIRESTFUL DE PRODUCTOS
    //**********************************
    app.use("/api/productos", new RouterProductos(this.#persistencia).start()); //CONEXION A RUTEO

    //**********************************
    //      ESCUCHA DEL SERVIDOR
    //**********************************
    const PORT = this.#port;
    const server = app.listen(PORT, () =>
      console.log(`servidor express escuchando en http://localhost:${PORT}`)
    );
    server.on("error", (error) =>
      console.log(`Error en servidor: ${error.message}`)
    );
  }
}

export default Server