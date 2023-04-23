import { Router } from "express";
import CartsControllers from "../controllers/carts.js";
import { isAuth } from "../middlewares/authMiddleware.js"

const cartsRouter = Router();
const Controllers = new CartsControllers();

cartsRouter.get("/", Controllers.getCarts);
cartsRouter.get("/:id/productos", Controllers.getProductsInCart);
cartsRouter.post("/:id/productos/:id_producto", Controllers.postProductInCart);
cartsRouter.post("/", Controllers.postCart);
cartsRouter.delete("/:id/productos/:id_producto", Controllers.deleteProductInCart);
cartsRouter.delete("/:id", Controllers.deleteCart)

export default cartsRouter;

// //import Container from "../models/Container.js";
// import { mongoContainer } from "../models/mongoContainer.js";
// import { carts } from "../models/schemas/carts.js";
// import {
//   postCart,
//   deleteCart,
//   getProductsInCart,
//   postProductInCart,
//   deleteProductInCart,
// } from "../controllers/carts/cartsHandlers.js";
// import { existsCart, existsProductForCartPost, existsProductInCart } from "../controllers/carts/cartsValidations.js";
// import { validId } from "../controllers/products/productsValidations.js";

// const { Router } = express;
// const cartRouter = Router();

// export const cartContainer = new mongoContainer(carts);

// cartRouter.delete("/:id?", validId, existsCart, deleteCart);





