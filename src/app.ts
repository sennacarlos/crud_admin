import "express-async-errors";
import "dotenv/config";
import express, { Application, json } from 'express'
import middlewares from "./middlewares";
import { userRouter, sessionRouter, courseRouter } from "./routers";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
app.use("/courses", courseRouter);

app.use(middlewares.handleError);

export default app;