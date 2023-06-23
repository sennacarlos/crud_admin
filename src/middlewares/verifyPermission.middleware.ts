import { NextFunction, Request, Response } from "express";
import AppError from "../error";


const verifyPermission = (req: Request, res: Response, next: NextFunction): void => {
    const { decoded } = res.locals

    if (!decoded.admin) {
        throw new AppError ("Insufficient permission", 403)
    }

    return next();
};

export default verifyPermission;