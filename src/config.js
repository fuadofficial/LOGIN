// Import the mongoose module for MongoDB interaction
const mongoose = require('mongoose');

// Connect to the MongoDB server and specify the database name 'Login'
const connect = mongoose.connect('mongodb://localhost:27017/Login');

// Name of the database
const dbName = 'myproject';

// Handle the connection promise
connect.then((result) => {
    console.log('Database connected successfully'); // Log success message if connected
}).catch((err) => {
    console.log('Database connection failed'); // Log error message if connection fails
});

// Define a schema for the Login collection with two fields: name and password
const LoginSchema = new mongoose.Schema({
    name: {
        type: String, // Field type is String
        required: true // Field is required
    },
    password: {
        type: String, // Field type is String
        required: true // Field is required
    }
});

// Create a model from the schema, specifying the collection name 'users'
const collection = new mongoose.model("users", LoginSchema);

// Export the collection to be used in other parts of the application
module.exports = collection;
