// Import necessary modules
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const app = express()
const port = 5000
const collection = require('./config') // Ensure this config file exports the MongoDB collection

// Middleware to parse JSON and URL-encoded data from the client
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set the view engine to EJS for rendering HTML pages
app.set('view engine', 'ejs')
app.use(express.static('public')) // Serve static files from the "public" directory

// Route to render the login page
app.get('/', (req, res) => {
    res.render('login')
})

// Route to render the signup page
app.get('/signup', (req, res) => {
    res.render('signup')
})

// Route to handle signup form submission
app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username, // Get the username from the request body
        password: req.body.password // Get the password from the request body
    }

    // Check if the user already exists in the database
    const existingUser = await collection.findOne({ name: data.name })
    if (existingUser) {
        // If user exists, send a response indicating the same
        res.send('User already exists. Please choose a different username.')
    } else {
        // If user does not exist, hash the password using bcrypt
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(data.password, saltRounds)
        data.password = hashedPassword // Update the password to the hashed password

        // Insert the new user data into the database
        const userdata = await collection.insertOne(data)
        console.log(userdata)

        // Send a response indicating successful signup
        res.send('Signup successful! You can now log in.')
    }
})

// Route to handle login form submission
app.post('/login', async (req, res) => {
    try {
        // Find the user in the database by username
        const check = await collection.findOne({ name: req.body.username })
        if (!check) {
            // If user not found, send a response indicating the same
            res.send('Username not found')
        } else {
            // Compare the provided password with the stored hashed password
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
            if (isPasswordMatch) {
                // If password matches, render the home page
                res.render('home')
            } else {
                // If password does not match, send a response indicating the same
                res.send('Wrong password')
            }
        }
    } catch (error) {
        // Handle any errors that occur during the process
        res.send('Wrong details')
    }
})

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Running server on port ${port}`)
})
