import News from "../models/Newsmodel.js";

// Create or Update News
export const upsertNews = async (req, res) => {
  const { id, ...data } = req.body;
  try {
    const news = id 
      ? await News.findByIdAndUpdate(id, data, { new: true }) 
      : await News.create(data);
    res.status(200).json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All News (Sorted by 'order' or 'createdAt')
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find({ status: "published" }).sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete News
export const deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};