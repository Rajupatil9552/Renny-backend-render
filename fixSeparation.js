import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ScaffoldingProduct from './models/ScaffoldingModel.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const fixDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    
    // Find shared carousels
    const shared = await ScaffoldingProduct.find({ page: 'Shared', section: 'Carousel' });
    
    if (shared.length > 0) {
      // 1. Re-map the existing to "Page 1"
      for (const item of shared) {
         item.page = 'Page 1';
         await item.save();
      }
      
      // 2. Clone them entirely for "Page 2"
      const page2Clones = shared.map(item => ({
         title: item.title,
         description: item.description,
         application: item.application,
         image: item.image,
         order: item.order,
         page: 'Page 2',
         section: 'Carousel'
      }));
      
      await ScaffoldingProduct.insertMany(page2Clones);
      console.log('Successfully cloned Carousels to Page 1 and Page 2 selectively.');
    } else {
      console.log('No shared carousels found.');
    }
    
    process.exit(0);

  } catch(err) {
    console.error(err);
    process.exit(1);
  }
}

fixDB();
