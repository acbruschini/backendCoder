const express = require("express");
const fs = require("fs");

class Contenedor {
  nextId;
  arrayObj = new Array();

  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    if (fs.existsSync(nombreArchivo)) {
      this.arrayObj = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
      this.nextId = this.#getNextId();
      console.log("existe");
    } else {
      this.nextId = 0;
      fs.writeFileSync(this.nombreArchivo, JSON.stringify(this.arrayObj));
      console.log("No existe");
    }
  }

  async save(object) {
    try {
      if (!this.#isInFile(object)) {
        object["id"] = this.nextId;
        this.nextId++;
        this.arrayObj.push(object);
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(this.arrayObj)
        );
        console.log("se guardo" + object.id);
        return Promise.resolve(object.id);
      } else {
        console.log("El objeto ya existe");
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
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No se borro objeto pq no existe el ID");
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

const app = express(); // Existe una funcion express() al importar express
const productosContenedor = new Contenedor("./productos.txt");

app.get("/productos", (req, res) => {
    productosContenedor.getAll()
    .then(productos => res.send(JSON.stringify(productos,null,2)))
    .catch(err => console.log(err))
});

app.get("/productosRandom", (req, res) => {
    productosContenedor.getAll()
    .then(productos => {
        let randomNum = Math.floor(Math.random() * (productos.length - 0 + 1)) + 0;
        res.send(JSON.stringify(productos[randomNum],null,2));
    })
    .catch(err => console.log(err))
});

const server = app.listen(2020, (req, res) => {
  console.log("Escuchando en 2020");
});
