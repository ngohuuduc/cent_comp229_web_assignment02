const express = require('express')
const path = require('path')
const router = express.Router()
const Products = require('../models/products')


//HOME PAGE
router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));

}) 

// Get all of products 
router.get('/api/products', async (req, res) => {
    const query = {}; 

    if (req.query.name) {
        query.product = { $regex: req.query.name, $options: 'i' };
    }

    try {
        const products = await Products.find(query); 
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//get Product by id 
router.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id); 
        if (product) {
            res.json(product); 
        } else {
            res.status(404).json({ message: 'Product not found' }); 
        }
    } catch (err) {
        if (err.name === 'CastError') {
            res.status(400).json({ message: 'Invalid product ID' }); 
        } else {
            res.status(500).json({ message: err.message });      }
    }
});
// add 1 new product 
router.post('/api/products/',async (req,res) => {
    const product = new Products({ 
        product: req.body.product,
        description: req.body.description,
        price: req.body.price,
        quantity : req.body.quantity,
        category: req.body.category
    })

    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)

    } catch (err) {
        res.status(400).json({message : err.message})

    }
    
})


//update Product by id

router.patch('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; 
        const options = { new: true }; 

        const updatedProduct = await Products.findByIdAndUpdate(id, updateData, options);

        if (updatedProduct) {
            res.json(updatedProduct); 
        } else {
            res.status(404).json({ message: 'Product not found' }); 
        }
    } catch (err) {
        if (err.name === 'CastError') {
            res.status(400).json({ message: 'Invalid product ID' }); 
        } else {
            res.status(500).json({ message: err.message }); 
        }
    }
});

// remove product by id
router.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        const product = await Products.findByIdAndDelete(id); 

        if (product) {
            res.status(200).json({ message: 'Product deleted' }); 
        } else {
            res.status(404).json({ message: 'Product not found' }); 
        }
    } catch (err) {
        if (err.name === 'CastError') {
            res.status(400).json({ message: 'Invalid product ID' }); 
        } else {
            res.status(500).json({ message: err.message }); 
        }
    }
});


// remove all product 

router.delete('/api/products/', async (req, res) => {
    try {
        await Products.deleteMany({});

        res.status(200).json({ message: 'All products have been deleted' }); 
    } catch (err) {
        res.status(500).json({ message: err.message }); 
});







// 1st trying using a function. 
async function getProduct(req,res, next) {
    let products
    try {
        products = await Products.findById(req.params.id)
        if (products == null) {
            return res.status(404).json({message: 'Canot find product'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})

    }

    res.product = products 
    next()
}

module.exports = router 