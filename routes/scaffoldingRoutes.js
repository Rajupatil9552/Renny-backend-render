import express from 'express';
import {
  getAllScaffoldingProducts,
  createScaffoldingProduct,
  updateScaffoldingProduct,
  deleteScaffoldingProduct
} from '../controllers/scaffoldingController.js';

const router = express.Router();

router.route('/')
  .get(getAllScaffoldingProducts)
  .post(createScaffoldingProduct);

router.route('/:id')
  .put(updateScaffoldingProduct)
  .delete(deleteScaffoldingProduct);

export default router;
