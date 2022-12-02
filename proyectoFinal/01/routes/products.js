import express from "express";
import Container from "../models/Container.js";
import { isAdmin } from "../controllers/generalValidations.js";
import { getProducts } from "../controllers/products/getProducts.js";
import { postProducts } from "../controllers/products/postProducts.js";
import { putProducts } from "../controllers/products/putProducts.js";
import { deleteProducts } from "../controllers/products/deleteProducts.js";
import { validId, existsProduct } from "../controllers/products/productsValidations.js";

const { Router } = express;
const prodRouter = Router();

export const prodContainer = new Container("./data/products.txt");

prodRouter.get("/:id?", validId, getProducts);

prodRouter.post("/", isAdmin , postProducts);

prodRouter.put("/:id", isAdmin, existsProduct, putProducts);

prodRouter.delete("/:id", isAdmin, existsProduct, deleteProducts);

export default prodRouter;
