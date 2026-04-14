import EsgProject from "../models/EsgProjectModel.js";

export const getAllEsgProjects = async (req, res) => {
  try {
    const data = await EsgProject.find().sort({ order: 1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createEsgProject = async (req, res) => {
  try {
    const newData = await EsgProject.create(req.body);
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEsgProject = async (req, res) => {
  try {
    const updatedData = await EsgProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEsgProject = async (req, res) => {
  try {
    await EsgProject.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
