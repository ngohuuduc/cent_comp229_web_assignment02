const express = require('express')
const router = express.Router()



// Get all of products 
router.get('/',(req,res) => {
    res.send('hello world')
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