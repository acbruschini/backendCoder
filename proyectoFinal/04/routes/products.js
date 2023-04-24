import { Router } from "express";
import ProductsControllers from "../controllers/products.js";
import { validMongoId } from "../middlewares/validationMiddleware.js";

const productsRouter = Router();
const Controllers = new ProductsControllers();

productsRouter.get("/productos", Controllers.getProducts);
productsRouter.get("/productos/:id", validMongoId, Controllers.getProductById)
productsRouter.post("/productos",Controllers.postProduct);
productsRouter.delete("/productos/:id",  validMongoId, Controllers.deleteProduct);
productsRouter.put("/productos/:id",  validMongoId, Controllers.updateProduct);

export default productsRouter