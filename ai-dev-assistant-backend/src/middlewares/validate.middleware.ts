import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { AppError } from "../utils/appError";

export const validate =
    (schema: any) =>
        async (req: Request, _res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params
                });
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const message = error.issues
                        .map((err) => `${err.path.join(".")}: ${err.message}`)
                        .join(", ");
                    return next(new AppError(message, 400));
                }
                next(error);
            }
        };
