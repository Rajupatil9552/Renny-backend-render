
import Certificate from '../models/CertificateModel.js';
import fs from 'fs';
import path from 'path';

export const getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addCertificate = async (req, res) => {
  try {
    const newCert = new Certificate({
      title: req.body.title,
      img: req.file ? `/uploads/certificates/${req.file.filename}` : ''
    });
    await newCert.save();
    res.status(201).json(newCert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const cert = await Certificate.findById(id);

    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    let updatedData = { title };

    if (req.file) {
      // Delete old image file
      const oldPath = path.join(process.cwd(), cert.img);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      
      // Set new image path
      updatedData.img = `/uploads/certificates/${req.file.filename}`;
    }

    const updatedCert = await Certificate.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedCert);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const deleteCertificate = async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (cert && cert.img) {
      // Optional: Delete physical file from server
      const filePath = path.join(process.cwd(), cert.img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ message: "Certificate deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};