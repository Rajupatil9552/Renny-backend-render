import News from "../models/Newsmodel.js";

/**
 * [UPSERT] Create or Update News
 */
export const upsertNews = async (req, res) => {
  const { id, ...data } = req.body;

  try {
    let news;

    if (data.title && !data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    if (id && id.length === 24) {
      news = await News.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } else {
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
 * Updated sort to use the new 'date' field
 */
export const getAllNews = async (req, res) => {
  try {
    // Sorting logic: 
    // 1. Manual 'order' (Ascending: 0, 1, 2...)
    // 2. Custom 'date' (Descending: Newest dates first)
    const news = await News.find().sort({ order: 1, date: -1 });
    
    res.status(200).json(news);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * [DELETE] Remove News
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