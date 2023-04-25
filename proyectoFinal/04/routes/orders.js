import { Router } from "express";
import { validMongoId } from "../middlewares/validationMiddleware.js";
import OrdersControllers from "../controllers/orders.js";

const ordersRouter = Router();
const Controllers = new OrdersControllers();

ordersRouter.post("/:userId", Controllers.postOrder);

export default ordersRouter;