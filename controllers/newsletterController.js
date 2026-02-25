import Newsletter from '../models/NewsletterModel.js';

// [CREATE] - Public Subscription
export const subscribe = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "This email is already subscribed." });
    }

    const newSubscriber = await Newsletter.create({ name, email });

    res.status(201).json({
      success: true,
      message: "Thank you for subscribing to Renny Strips newsletter!",
      data: newSubscriber
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// [READ] - Admin Panel: Get all subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.status(200).json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch subscribers" });
  }
};