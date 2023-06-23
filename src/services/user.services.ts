import format from "pg-format";
import { hash } from "bcryptjs";
import { UserCreate, UserResult, UserReturn } from "../interfaces";
import { client } from "../database";
import { userRead, userReturn } from "../schemas";
import { UserRead } from "../interfaces/user.interfaces";
import { QueryResult } from "pg";

const create = async (payload: UserCreate): Promise <UserReturn> => {
    payload.password = await hash(payload.password, 10);

    const queryFormat: string = format(
        'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    );

    const query: UserResult = await client.query(queryFormat);
    return userReturn.parse(query.rows[0]);
};

const read = async (): Promise<UserRead> => {
    const query: UserResult = await client.query('SELECT * FROM "users";');
    return userRead.parse(query.rows);
}

const retrieve = async (userId: string) => {
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

    const query: UserResult = await client.query(queryFormat, [userId]);
   
    return query.rows;
}

export default { create, read, retrieve }