var express = require('express');
var app = express();
var cors =require('cors')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swag-shop', { useNewUrlParser: true, useUnifiedTopology: true });

var Product = require('./model/product');
var WishList = require('./model/wishlist');
// ./ not in node modules but in the local file system

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())


app.post('/product', function(request, response) {
   var product = new Product();
    //new js/mongoose object
   product.title = request.body.title;
   product.price = request.body.price;
   product.save(function(err, savedProduct) {
        if (err) {
            response.status(500).send({error:"Could not save product"});
        } else {
            response.send(savedProduct);
            //send the new data object back
        }
    });
});

app.get('/product', function(request, response) {
   Product.find({}, function(err, products){
      if (err) {
          response.status(500).send({error: "Could not fetch products"});
      } else {
          response.send(products);
      }
   });
});

app.get('/wishlist', function(request, response) {
    WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err, wishLists) {
        if (err) {
            response.status(500).send({error: "Could not fetch wishlists"});
        } else {
            response.status(200).send(wishLists);
        }
    });
});

app.post('/wishlist', function(request, response) {
    var wishList = new WishList();
    wishList.title = request.body.title;
    
    wishList.save(function(err, newWishList) {
        if (err) {
            response.status(500).send({error: "Could not create Wish List"});
        } else {
            response.send(newWishList);
        }
    });
});

//update a product to a wishlist
app.put('/wishlist/product/add', function (request, response) {
    //find the product in our database, find by the id. Client passes in the id and adds it to the list
    Product.findOne({_id: request.body.productId}, function (err, product) {
        if (err) {
            response.status(500).send({error: "Could not add item to wishlist"});
        } else {
            //update our wishlist from the mongoose model, find the wishlist first, add product to the products array in the wishlist
            WishList.update({_id:request.body.wishListId}, {$addToSet: {products: product._id}}, function (err, wishList) {
                if (err) {
                    response.status(500).send({error: "Could not add item to wishlist"});
                } else {
                    response.send("Added to wishlist");
                }
            });
        }
   }); 
});




app.listen(3004, function() {
    console.log("Swag Shop API running on port 3004...")
});