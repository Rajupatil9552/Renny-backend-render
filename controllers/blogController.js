import Blog from "../models/BlogModel.js";

// [CREATE] - Create a new blog (Draft or Published)
export const createBlog = async (req, res) => {
  try {
    const { status } = req.body;
    const newBlog = new Blog({
      ...req.body,
      publishedAt: status === "published" ? new Date() : null
    });
    const savedBlog = await newBlog.save();
    res.status(201).json({ success: true, data: savedBlog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// [READ ALL] - For Admin (All) and Frontend (Only Published)
export const getBlogs = async (req, res) => {
  try {
    const { role } = req.query; // e.g., ?role=admin
    const query = role === "admin" ? {} : { status: "published" };
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [READ ONE] - Get single blog by Slug (for Frontend) or ID (for Admin Edit)
export const getBlog = async (req, res) => {
  try {
    const { identifier } = req.params;
    // Check if identifier is an ID or a Slug
    const blog = identifier.match(/^[0-9a-fA-F]{24}$/) 
      ? await Blog.findById(identifier) 
      : await Blog.findOne({ slug: identifier });

    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [UPDATE] - Update content or status (e.g., Draft -> Published)
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // If status is being changed to published for the first time
    if (status === "published") {
      req.body.publishedAt = new Date();
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedBlog) return res.status(404).json({ success: false, message: "Blog not found" });
    
    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// [DELETE] - Delete blog from database
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};