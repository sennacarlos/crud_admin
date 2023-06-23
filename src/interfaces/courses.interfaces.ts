import { z } from "zod";
import { course, courseCreate } from "../schemas";
import { QueryResult } from "pg";

type Course = z.infer<typeof course>
type CourseCreate = z.infer <typeof courseCreate>
type CourseResult = QueryResult<Course>

export {Course, CourseCreate, CourseResult}