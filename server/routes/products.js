// router file
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const Product = require('../models').Product; // Make sure to get the correct Product model
const upload = require('../middleware/multerMiddleware');

router.get('/', ProductController.getAll);
router.get('/with-pagination', ProductController.getWithPagination);
router.get('/coffee-shops/:coffeeShopId/product-categories/:productCategoryId', ProductController.getByCatAndCoffeeShopId);
router.get('/coffee-shops/:coffeeShopId', ProductController.getByCoffeeShopId);

router.post('/', upload.single('image'), async (req, res) => {
    
    try {
      
      // Save the uploaded file information
      const image = req.file.filename;
      
      // Extract the product data from the request
      const { name, kitchenId, productCategoryId, price, coffeeShopId } = req.body;
  
      // Create a new product in the database
      const product = await Product.create({
        name,
        price,
        image,
        productCategoryId,
        kitchenId,
        coffeeShopId
      });
  
      res.status(201).json({ success: true, product });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ success: false, message: 'Error creating product' });
    }
  });
  
router.post('/deactivate', ProductController.deactivateProduct);
router.get('/:id', ProductController.getById);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;
