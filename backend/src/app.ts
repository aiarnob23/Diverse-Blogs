import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UploadRoutes } from "./app/modules/uploads/uploads.route";
import { blogRoutes } from "./app/modules/blogs/blogs.route";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { UserRoutes } from "./app/modules/users/users.route";


const app: Application = express();

//cors and middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["https://diverse-blogs.vercel.app","http://localhost:5173/"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

//routes
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/uploads", UploadRoutes);
app.use("/api/blogs", blogRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Diverse blogs server is running...");
});


// app.use(notFound);
export default app;
