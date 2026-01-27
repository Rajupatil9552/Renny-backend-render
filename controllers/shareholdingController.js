import Shareholding from '../models/ShareholdingModel.js';

// --- FRONTEND: GET ALL PATTERNS ---
export const getShareholdingPatterns = async (req, res) => {
  try {
    const pageData = await Shareholding.findOne({ slug: "shareholding-pattern" });
    // Returns the patterns array or an empty array if no data exists
    res.status(200).json(pageData ? pageData.patterns : []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shareholding data", error: error.message });
  }
};

// --- CMS: UPSERT (Create/Update Particular Record) ---
export const upsertShareholdingRecord = async (req, res) => {
  const { title, url, recordId, type } = req.body; // Added type
  const slug = "shareholding-pattern";

  try {
    let page = await Shareholding.findOne({ slug });
    if (!page) {
      page = new Shareholding({ slug, patterns: [] });
    }

    if (recordId) {
      const record = page.patterns.id(recordId);
      if (record) {
        record.title = title;
        record.url = url;
        record.type = type || 'file'; // Update type
      }
    } else {
      page.patterns.push({ title, url, type: type || 'file' });
    }

    await page.save();
    res.status(200).json(page);
  } catch (error) {
    res.status(400).json({ message: "Error saving shareholding record", error: error.message });
  }
};

// --- CMS: DELETE PARTICULAR RECORD ---
export const deleteParticularShareholdingRecord = async (req, res) => {
  const { recordId } = req.params;
  try {
    const page = await Shareholding.findOne({ slug: "shareholding-pattern" });
    if (!page) return res.status(404).json({ message: "Page not found" });

    page.patterns.pull({ _id: recordId }); // Removes only that specific PDF record
    await page.save();
    res.status(200).json({ message: "Record deleted", page });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record", error: error.message });
  }
};