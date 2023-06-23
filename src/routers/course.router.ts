import { Router } from "express";
import { coursesController } from "../controllers";
import middlewares from "../middlewares";
import { courseCreate } from "../schemas";

const courseRouter: Router = Router();

courseRouter.post(
    "",
    middlewares.validateBody(courseCreate),
    middlewares.verifyToken,
    middlewares.verifyPermission,
    coursesController.create
);

courseRouter.get(
    "",
    coursesController.read
);

courseRouter.post(
    "/:courseId/users/:userId",
    middlewares.verifyToken,
    middlewares.verifyPermission,
    middlewares.checkCourseAndUserExistence,
    coursesController.addCourseToUser
);

courseRouter.delete(
    "/:courseId/users/:userId",
    middlewares.verifyToken,
    middlewares.verifyPermission,
    middlewares.checkCourseAndUserExistence,
    coursesController.destroy
);

courseRouter.get(
    "/:id/users",
    middlewares.verifyToken,
    middlewares.verifyPermission,
    coursesController.listCourses
)

export default courseRouter;