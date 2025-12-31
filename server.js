import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import 'dotenv/config'
import blogRoutes from "./routes/blog.routes.js";
import newsRoutes from "./routes/news.routes.js";
import eventRoutes from "./routes/event.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import careerRoutes from "./routes/career.routes.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";



const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
// PUBLIC APIs
app.use("/api/blogs", blogRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/events", eventRoutes);

// CMS APIs
app.use("/cms/blogs", blogRoutes);
app.use("/cms/news", newsRoutes);
app.use("/cms/events", eventRoutes);



// Health check
app.use((req, res, next) => {
    res.status(404).send("Route not found");
});

app.listen(process.env.PORT, (req,res) => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})
// 404 handler
app.all("*", (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global error handler
app.use(globalErrorHandler);
export default app;
