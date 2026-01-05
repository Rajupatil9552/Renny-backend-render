import Financial from '../models/FinancialModel.js';

// --- FRONTEND GET ---
export const getFinancials = async (req, res) => {
  try {
    const data = await Financial.find().sort({ order: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- CMS CRUD OPERATIONS ---

// 1. Create or Update a Category (Upsert Logic)
export const upsertFinancialCategory = async (req, res) => {
  const { label, slug, order, documents } = req.body;
  try {
    const category = await Financial.findOneAndUpdate(
      { slug },
      { label, order, ...(documents && { documents }) },
      { new: true, upsert: true }
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 2. Update a single PDF within a category
export const updateFinancialDocument = async (req, res) => {
  const { categoryId, docId } = req.params;
  try {
    const updated = await Financial.findOneAndUpdate(
      { _id: categoryId, "documents._id": docId },
      { $set: { "documents.$.title": req.body.title, "documents.$.fileUrl": req.body.fileUrl } },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 3. Delete an entire Category (Tab)
export const deleteFinancialCategory = async (req, res) => {
  try {
    await Financial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Delete a single PDF from a category
export const deleteFinancialDocument = async (req, res) => {
  const { categoryId, docId } = req.params;
  try {
    const category = await Financial.findById(categoryId);
    category.documents.pull({ _id: docId });
    await category.save();
    res.status(200).json({ message: "Document deleted", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};