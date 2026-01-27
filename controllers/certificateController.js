import Certificate from '../models/CertificateModel.js';

export const getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Simplified Upsert Logic for Cloud Storage
export const upsertCertificate = async (req, res) => {
  const { id, title, img, type } = req.body;
  try {
    let cert;
    if (id && id.length === 24) {
      cert = await Certificate.findByIdAndUpdate(
        id, 
        { title, img, type: type || 'file' }, 
        { new: true }
      );
    } else {
      cert = await Certificate.create({ title, img, type: type || 'file' });
    }
    res.status(200).json(cert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    // Note: To delete the physical file from S3, you would call your S3 delete utility here
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Certificate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};