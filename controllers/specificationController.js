import Specification from "../models/SpecificationModel.js";

export const getAllSpecifications = async (req, res) => {
  try {
    const data = await Specification.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSpecification = async (req, res) => {
  try {
    const newData = await Specification.create(req.body);
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSpecification = async (req, res) => {
  try {
    const updatedData = await Specification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSpecification = async (req, res) => {
  try {
    await Specification.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
