import { Request, Response } from "express";
import { SessionReturn } from "../interfaces";
import { sessionServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const { validated } = res.locals;
    const token: SessionReturn = await sessionServices.create(validated);

    return res.status(200).json(token);
};

export default { create };