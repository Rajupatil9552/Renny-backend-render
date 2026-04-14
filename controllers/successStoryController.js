import SuccessStory from "../models/SuccessStoryModel.js";

export const getAllSuccessStories = async (req, res) => {
  try {
    const data = await SuccessStory.find().sort({ order: 1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createSuccessStory = async (req, res) => {
  try {
    const newData = await SuccessStory.create(req.body);
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSuccessStory = async (req, res) => {
  try {
    const updatedData = await SuccessStory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteSuccessStory = async (req, res) => {
  try {
    await SuccessStory.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
