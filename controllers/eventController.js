import Event from "../models/EventModel.js";

// [CREATE or UPDATE] - Upsert logic
export const upsertEvent = async (req, res) => {
  const { id, ...data } = req.body;
  try {
    const event = id 
      ? await Event.findByIdAndUpdate(id, data, { new: true }) 
      : await Event.create(data);
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// [READ] - Get all events
export const getAllEvents = async (req, res) => {
  try {
    const { role } = req.query;
    // If not admin, only show published events
    const query = role === 'admin' ? {} : { status: "published" };
    const events = await Event.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// [DELETE]
export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};