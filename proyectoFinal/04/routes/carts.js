import { Router } from "express";
import CartsControllers from "../controllers/carts.js";

const cartsRouter = Router();
const Controllers = new CartsControllers();

cartsRouter.get("/", Controllers.getCarts);
cartsRouter.get("/:id/productos", Controllers.getProductsInCart);
cartsRouter.post("/:id/productos/:id_producto", Controllers.postProductInCart);
cartsRouter.post("/", Controllers.postCart);
cartsRouter.delete("/:id/productos/:id_producto", Controllers.deleteProductInCart);
cartsRouter.delete("/:id", Controllers.deleteCart)

export default cartsRouter;