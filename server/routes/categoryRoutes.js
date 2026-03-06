import express from 'express';
import {
    createCategory,
    updateCategory,
    removeCategory,
    listCategories,
    readCategory,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createCategory).get(listCategories);
router
    .route('/:id')
    .put(protect, admin, updateCategory)
    .delete(protect, admin, removeCategory)
    .get(readCategory);

export default router;
