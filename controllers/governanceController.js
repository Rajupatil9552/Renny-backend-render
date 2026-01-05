import Governance from '../models/GovernanceModel.js';

// GET all governance data
export const getGovernanceData = async (req, res) => {
  try {
    const data = await Governance.find().sort({ order: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

// Add or Update a particular record (Director or Contact)
export const upsertGovernanceRecord = async (req, res) => {
  const { slug, label, order, recordId, ...fields } = req.body;
  try {
    let section = await Governance.findOne({ slug });
    
    if (!section) {
      section = new Governance({ slug, label, order, content: [] });
    }

    if (recordId) {
      const item = section.content.id(recordId);
      if (item) Object.assign(item, fields);
    } else {
      section.content.push(fields);
    }

    await section.save();
    res.status(200).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a particular record
export const deleteParticularGovernanceItem = async (req, res) => {
  const { slug, itemId } = req.params;
  try {
    const section = await Governance.findOne({ slug });
    if (!section) return res.status(404).json({ message: "Section not found" });

    section.content.pull({ _id: itemId });
    await section.save();
    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};