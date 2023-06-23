import { Router } from "express";
import middlewares from "../middlewares";
import { userCreate } from "../schemas";
import { userController } from "../controllers";
import verifyPermission from "../middlewares/verifyPermission.middleware";

const userRouter: Router = Router();

userRouter.post(
    "",
    middlewares.validateBody(userCreate),
    middlewares.verifyEmail,
    userController.create
);

userRouter.get(
    "",
    middlewares.verifyToken,
    middlewares.verifyPermission,
    userController.read
);

userRouter.get(
    "/:id/courses",
    middlewares.verifyToken,
    middlewares.verifyPermission,
    middlewares.verifyCourse,
    userController.retrieve
)


export default userRouter;