import Event from "../models/EventModel.js";

// [CREATE or UPDATE] - Upsert logic
export const upsertEvent = async (req, res) => {
  const { id, ...data } = req.body;

  try {
    let event;

    // Strict ID check: Only use findByIdAndUpdate if id is a valid 24-char string
    if (id && id !== "" && id.length === 24) {
      event = await Event.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    } else {
      // Create a new event if no valid ID is provided
      event = await Event.create(data);
    }

    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    console.error("UPSERT ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// [READ] - Get all events (Refined for Admin & Public)
export const getAllEvents = async (req, res) => {
  try {
    const { role } = req.query;

    // Logic: If role is admin, empty query {} (fetch all). 
    // Otherwise, fetch only { status: "published" }.
    const query = role === 'admin' ? {} : { status: "published" };

    const events = await Event.find(query).sort({ order: 1, createdAt: -1 });

    res.status(200).json({ 
      success: true, 
      count: events.length,
      data: events 
    });
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