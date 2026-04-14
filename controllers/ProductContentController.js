import ProductContent from "../models/ProductContentModel.js";

// Get single product page content by slug
export const getProductContentBySlug = async (req, res) => {
  try {
    const data = await ProductContent.findOne({ productSlug: req.params.slug });
    // If not found, do not error out, return null so frontend uses hardcoded falbacks
    if (!data) {
      return res.status(200).json({ success: true, data: null });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all product content configurations (Admin list)
export const getAllProductContents = async (req, res) => {
  try {
    const data = await ProductContent.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Upsert product content (Create or Update based on slug)
export const upsertProductContent = async (req, res) => {
  try {
    const slug = req.params.slug;
    const body = req.body;
    
    // Ensure slug is set in body
    body.productSlug = slug;

    const data = await ProductContent.findOneAndUpdate(
      { productSlug: slug },
      body,
      { new: true, upsert: true } // upsert creates new if doesn't exist
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete (if ever needed)
export const deleteProductContent = async (req, res) => {
  try {
    const slug = req.params.slug;
    await ProductContent.findOneAndDelete({ productSlug: slug });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
