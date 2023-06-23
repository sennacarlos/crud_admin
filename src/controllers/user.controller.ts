import { NextFunction, Request, Response } from "express";
import { UserReturn } from "../interfaces";
import { userServices } from "../services";
import { User, UserRead } from "../interfaces/user.interfaces";

const create = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const user: UserReturn = await userServices.create(res.locals.validated);
    return res.status(201).json(user)
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const user: UserRead = await userServices.read();
    return res.status(200).json(user);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
    const payload: User[] = await userServices.retrieve(req.params.id);
    return res.status(200).json(payload);
};

export default { create, read, retrieve };