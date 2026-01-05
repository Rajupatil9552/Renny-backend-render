import AppError from "../utils/AppError.js";
import {
  createNewsService,
  updateNewsService,
  deleteNewsService,
  getNewsService,
  getNewsBySlugService
} from "../services/news.service.js";

/* ======================
   PUBLIC (READ)
====================== */

// GET /api/news
export const getAllNews = async (req, res, next) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const news = await getNewsService(filter);
    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

// GET /api/news/:slug
export const getNewsBySlug = async (req, res, next) => {
  try {
    const news = await getNewsBySlugService(req.params.slug);

    if (!news) {
      return next(new AppError("News not found", 404));
    }

    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

/* ======================
   CMS (WRITE)
====================== */

// POST /cms/news
export const createNews = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return next(new AppError("Title and content are required", 400));
    }

    const news = await createNewsService(req.body);
    res.status(201).json(news);
  } catch (error) {
    next(error);
  }
};

// PUT /cms/news/:id
export const updateNews = async (req, res, next) => {
  try {
    const news = await updateNewsService(req.params.id, req.body);

    if (!news) {
      return next(new AppError("News not found", 404));
    }

    res.status(200).json(news);
  } catch (error) {
    next(error);
  }
};

// DELETE /cms/news/:id
export const deleteNews = async (req, res, next) => {
  try {
    const news = await deleteNewsService(req.params.id);

    if (!news) {
      return next(new AppError("News not found", 404));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
