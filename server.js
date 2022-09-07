// REQUIRE DEPENDENCIES

const express = require("express"); // requires express
const app = express(); // creates app functions
require('dotenv').config(); // needed to recognize variables in .env

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const Product = require("./models/products")

// MIDDLEWARE

// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))


// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// splash -- i am adding this just so the main route on 3000 links to the products page

app.get("/", function (req, res){
    res.send(`View products <a href="/products">here.</a>`)
})

// seed route

app.get("/products/seed" , function (req, res){
    Product.deleteMany({}, (error, Products) => {});
    Product.create([
        {
          name: 'Beans',
          description: 'A small pile of beans. Buy more beans for a big pile of beans.',
          img: 'https://imgur.com/LEHS8h3.png',
          price: 5,
          qty: 99
        }, {
          name: 'Bones',
          description: "It's just a bag of bones.",
          img: 'https://imgur.com/dalOqwk.png',
          price: 25,
          qty: 0
        }, {
          name: 'Bins',
          description: 'A stack of colorful bins for your beans and bones.',
          img: 'https://imgur.com/ptWDPO1.png',
          price: 7000,
          qty: 1
        }
      ],
      (error, data) => {
        res.redirect('/products');
    }

    )
})


// INDEX

app.get("/products" , function (req, res){
    Product.find({}, (error, allProducts)=> {
        res.render("index.ejs" , {
            products: allProducts,
        })
    })
})

// NEW

app.get("/products/new" , function (req, res){
    res.render("new.ejs")
})
// DELETE

// UPDATE

// CREATE

app.post("/products" , function (req, res){
    Product.create(req.body, (error, createdProduct) => {
        // res.send(createdProduct)
        res.redirect("/products")
    })
})

// EDIT

// SHOW

app.get("/products/:id", (req, res)=>{
    Product.findById(req.params.id, (err, foundProduct)=>{
        res.render("show.ejs" , {
            product: foundProduct,
        })
    })
})

// LISTENER
const PORT = process.env.PORT; // calls port variable from .env to protect our data
// note to self: nwws to call this variable AFtER requiring .env or it will show up as undefined

app.listen(PORT, function(){
    console.log(`Let's start selling on port ${PORT}`)
});

console.log(Product)