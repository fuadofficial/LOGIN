
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const app = express()
const port = 5000
const collection = require('./config')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // check if the user already exists in the database
    const existingUser = await collection.findOne({ name: data.name })
    if (existingUser) {
        res.send('User already exists. Please choose a defferent username.')
    } else {
        // has the password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const userdata = await collection.insertMany(data)
        console.log(userdata);
    }
})

app.post('/login',async (req,res)=>{
    try {
        const check = await collection.findOne({name:req.body.username})
        if(!check){
            res.send('user name cannot found')
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
        if(isPasswordMatch){
           req.render('home') 
        }else{
            res.send('wrong password')
        }
    } catch (error) {
        res.send('wrong Details')
    }
})



app.listen(port, () => {
    console.log(`Running server on port ${port}`)
})