//ESTE MODELO SIRVE SOLO PARA HACER PRUEBAS YA QUE NO ES PERSISTENTE

class ModelMem {
  #productos;

  constructor() {
    this.#productos = [
      { id: "1", nombre: "TV", precio: 1000, stock: 50 },
      { id: "2", nombre: "Mesa", precio: 2000, stock: 60 },
      { id: "3", nombre: "Mouse", precio: 3000, stock: 70 },
    ];
  }

  obtenerProductos = async () => this.#productos;

  obtenerProducto = async (id) => {
    const producto = this.#productos.find((p) => p.id === id);
    return producto || {};
  };

  guardarProducto = async (producto) => {
    producto.id = String(
      parseInt(this.#productos[this.#productos.length - 1]?.id || 0) + 1
    );
    this.#productos.push(producto);
    return producto;
  };
  actualizarProducto = async (id, producto) => {
    const index = this.#productos.findIndex((p) => p.id === id);
    if (index != -1) {
      const productoAnt = this.#productos[index];
      const productoAct = { ...productoAnt, ...producto }; //SPREAD OPERATOR + OBJECT MERGE
      this.#productos.splice(index, 1, productoAct); //ESTO REEMPLAZA EL PRODUCTO PARA ACTUALIZAR
      return productoAct;
    } else {
      //EN CASO DE PASAR UN "ID" INVALIDO
      return null;
    }
  };

  borrarProducto = async (id) => {
    const index = this.#productos.findIndex((p) => p.id === id);
    if (index != -1) {
      const producto = this.#productos.splice(index, 1)[0]; //ESTO ELIMINA EL PRODUCTO
      return producto;
    } else {
      //EN CASO DE PASAR UN "ID" INVALIDO
      return null;
    }
  };
}

export default ModelMem;
