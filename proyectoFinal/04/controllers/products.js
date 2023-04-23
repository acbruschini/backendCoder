import { ProductsServices } from "../services/products.js";
import { isMongoId } from "../helpers/generalValidations.js";
import * as dotenv from "dotenv";
dotenv.config();

const Services = new ProductsServices();

export default class ProductsControllers {
  async getProducts(req, res) {
    try {
      const products = await Services.getProductos();
      res.json(products).status(200);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const product = await Services.getProductById(id);
    res.status(200).json(product);
  }

  async postProduct(req, res) {
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
    const newProductID = await Services.postProducto(newProduct);
    res.status(201).json({ status: "ok", newProductId: newProductID });
  }

  async deleteProduct(req, res) {
    const { id } = req.params;

    if (process.env.PERSISTENCE == "mongo" && !isMongoId(id)) {
      res.status(200).json({ status: "No mongo id" });
      return;
    }

    const deletedId = await Services.deleteProducto(id);
    res.status(200).json({ deletedId: deletedId });
  }

  async updateProduct(req, res) {
    const { id } = req.params;

    if (process.env.PERSISTENCE == "mongo" && !isMongoId(id)) {
      res.status(200).json({ status: "No mongo id" });
      return;
    }

    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const data = {
      ...(nombre != undefined && { nombre }),
      ...(descripcion != undefined && { descripcion }),
      ...(codigo != undefined && { codigo }),
      ...(foto != undefined && { foto }),
      ...(precio != undefined && { precio }),
      ...(stock != undefined && { stock }),
    };
    Object.keys(data).length == 0
      ? res.status(200).json({ status: "No Content to change" })
      : res.status(200).json(await Services.updateProduct(id, data));
  }
}
