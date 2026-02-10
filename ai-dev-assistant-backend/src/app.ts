import express, { Application } from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import repoRoutes from "./routes/repo.routes";
import searchRoutes from "./routes/search.routes";
import reviewRoutes from "./routes/review.routes";
import chatRoutes from "./routes/chat.routes";
import chatStreamRoutes from "./routes/chatStream.routes";
import jobRoutes from "./routes/job.routes";
import { rateLimit } from "./middlewares/rateLimit.middleware";

export const createApp = (): Application => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/auth", authRoutes);
    app.use("/api/repo", repoRoutes);
    app.use("/api/search", searchRoutes);
    app.use("/api/review", rateLimit, reviewRoutes);
    app.use("/api/chat", rateLimit, chatRoutes);
    app.use("/api/chat-stream", rateLimit, chatStreamRoutes);
    app.use("/api/job", jobRoutes);

    app.use(errorMiddleware);

    return app;
};
