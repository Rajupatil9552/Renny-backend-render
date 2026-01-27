import Policy from '../models/PoliciesModel.js';

// --- FRONTEND: GET ALL POLICIES ---
export const getAllPolicies = async (req, res) => {
  try {
    // Sorting by 'order' is mandatory for the tab layout
    const data = await Policy.find().sort({ order: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching policies", error: error.message });
  }
};

// --- CMS: UPSERT (Create or Update Policy) ---
export const upsertPolicy = async (req, res) => {
  const { slug, label, docName, url, order, type } = req.body;
  try {
    const policy = await Policy.findOneAndUpdate(
      { slug },
      { label, docName, url, order, type: type || 'file' },
      { new: true, upsert: true }
    );
    res.status(200).json(policy);
  } catch (error) {
    res.status(400).json({ message: "Error saving policy", error: error.message });
  }
};

// --- CMS: DELETE POLICY ---
export const deletePolicy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Policy.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Policy not found" });
    res.status(200).json({ message: "Policy deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting policy", error: error.message });
  }
};