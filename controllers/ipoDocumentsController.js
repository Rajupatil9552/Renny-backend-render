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
  const { title, url, recordId } = req.body;
  const slug = "ipo-documents";

  try {
    let page = await IpoDocument.findOne({ slug });
    if (!page) {
      page = new IpoDocument({ slug, documents: [] });
    }

    if (recordId) {
      // Update existing record
      const doc = page.documents.id(recordId);
      if (doc) {
        doc.title = title;
        doc.url = url;
      }
    } else {
      // Add new record
      page.documents.push({ title, url });
    }

    await page.save();
    res.status(200).json(page);
  } catch (error) {
    res.status(400).json({ message: "Error saving IPO record", error: error.message });
  }
};

// --- CMS: DELETE PARTICULAR RECORD ---
export const deleteParticularIpoRecord = async (req, res) => {
  const { recordId } = req.params;
  try {
    const page = await IpoDocument.findOne({ slug: "ipo-documents" });
    if (!page) return res.status(404).json({ message: "Page not found" });

    page.documents.pull({ _id: recordId }); // Removes only that specific PDF
    await page.save();
    res.status(200).json({ message: "Record deleted", page });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record", error: error.message });
  }
};