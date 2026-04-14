import Unit from "../models/UnitModel.js";

export const getAllUnits = async (req, res) => {
  try {
    const data = await Unit.find().sort({ order: 1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createUnit = async (req, res) => {
  try {
    const newData = await Unit.create(req.body);
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUnit = async (req, res) => {
  try {
    const updatedData = await Unit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
