const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/Login');
const dbName = 'myproject';


connect.then((result) => {
    console.log('Database connected Successfully');
}).catch((err) => {
    console.log('Database cannot Successfully');
});

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("users", LoginSchema)

module.exports = collection;