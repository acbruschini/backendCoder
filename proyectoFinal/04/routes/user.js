import { Router } from "express";
import UsersControllers from "../controllers/users.js";

const userRouter = Router();
const Controllers = new UsersControllers();


userRouter.post("/login", Controllers.login);
userRouter.post("/register", Controllers.register);

export default userRouter;