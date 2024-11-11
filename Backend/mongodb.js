const mongoose = require("mongoose");

// Connect to MongoDB (remove deprecated options)
mongoose.connect("mongodb://ecommerce:priyanka@ac-svxf7ya-shard-00-00.ugavg21.mongodb.net:27017,ac-svxf7ya-shard-00-01.ugavg21.mongodb.net:27017,ac-svxf7ya-shard-00-02.ugavg21.mongodb.net:27017/Trial?ssl=true&replicaSet=atlas-jrvlfh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('Mongoose connected');
    })
    .catch((e) => {
        console.log('Failed to connect to MongoDB', e);
    });

// Define the login schema
const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    walletBalance: {
        type: Number,
        default: 5000 // Default wallet balance on signup
    }
});

// Create the login collection
const LogInCollection = mongoose.model('LogInCollection', logInSchema);

// Define the product schema
const productSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true, // Description is required
    },
    price: {
        type: Number,
        required: true, // Price is required
        min: 0, // Price cannot be negative
    },
});

// Create the product collection
const ProductCollection = mongoose.model('ProductCollection', productSchema);

// Export the models
module.exports = {
    LogInCollection,
    ProductCollection,
};

