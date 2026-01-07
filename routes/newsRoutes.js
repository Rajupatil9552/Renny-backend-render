import express from "express";
const router = express.Router();
import { 
  upsertNews, 
  getAllNews, 
  deleteNews 
} from "../controllers/newsController.js";


router.get("/", getAllNews);


router.post("/upsert", upsertNews);


router.delete("/:id", deleteNews);

export default router;