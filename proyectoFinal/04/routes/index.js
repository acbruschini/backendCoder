import { Router } from "express";
import prodRouter from "./products.js";
import cartsRouter from "./carts.js";
import userRouter from "./user.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

export const router = Router();

router.use(prodRouter);
router.use("/carrito", verifyToken, cartsRouter);
router.use("/usuario", userRouter);
