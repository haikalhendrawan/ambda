import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
//routes
import eventRoute from "./routes/eventRoute";
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(eventRoute);
app.use(errorHandler);

app.get("/", async(req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});