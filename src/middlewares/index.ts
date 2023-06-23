import handleError from "./handleError.middleware";
import validateBody from "./validateBody.middleware";
import verifyEmail from "./verifyEmail.middleware";
import verifyToken from "./verifyToken.middleware";
import verifyPermission from "./verifyPermission.middleware";
import verifyCourse from "./verifyCourse.middleware";
import checkCourseAndUserExistence from "./checkCourseAndUserExistence.middleware";

export default {
    handleError,
    validateBody,
    verifyEmail,
    verifyToken,
    verifyPermission,
    verifyCourse,
    checkCourseAndUserExistence
};