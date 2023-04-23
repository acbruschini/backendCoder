import { Router } from "express";
import prodRouter from "./products.js";
import cartsRouter from "./carts.js";
import userRouter from "./user.js";

export const router = Router();

router.use(prodRouter);
router.use("/carrito", cartsRouter);
router.use("/usuario", userRouter);

// export const loggedInRouter = Router();

// loggedInRouter.use("/view", )