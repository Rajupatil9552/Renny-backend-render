import ContactInfo from '../models/ContactInfoModel.js';

// GET - Public: returns contact info for the website
export const getContactInfo = async (req, res) => {
  try {
    const data = await ContactInfo.findOne().sort({ createdAt: -1 });
    res.json({ success: true, data: data || null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST - Admin: upsert contact info
export const updateContactInfo = async (req, res) => {
  try {
    const { emails, phones, offices } = req.body;

    const data = await ContactInfo.findOneAndUpdate(
      {},
      { emails, phones, offices },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
