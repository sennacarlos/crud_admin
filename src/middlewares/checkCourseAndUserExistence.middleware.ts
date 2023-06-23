import { NextFunction, Request, Response } from "express";
import { CourseResult } from "../interfaces/courses.interfaces";
import { client } from "../database";
import AppError from "../error";

const checkCourseAndUserExistence = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    const {courseId, userId } = req.params;

    const queryCourse: CourseResult = await client.query(
        'SELECT * FROM "courses" WHERE "id" = $1',
        [courseId]
    );

    if (queryCourse.rowCount === 0) {
        throw new AppError("User/course not found", 404)
    }

    const queryUser: CourseResult = await client.query(
        'SELECT * FROM "users" WHERE "id" = $1',
        [userId]
    )

    if (queryUser.rowCount === 0) {
        throw new AppError("User/course not found", 404)
    }

    return next()
};

export default checkCourseAndUserExistence;