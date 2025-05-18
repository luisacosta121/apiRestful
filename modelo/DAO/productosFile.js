import fs from "fs";

//------------------------------------------------------------------------------------

class ModelFile {
  #nombreArchivo;

  constructor() {
    this.#nombreArchivo = "productos.json";
  }

  #leerArchivo = async nombre => {
    let productos = [];
    try {
      productos = JSON.parse(await fs.promises.readFile(nombre, "utf-8"));
    } catch {}
    return productos;
  };

  #escribirArchivo = async (nombre, productos) => {
    await fs.promises.writeFile(nombre, JSON.stringify(productos, null, "\t"));
  };
  //------------------------------------------------------------------------------------

  obtenerProductos = async () => {
    return await this.#leerArchivo(this.#nombreArchivo);
  };

  obtenerProducto = async (id) => {
    const productos = await this.#leerArchivo(this.#nombreArchivo);
    const producto = productos.find((p) => p.id === id);
    return producto || {};
  };

  guardarProducto = async (producto) => {
    const productos = await this.#leerArchivo(this.#nombreArchivo);
    producto.id = String(parseInt(productos[productos.length - 1]?.id || 0) + 1);
    productos.push(producto);
    await this.#escribirArchivo(this.#nombreArchivo, productos);
    return producto;
  };

  actualizarProducto = async (id, producto) => {
    const productos = await this.#leerArchivo(this.#nombreArchivo);
    const index = productos.findIndex((p) => p.id === id);
    if (index != -1) {
      const productoAnt = productos[index];
      const productoAct = { ...productoAnt, ...producto }; //SPREAD OPERATOR + OBJECT MERGE
      productos.splice(index, 1, productoAct); //ESTO REEMPLAZA EL PRODUCTO PARA ACTUALIZAR
      await this.#escribirArchivo(this.#nombreArchivo, productos);
      return productoAct;
    } else {
      //EN CASO DE PASAR UN "ID" INVALIDO
      return null;
    }
  };

  borrarProducto = async (id) => {
    const productos = await this.#leerArchivo(this.#nombreArchivo);
    const index = productos.findIndex((p) => p.id === id);
    if (index != -1) {
      const producto = productos.splice(index, 1)[0]; //ESTO ELIMINA EL PRODUCTO
      await this.#escribirArchivo(this.#nombreArchivo, productos);
      return producto;
    } else {
      //EN CASO DE PASAR UN "ID" INVALIDO
      return null;
    }
  };
}

export default ModelFile;
