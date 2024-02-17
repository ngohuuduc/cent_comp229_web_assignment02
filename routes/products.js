const express = require('express')
const router = express.Router()
const Products = require('../models/products')


// Get all of products 
router.get('/',async (req,res) => {
    try {
        const products = await Products.find()
        res.json(products)
    }
    catch (err) {
        res.status(500).json({message : err.message})
    }
})
//get Product by id 
router.get('/:id',(req,res) => {
    
})


// add 1 new product 
router.post('/',(req,res) => {
    
})


//update Product by id

router.patch('/:id',(req,res) => {
    
})

// remove product by id
router.delete('/:id',(req,res) => {
    
})



// remove all product 

// find product using name wildcard . 






module.exports = router 