import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const errorMiddleware = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
        // Programming or other unknown error: don't leak error details
        else {
            console.error("ERROR 💥", err);
            res.status(500).json({
                status: "error",
                message: "Something went very wrong!"
            });
        }
    }
};
