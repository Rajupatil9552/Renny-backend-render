import IpoDocument from '../models/IpoDocumentsModel.js';

// --- FRONTEND: GET ---
export const getIpoDocuments = async (req, res) => {
  try {
    const pageData = await IpoDocument.findOne({ slug: "ipo-documents" });
    res.status(200).json(pageData ? pageData.documents : []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching IPO documents", error: error.message });
  }
};

// --- CMS: UPSERT (Create/Update Particular Record) ---
export const upsertIpoRecord = async (req, res) => {
  const { title, url, recordId, type } = req.body;
  const slug = "ipo-documents";

  try {
    let page = await IpoDocument.findOne({ slug });
    if (!page) {
      page = new IpoDocument({ slug, documents: [] });
    }

    if (recordId) {
      const doc = page.documents.id(recordId);
      if (doc) {
        doc.title = title;
        doc.url = url;
        doc.type = type || 'file';
      }
    } else {
      page.documents.push({ title, url, type: type || 'file' });
    }

    await page.save();
    res.status(200).json(page);
  } catch (error) {
    res.status(400).json({ message: "Error saving IPO record", error: error.message });
  }
};

// --- CMS: DELETE PARTICULAR RECORD ---
export const deleteParticularIpoRecord = async (req, res) => {
  const { recordId } = req.params; // Captures ID from /record/:recordId
  
  try {
    const page = await IpoDocument.findOne({ slug: "ipo-documents" });
    if (!page) return res.status(404).json({ message: "Page data not found" });

    // 1. Debugging: Check if recordId is arriving correctly
    console.log("Attempting to delete record with ID:", recordId);

    // 2. Mongoose pull logic
    page.documents.pull({ _id: recordId }); 
    
    await page.save();
    res.status(200).json({ message: "Record deleted successfully", page });
  } catch (error) {
    console.error("Delete Controller Error:", error.message);
    res.status(500).json({ message: "Error deleting record", error: error.message });
  }
};