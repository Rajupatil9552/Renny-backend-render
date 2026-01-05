import IpoAv from '../models/IpoAvModel.js';

// --- FRONTEND: GET ---
export const getIpoVideos = async (req, res) => {
  try {
    const pageData = await IpoAv.findOne({ slug: "ipo-av" });
    res.status(200).json(pageData ? pageData.videos : []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error: error.message });
  }
};

// --- CMS: UPSERT (Create/Update Particular Video) ---
export const upsertIpoVideo = async (req, res) => {
  const { title, driveUrl, videoId } = req.body;
  const slug = "ipo-av";

  try {
    let page = await IpoAv.findOne({ slug });
    if (!page) {
      page = new IpoAv({ slug, videos: [] });
    }

    if (videoId) {
      // Update existing video record
      const video = page.videos.id(videoId);
      if (video) {
        video.title = title;
        video.driveUrl = driveUrl;
      }
    } else {
      // Add new video record
      page.videos.push({ title, driveUrl });
    }

    await page.save();
    res.status(200).json(page);
  } catch (error) {
    res.status(400).json({ message: "Error saving video", error: error.message });
  }
};

// --- CMS: DELETE PARTICULAR VIDEO ---
export const deleteParticularVideo = async (req, res) => {
  const { videoId } = req.params;
  try {
    const page = await IpoAv.findOne({ slug: "ipo-av" });
    if (!page) return res.status(404).json({ message: "Page not found" });

    page.videos.pull({ _id: videoId }); // Deletes specific video by ID
    await page.save();
    res.status(200).json({ message: "Video deleted", page });
  } catch (error) {
    res.status(500).json({ message: "Error deleting video", error: error.message });
  }
};