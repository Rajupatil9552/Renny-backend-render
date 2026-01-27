import News from "../models/Newsmodel.js";

export const upsertNews = async (req, res) => {
  const { id, ...data } = req.body;

  try {
    // Base slug from title
    if (data.title) {
      data.slug = data.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    let news;

    if (id) {
      // ---------- UPDATE ----------
      news = await News.findById(id);
      if (!news) {
        return res.status(404).json({ success: false, message: "News not found" });
      }

      // Keep old slug if title didn't change
      if (news.title !== data.title) {
        data.slug = `${data.slug}-${Date.now()}`;
      } else {
        data.slug = news.slug;
      }

      Object.assign(news, data);
      await news.save();

    } else {
      // ---------- CREATE ----------
      data.slug = `${data.slug}-${Date.now()}`;
      news = await News.create(data);
    }

    res.status(200).json({ success: true, data: news });

  } catch (err) {
    console.error("UPSERT ERROR:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "News title already exists. Please use a different headline."
      });
    }

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