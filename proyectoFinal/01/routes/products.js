import express from "express";
import Container from "../models/Container.js";
import { admin } from "../server.js";
const { Router } = express;
const prodRouter = Router();

const prodContainer = new Container("./data/products.txt");

//VER SI LO PONGO EN MIDDLEWARE
function validId(req, res, next) {
  prodContainer.getById(req.params.id) == null && req.params.id != null
    ? res
        .status(401)
        .json({ error: -3, descripcion: "This product doesn't exists" })
    : next();
}

function existsProduct(req, res, next) {
  prodContainer.getById(req.params.id) == null
    ? res
        .status(401)
        .json({ error: -3, descripcion: "This product doesn't exists" })
    : next();
}

function isAdmin(req, res, next) {
  admin
    ? next()
    : res
        .status(401)
        .json({ error: -4, descripcion: "The route in your petition is not authorized", route: req.originalUrl });
}

///////

prodRouter.get("/:id?", validId, async (req, res) => {
  console.log(req.params.id);
  res
    .status(200)
    .json(
      !req.params.id
        ? await prodContainer.getAll()
        : prodContainer.getById(req.params.id)
    );
});

prodRouter.post("/", isAdmin ,async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const newProduct = {
    timestamp: Date.now(),
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };
  const idNew = await prodContainer.save(newProduct);
  res.status(201).json({ status: "ok", newProductId: idNew });
});

prodRouter.put("/:id", isAdmin, existsProduct, async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const updatedProduct = {
    timestamp: Date.now(),
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };
  const id = await prodContainer.update(req.params.id, updatedProduct);
  res
    .status(200)
    .json({ status: "ok", updatedProduct: [prodContainer.getById(id)] });
});

prodRouter.delete("/:id", isAdmin, existsProduct, async (req, res) => {
  const id = await prodContainer.deleteById(req.params.id);
  res.status(200).json({ status: "ok", deletedProduct: id });
});

export default prodRouter;
