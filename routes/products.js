const express = require('express')
const path = require('path')
const router = express.Router()
const Products = require('../models/products')


//HOME PAGE
router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'/index.html'));

}) 

// Get all of products 
router.get('/api/products/',async (req,res) => {
   
})

//get Product by id 
router.get('/api/products/:id',getProduct,(req,res) => {
     // res.send(res.product.product)
     res.json(res.product)
})



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

router.patch('/api/products/:id',getProduct,(req,res) => {
  
    
})

// remove product by id
router.delete('/api/products/:id', getProduct, (req,res) => {
    try {
        res.products.deleteOne()
        res.json({message: 'Delete the product successfully'})
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
})



// remove all product 

// find product using name wildcard . 


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