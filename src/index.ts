import express, { Express, Request, Response } from "express";
import "dotenv/config";
import path from "path";
//middlewares
import useCors from "./middleware/useCors";
import rateLimiter from "./middleware/rateLimit";
import cookieParser from "cookie-parser";
import errorHandler from './middleware/errorHandler';
import notFoundHandler from "./middleware/notFoundHandler";
//routes
import eventRoute from "./routes/eventRoute";
import attendanceRoute from "./routes/attendanceRoute";

const app: Express = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(useCors());
app.use(rateLimiter);
app.use(eventRoute);
app.use(attendanceRoute);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});