import Timeline from "../models/TimelineModel.js";

export const getAllTimelines = async (req, res) => {
  try {
    const data = await Timeline.find().sort({ order: 1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTimeline = async (req, res) => {
  try {
    const newData = await Timeline.create(req.body);
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTimeline = async (req, res) => {
  try {
    const updatedData = await Timeline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTimeline = async (req, res) => {
  try {
    await Timeline.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
