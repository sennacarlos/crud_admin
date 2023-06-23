import { NextFunction, Request, Response } from "express";
import courseServices from "../services/course.services";
import { Course } from "../interfaces/courses.interfaces";

const create = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const newCourse = await courseServices.create(req.body);
    return res.status(201).json(newCourse);
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const allCourses: Course[] = await courseServices.read();
    return res.status(200).json(allCourses);
};

const addCourseToUser = async (req: Request, res: Response): Promise<Response> => {
    const { courseId, userId } = req.params;

    const payload = await courseServices.addCourse(courseId, userId);

    return res.status(201).json(payload);
}

const destroy = async (req: Request, res: Response): Promise<Response> =>  {
    const { courseId, userId } = req.params;

    await courseServices.destroy(courseId, userId);

    return res.status(204).json();
};

const listCourses = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const payload = await courseServices.readCoursesUsers(req.params.id);

    return res.status(200).json(payload)
}

export default { create, read, addCourseToUser, destroy, listCourses };