var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
// automatic id of the documents

var wishList = new Schema({
    title: {type: String, default: "Cool Wish List"}, 
    //automatically gives an empty wish list a name
    products:[{type: ObjectId, ref: "Product"}]
    //products have to be a mongo object, ref the schema of Product, spelt the same way
});


module.exports = mongoose.model('WishList', wishList);