import AppError from "../utils/AppError.js";
import {
  createBlogService,
  updateBlogService,
  deleteBlogService,
  getBlogsService,
  getBlogBySlugService
} from "../services/blog.service.js";

/* ======================
   PUBLIC (READ)
====================== */

// GET /api/blogs
export const getBlogs = async (req, res, next) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const blogs = await getBlogsService(filter);
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

// GET /api/blogs/:slug
export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await getBlogBySlugService(req.params.slug);

    if (!blog) {
      return next(new AppError("Blog not found", 404));
    }

    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

/* ======================
   CMS (WRITE)
====================== */

// POST /cms/blogs
export const createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return next(new AppError("Title and content are required", 400));
    }

    const blog = await createBlogService(req.body);
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

// PUT /cms/blogs/:id
export const updateBlog = async (req, res, next) => {
  try {
    const blog = await updateBlogService(req.params.id, req.body);

    if (!blog) {
      return next(new AppError("Blog not found", 404));
    }

    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

// DELETE /cms/blogs/:id
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await deleteBlogService(req.params.id);

    if (!blog) {
      return next(new AppError("Blog not found", 404));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
