const express = require("express");
const fs = require("fs");
const { Router } = express;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// CONTENEDOR
class Contenedor {
  nextId;
  arrayObj = new Array();

  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    if (fs.existsSync(nombreArchivo)) {
      console.log("Existen productos, importandolos...");
      this.arrayObj = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
      this.nextId = this.#getNextId();
    } else {
      console.log("No existe archivo de productos, creandolo...");
      this.nextId = 0;
      fs.writeFileSync(this.nombreArchivo, JSON.stringify(this.arrayObj));
    }
  }

  async save(object) {
    try {
      if (!this.#isInFile(object)) {
        object["id"] = this.nextId;
        this.arrayObj.push(object);
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(this.arrayObj)
        );
        console.log("se guardo" + object.id);
        this.nextId++;
        return Promise.resolve(object.id);
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  }

  getById(id) {
    let obj = null;
    this.arrayObj.map((element) => {
      if (element.id == id) {
        obj = element;
      }
    });
    return obj;
  }

  async update(id, newObject) {
    let index = this.#IdExists(id);
    if (index) {
      //const { title, price, thumbnail } = newObject;
      this.arrayObj[index] = {...newObject, id: id};
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.arrayObj)
      );
      console.log("se actualizo");
      return Promise.resolve(id);
    } else {
      console.log("no existe el id");
    }
  }

  #isInFile(obj) {
    let response = false;
    this.arrayObj.forEach((element) => {
      if (
        element.title == obj.title &&
        element.price == obj.price &&
        element.thumbnail == obj.thumbnail
      ) {
        response = true;
      }
    });
    return response;
  }

  #IdExists(id) {
    let response = false;
    this.arrayObj.forEach((element, index) => {
      if (element.id == id) {
        response = index;
      }
    });
    return response;
  }

  #getNextId() {
    if (this.arrayObj.length > 0) {
      let maxId = this.arrayObj.reduce((acc, current) => {
        return Math.max(acc, current.id);
      }, 0);
      return maxId + 1;
    } else {
      return 0;
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      this.arrayObj = JSON.parse(data);
      return this.arrayObj;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    let flag = false;
    for (let i = 0; i < this.arrayObj.length; i++) {
      if (this.arrayObj[i].id === id) {
        flag = true;
        this.arrayObj.splice(i, 1);
        i--;
      }
    }
    //console.log ("flag: " + flag)
    if (flag) {
      try {
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(this.arrayObj)
        );
        console.log("borro");
        return id;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No se borro objeto pq no existe el ID");
      return null;
    }
  }

  async deleteAll() {
    this.arrayObj = [];
    try {
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.arrayObj)
      );
      console.log("borro todo");
    } catch (err) {
      console.log(err);
    }
  }
}

const contenedorProductos = new Contenedor("productos.txt");
// ROUTER
const routerProductos = new Router();

routerProductos.get("/productos", async (req, res) => {
  try {
    res.json(await contenedorProductos.getAll());
  } catch (error) {
    console.log(error);
  }
});

routerProductos.get("/productos/:id", (req, res) => {
  try {
    const { id } = req.params;
    const producto = contenedorProductos.getById(id);
    producto
      ? res.json(producto)
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    console.log(error);
  }
});

routerProductos.post("/productos", async (req, res) => {
  try {
    const producto = req.body;
    console.log("El producto es" + producto);
    const productoNuevoId = await contenedorProductos.save(producto);
    productoNuevoId
      ? res.json({ ...producto, id: productoNuevoId })
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    console.log(error);
  }
});

routerProductos.put("/productos/:id", async (req, res) => {
  try {
    const productoActualizar =  req.body;
    const { id } = req.params;
    const productoActualizarId = await contenedorProductos.update(Number(id),productoActualizar);
    productoActualizarId
      ? res.json({ actualizado: "ok", id: productoActualizarId })
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    console.log(error);
  }
});

routerProductos.delete("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productoId = await contenedorProductos.deleteById(Number(id));
    productoId
      ? res.json({ borrado: "ok", id: productoId })
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    console.log(error);
  }
});

app.use("/api", routerProductos);
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log("Escuchando en el puerto " + PORT);
});
