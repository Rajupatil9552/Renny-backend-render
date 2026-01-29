import Certificate from '../models/CertificateModel.js';

// [READ] - Get all certificates for frontend
export const getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// [UPSERT] - Create or Update certificates with S3 support
export const upsertCertificate = async (req, res) => {
  // Destructure description from body to match new schema
  const { id, title, img, description, type } = req.body;
  
  try {
    let cert;
    
    // Strict ID check for MongoDB Atlas
    if (id && id.length === 24) {
      cert = await Certificate.findByIdAndUpdate(
        id, 
        { title, img, description, type: type || 'file' }, 
        { new: true, runValidators: true }
      );
    } else {
      // Create new record if no valid ID is provided
      cert = await Certificate.create({ 
        title, 
        img, 
        description, 
        type: type || 'file' 
      });
    }
    
    res.status(200).json({ success: true, data: cert });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// [DELETE]
export const deleteCertificate = async (req, res) => {
  try {
    await Certificate.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Certificate deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};