import format from "pg-format";
import { Course, CourseCreate, CourseResult } from "../interfaces/courses.interfaces";
import { client } from "../database";
import { NextFunction } from "express";

const create = async (
    courseData: CourseCreate
): Promise <Course> => {
    const queryString: string = format(
        `
            INSERT INTO courses (%I)
            VALUES (%L)
            RETURNING *
        `,
        Object.keys(courseData),
        Object.values(courseData)
    );

    const queryResult: CourseResult = await client.query(queryString);

    return queryResult.rows[0];
};

const read = async (): Promise<Course[]> => {
    const query: CourseResult = await client.query('SELECT * FROM "courses";');
    return query.rows;
}

const addCourse = async (courseId: string, userId: string): Promise<Object> => {
    const queryString: string = `
        INSERT INTO "userCourses"
            ("courseId", "userId")
        VALUES ($1, $2)
        RETURNING *;
    `;

    await client.query(queryString, [courseId, userId])

    return { "message": "User successfully vinculed to course" }
}

const destroy = async (
    courseId: string,
    userId: string
): Promise<void> => {
    const queryString = `
        DELETE FROM "userCourses"
        WHERE "courseId" = $1
        AND "userId" = $2;
    `;

    await client.query(queryString, [courseId, userId]);
}

const readCoursesUsers = async (
    courseId: string,
) => {
    const queryString: string = `
    SELECT
    "users"."id" AS "userId",
    "users"."name" AS "userName",
    "courses"."id" AS "courseId",
    "courses"."name" AS "courseName",
    "courses"."description" AS "courseDescription",
    "userCourses"."active" AS "userActiveInCourse"
    FROM
    "userCourses"
    INNER JOIN "users" ON "userCourses"."userId" = "users"."id"
    INNER JOIN "courses" ON "userCourses"."courseId" = "courses"."id"
    WHERE
    "courses"."id" = $1
    `;

    const queryResult = await client.query(queryString, [courseId]);

    return queryResult.rows;
}

export default { create, read, addCourse, destroy, readCoursesUsers }