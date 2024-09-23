//Import Necessary Modules 
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel')



//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//Routes 
//Route end point for Home Page 
app.get('/', (req, res)=> {
    res.send('Hello Node API')

})


//Route end point for /blog.
app.get('/blog', (req, res) => {
    res.send('Welcome to the blog ')
})

//Route to get Data from database 
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({}); //Passed empty object to get all products
        res.status(200).json(products); //Product Json will be returned to the client as a response
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
})

//Route to get individual Product
app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params; 
        const product = await Product.findById(id); //Passed Id to get individual product
        res.status(200).json(product); //Product Json will be returned to the client as a response
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



//Route to Post/save data in the database Via the product Model
app.post('/products',  async (req, res) => {
   try {
    const product = await Product.create(req.body)
    res.status(200).json(product);

    } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
   }

})

//Route to put/update data in the database Via the product Model
app.put("/products/:id", async (req, res) => {
     try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //Check and return if theres the requested data in the database
        if(!product) {
            return res.status(404).json({message: `No product with id: ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
     } catch (error) {
        res.status(500).json({message: error.message})
     }
})








//Connect Mongo DB, show Output for success and failed. 
mongoose
.connect('mongodb+srv://oxdiablo20:Pollos_Hermanos505@cluster0.dtq5smd.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    //Declare database connection status
    console.log('connected to MongoDB')
    //Start The server
app.listen(3000, ()=> {
    console.log(`Node API app is running on port 3000`)
})
}).catch((error) => {
    console.log(error)
})