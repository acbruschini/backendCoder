import { Router } from "express";
import ProductsControllers from "../controllers/products.js";

const productsRouter = Router();
const Controllers = new ProductsControllers();

productsRouter.get("/productos", Controllers.getProducts);
productsRouter.get("/productos/:id", Controllers.getProductById)
productsRouter.post("/productos", Controllers.postProduct);
productsRouter.delete("/productos/:id", Controllers.deleteProduct);
productsRouter.put("/productos/:id", Controllers.updateProduct);

export default productsRouter