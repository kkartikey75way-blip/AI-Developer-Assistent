import "dotenv/config";
import { createApp } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const startServer = async (): Promise<void> => {
    await connectDB();

    const app = createApp();

    app.listen(env.PORT, () => {
        console.log(`Server running on port ${env.PORT} !!`);
    });
};

startServer();
