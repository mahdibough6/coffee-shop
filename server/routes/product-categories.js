const express = require('express');
const router = express.Router();
const ProductCategoryController = require('../controllers/ProductCategoryController');
const ProductCategory = require('../models').ProductCategory;

const upload = require('../middleware/multerMiddleware');

router.get('/coffee-shops/:coffeeShopId', ProductCategoryController.getAllCoffeeShopCategories);
router.post('/', upload.single('image'), async (req, res) => {
    
    try {
      
      // Save the uploaded file information
      const image = req.file.filename;
      
      // Extract the product data from the request
      const { name, coffeeShopId } = req.body;
  
      // Create a new product in the database
      const category = await ProductCategory.create({
        name,
        image,
        coffeeShopId
      });
  
      res.status(201).json({ success: true, category });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ success: false, message: 'Error creating product' });
    }
  });
router.get('/', ProductCategoryController.getAll);
router.get('/:id', ProductCategoryController.getById);
router.put('/:id', ProductCategoryController.update);
router.delete('/:id', ProductCategoryController.delete);

module.exports = router;
