import News from "../models/Newsmodel.js";

/**
 * [UPSERT] Create or Update News
 * Handles the logic of checking for a valid ID to prevent 500 errors.
 */
export const upsertNews = async (req, res) => {
  const { id, ...data } = req.body;

  try {
    let news;

    // Generate a slug if it doesn't exist in data
    if (data.title && !data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
        .replace(/(^-|-$)+/g, '');    // Trim hyphens from start/end
    }

    if (id && id.length === 24) {
      news = await News.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } else {
      // For new entries, if slug still exists as null in DB, 
      // adding a timestamp ensures uniqueness
      if (!id) data.slug = `${data.slug}-${Date.now()}`;
      news = await News.create(data);
    }

    res.status(200).json({ success: true, data: news });
  } catch (err) {
    console.error("UPSERT ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * [READ] Get All News
 * Returns all news items sorted by 'order' first, then 'latest'
 */
export const getAllNews = async (req, res) => {
  try {
    // We fetch everything. 
    // If you want the public site to hide drafts, you can filter in React 
    // or use: .find({ status: "published" })
    const news = await News.find().sort({ order: 1, createdAt: -1 });
    
    res.status(200).json(news);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * [DELETE] Remove News
 * Permanently deletes an item by ID
 */
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    const news = await News.findByIdAndDelete(id);
    
    if (!news) {
      return res.status(404).json({ success: false, message: "Item already deleted or not found" });
    }

    res.status(200).json({ success: true, message: "News deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};