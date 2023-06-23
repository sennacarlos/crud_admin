import { NextFunction, Response, Request } from "express";
import { UserResult } from "../interfaces";
import { client } from "../database";
import AppError from "../error";
import format from "pg-format";

const verifyCourse = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const queryFormat: string = format (
        `
            SELECT
                "courses"."id" AS "courseId",
                 "courses"."name" AS "courseName",
                "courses"."description" AS "courseDescription",
                "userCourses"."active" AS "userActiveInCourse",
                "users"."id" AS "userId",
                "users"."name" AS "userName"
            FROM
                "userCourses"
            JOIN
                "courses" ON "userCourses"."courseId" = "courses"."id"
            JOIN
                "users" ON "userCourses"."userId" = "users"."id"
            WHERE
            "users"."id" = $1;
        `
    );

    const query: UserResult = await client.query(queryFormat, [id]);

    if (query.rowCount === 0 ) {
        throw new AppError ("No course found", 404)
    }

    return next()
}

export default verifyCourse;