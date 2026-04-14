import PageSection from "../models/PageSectionModel.js";

export const getPageSections = async (req, res) => {
  try {
    const { pageName } = req.params;
    const sections = await PageSection.find({ page: pageName });
    res.status(200).json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const upsertPageSection = async (req, res) => {
  try {
    const { pageName, sectionName } = req.params;
    const updateData = { ...req.body };

    // Always set page and sectionName
    updateData.page = pageName;
    updateData.sectionName = sectionName;

    console.log("Upserting page section:", { pageName, sectionName, updateData });

    const updatedSection = await PageSection.findOneAndUpdate(
      { page: pageName, sectionName: sectionName },
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    console.log("Saved successfully:", updatedSection._id);
    res.status(200).json({ success: true, data: updatedSection });
  } catch (error) {
    console.error("=== upsertPageSection Error ===");
    console.error("Message:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ success: false, message: error.message, details: error.errors });
  }
};
