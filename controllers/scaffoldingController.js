import ScaffoldingProduct from "../models/ScaffoldingModel.js";

export const getAllScaffoldingProducts = async (req, res) => {
  try {
    const data = await ScaffoldingProduct.find().sort({ order: 1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createScaffoldingProduct = async (req, res) => {
  try {
    const newData = await ScaffoldingProduct.create(req.body);
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateScaffoldingProduct = async (req, res) => {
  try {
    const updatedData = await ScaffoldingProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteScaffoldingProduct = async (req, res) => {
  try {
    await ScaffoldingProduct.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
