import { z } from "zod";
import { user, userCreate, userRead, userReturn } from "../schemas";
import { QueryResult } from "pg";

type User = z.infer<typeof user>
type UserReturn = z.infer<typeof userReturn>;

type UserCreate = z.infer<typeof userCreate>;
type UserRead = z.infer<typeof userRead>;

type UserResult = QueryResult<User>;

export { User, UserReturn, UserCreate, UserResult, UserRead };