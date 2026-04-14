import DesignCentre from "../models/DesignCentreModel.js";

// Get Design Centre content
export const getDesignCentre = async (req, res) => {
  try {
    const data = await DesignCentre.findOne();
    // Return null if not found, frontend should handle fallbacks
    res.status(200).json({ success: true, data: data || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update or Create Design Centre content
export const updateDesignCentre = async (req, res) => {
  try {
    const updateData = req.body;
    const updatedData = await DesignCentre.findOneAndUpdate(
      {}, // Empty filter find the first (and only) doc
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
